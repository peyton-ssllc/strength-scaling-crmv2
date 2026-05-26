import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type DbQueueLead = {
  id: string;
  business: string;
  contact: string;
  role: string;
  phone: string;
  email: string;
  status: string;
  followUp: string;
  city: string;
  state: string;
  timezone: string;
  calls: number;
  niche: string;
  score: number;
  due: boolean;
  source: string;
  lastTouch: string;
  nextAction: string;
  notes: string;
};

type LeadRow = {
  id: string;
  business_name: string;
  contact_name: string | null;
  owner_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  status: string;
  score: number;
  timezone: string | null;
  lead_source: string | null;
  notes_summary: string | null;
  next_follow_up_at: string | null;
  last_contacted_at: string | null;
};

function readableStatus(status: string) {
  const map: Record<string, string> = {
    new: "New",
    queued: "Queued",
    working: "Working",
    contacted: "Called",
    follow_up_scheduled: "No Answer",
    meeting_booked: "Booked",
    qualified: "Interested",
    unqualified: "Unqualified",
    bad_data: "Bad Data",
    do_not_contact: "DNC",
    converted: "Converted",
    lost: "Lost",
  };

  return map[status] ?? status;
}

function readableFollowUp(value: string | null) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function getNextAction(status: string) {
  if (status === "new") return "First call. Qualify the owner and ask about growth goals.";
  if (status === "follow_up_scheduled") return "Follow-up is due. Call now, then send a quick text if no answer.";
  if (status === "contacted") return "Call again and move toward a booked meeting.";
  if (status === "meeting_booked") return "Meeting is booked. Keep out of the call queue.";
  if (status === "do_not_contact") return "Do not contact this lead.";
  return "Call and log the outcome.";
}

export async function getQueueLeads(): Promise<DbQueueLead[]> {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("leads")
    .select(
      "id,business_name,contact_name,owner_name,email,phone,city,state,status,score,timezone,lead_source,notes_summary,next_follow_up_at,last_contacted_at",
    )
    .in("status", ["new", "queued", "working", "contacted", "follow_up_scheduled", "qualified"])
    .order("next_follow_up_at", { ascending: true, nullsFirst: false })
    .order("score", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as LeadRow[];

  return rows.map((lead) => {
    const due =
      !!lead.next_follow_up_at && new Date(lead.next_follow_up_at).getTime() <= Date.now();

    return {
      id: lead.id,
      business: lead.business_name,
      contact: lead.contact_name ?? lead.owner_name ?? "Unknown contact",
      role: lead.owner_name ? "Owner" : "Contact",
      phone: lead.phone ?? "-",
      email: lead.email ?? "-",
      status: readableStatus(lead.status),
      followUp: readableFollowUp(lead.next_follow_up_at),
      city: lead.city ?? "-",
      state: lead.state ?? "-",
      timezone: lead.timezone ?? "-",
      calls: lead.last_contacted_at ? 1 : 0,
      niche: lead.lead_source ?? "Gym Lead",
      score: lead.score ?? 0,
      due,
      source: lead.lead_source ?? "Unknown",
      lastTouch: lead.last_contacted_at ? readableFollowUp(lead.last_contacted_at) : "Never contacted",
      nextAction: getNextAction(lead.status),
      notes: lead.notes_summary ?? "No notes yet.",
    };
  });
}
