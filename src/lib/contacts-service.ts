import { createSupabaseAdminClient } from "@/lib/admin";

export type ContactLead = {
  id: string;
  business: string;
  contact: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  status: string;
  score: number;
  source: string;
  lastContacted: string;
};

type LeadRow = {
  id: string;
  business_name: string;
  contact_name: string | null;
  owner_name: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  status: string;
  score: number;
  lead_source: string | null;
  last_contacted_at: string | null;
};

function readableStatus(status: string) {
  const map: Record<string, string> = {
    new: "New",
    queued: "Queued",
    working: "Working",
    contacted: "Called",
    follow_up_scheduled: "Follow Up",
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

function readableDate(value: string | null) {
  if (!value) return "Never";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export async function getContacts(): Promise<ContactLead[]> {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("leads")
    .select(
      "id,business_name,contact_name,owner_name,phone,email,city,state,status,score,lead_source,last_contacted_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as LeadRow[];

  return rows.map((lead) => ({
    id: lead.id,
    business: lead.business_name,
    contact: lead.contact_name ?? lead.owner_name ?? "Unknown contact",
    phone: lead.phone ?? "-",
    email: lead.email ?? "-",
    city: lead.city ?? "-",
    state: lead.state ?? "-",
    status: readableStatus(lead.status),
    score: lead.score ?? 0,
    source: lead.lead_source ?? "Unknown",
    lastContacted: readableDate(lead.last_contacted_at),
  }));
}
