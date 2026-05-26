"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/admin";

function outcomeToStatus(outcome: string) {
  if (outcome === "Booked Meeting") return "meeting_booked";
  if (outcome === "Callback Requested") return "follow_up_scheduled";
  if (outcome === "No Answer") return "follow_up_scheduled";
  if (outcome === "Left Voicemail") return "follow_up_scheduled";
  if (outcome === "Connected - Interested") return "qualified";
  if (outcome === "Not Interested") return "lost";
  if (outcome === "Bad Number") return "bad_data";
  if (outcome === "Do Not Contact") return "do_not_contact";
  return "contacted";
}

function outcomeToFollowUp(outcome: string) {
  const next = new Date();

  if (outcome === "Callback Requested") {
    next.setDate(next.getDate() + 1);
    next.setHours(10, 0, 0, 0);
    return next.toISOString();
  }

  if (outcome === "No Answer" || outcome === "Left Voicemail") {
    next.setDate(next.getDate() + 2);
    next.setHours(10, 0, 0, 0);
    return next.toISOString();
  }

  return null;
}

export async function logQueueCall(input: {
  leadId: string;
  outcome: string;
  note: string;
}) {
  const supabase = createSupabaseAdminClient();

  const nextStatus = outcomeToStatus(input.outcome);
  const nextFollowUpAt = outcomeToFollowUp(input.outcome);

  const { error: activityError } = await supabase.from("activities").insert({
    lead_id: input.leadId,
    rep_id: null,
    type: "call",
    outcome: input.outcome,
    channel: "phone",
    note: input.note || null,
    metadata: {
      source: "my_queue",
    },
  });

  if (activityError) {
    return {
      ok: false,
      message: activityError.message,
    };
  }

  const updatePayload: {
    status: string;
    last_contacted_at: string;
    next_follow_up_at: string | null;
    updated_at: string;
    notes_summary?: string;
  } = {
    status: nextStatus,
    last_contacted_at: new Date().toISOString(),
    next_follow_up_at: nextFollowUpAt,
    updated_at: new Date().toISOString(),
  };

  if (input.note) {
    updatePayload.notes_summary = input.note;
  }

  const { error: leadError } = await supabase
    .from("leads")
    .update(updatePayload)
    .eq("id", input.leadId);

  if (leadError) {
    return {
      ok: false,
      message: leadError.message,
    };
  }

  revalidatePath("/queue");

  return {
    ok: true,
  };
}
