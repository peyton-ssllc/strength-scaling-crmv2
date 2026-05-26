import Link from "next/link";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/crm/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getContacts } from "@/lib/contacts-service";

function statusClass(status: string) {
  if (status === "New") return "border-slate-400/20 bg-slate-300/10 text-slate-200";
  if (status === "Called") return "border-blue-300/25 bg-blue-400/10 text-blue-200";
  if (status === "Follow Up") return "border-amber-300/25 bg-amber-400/10 text-amber-200";
  if (status === "Booked") return "border-emerald-300/25 bg-emerald-400/10 text-emerald-200";
  if (status === "Interested") return "border-sky-300/25 bg-sky-400/10 text-sky-200";
  if (status === "DNC" || status === "Lost") return "border-red-300/25 bg-red-400/10 text-red-200";
  return "border-white/10 bg-white/[0.06] text-slate-200";
}

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <>
      <PageHeader
        eyebrow="Contacts"
        title="Contacts database"
        description="Every imported gym lead, call status, source, and last touch in one searchable operating view."
      />

      <Card className="mb-4 p-4">
        <div className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-black/25 px-3 text-sm text-slate-400">
          <Search className="size-4" />
          <input
            placeholder="Search is coming next. For now this table shows real Supabase leads."
            className="min-w-0 flex-1 bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
            disabled
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.75fr_0.55fr_0.8fr_0.7fr] border-b border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          <div>Business</div>
          <div>Contact</div>
          <div>Phone</div>
          <div>Status</div>
          <div>Score</div>
          <div>Source</div>
          <div className="text-right">Open</div>
        </div>

        {contacts.length > 0 ? (
          contacts.map((lead) => (
            <div
              key={lead.id}
              className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.75fr_0.55fr_0.8fr_0.7fr] items-center border-b border-white/5 px-5 py-4 last:border-b-0 hover:bg-white/[0.035]"
            >
              <div>
                <div className="font-semibold text-white">{lead.business}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {lead.city}, {lead.state} · Last touch: {lead.lastContacted}
                </div>
              </div>
              <div className="text-sm text-slate-300">{lead.contact}</div>
              <div className="text-sm text-slate-300">{lead.phone}</div>
              <Badge className={statusClass(lead.status)}>{lead.status}</Badge>
              <div className="font-semibold text-sky-200">{lead.score}</div>
              <div className="text-sm text-slate-400">{lead.source}</div>
              <div className="text-right">
                <Link
                  href={`/contacts/${lead.id}`}
                  className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/[0.1]"
                >
                  Open
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-sm text-slate-500">
            No leads found. Import a CSV to populate contacts.
          </div>
        )}
      </Card>
    </>
  );
}
