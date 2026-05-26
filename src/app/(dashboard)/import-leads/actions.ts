"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/admin";

export type ImportLeadInput = {
  business_name: string;
  contact_name?: string;
  owner_name?: string;
  email?: string;
  phone?: string;
  website?: string;
  instagram_url?: string;
  city?: string;
  state?: string;
  lead_source?: string;
  score?: number;
};

export async function importLeadsFromCsv(input: {
  fileName: string;
  leads: ImportLeadInput[];
}) {
  const supabase = createSupabaseAdminClient();

  const cleanLeads = input.leads
    .filter((lead) => lead.business_name || lead.phone || lead.email)
    .map((lead) => ({
      business_name: lead.business_name || "Unknown Business",
      contact_name: lead.contact_name || null,
      owner_name: lead.owner_name || lead.contact_name || null,
      email: lead.email || null,
      phone: lead.phone || null,
      website: lead.website || null,
      instagram_url: lead.instagram_url || null,
      city: lead.city || null,
      state: lead.state || null,
      country: "US",
      lead_source: lead.lead_source || input.fileName || "CSV Import",
      status: "new",
      score: lead.score ?? 50,
      timezone: null,
      notes_summary: `Imported from ${input.fileName}`,
    }));

  if (cleanLeads.length === 0) {
    return {
      ok: false,
      message: "No valid leads found in this CSV.",
      imported: 0,
    };
  }

  const { error } = await supabase.from("leads").insert(cleanLeads);

  if (error) {
    return {
      ok: false,
      message: error.message,
      imported: 0,
    };
  }

  revalidatePath("/queue");
  revalidatePath("/contacts");
  revalidatePath("/import-leads");

  return {
    ok: true,
    message: `Imported ${cleanLeads.length} leads.`,
    imported: cleanLeads.length,
  };
}
