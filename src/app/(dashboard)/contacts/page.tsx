import { PageHeader } from "@/components/crm/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { leads } from "@/lib/crm-data";

export default function ContactsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacts"
        title="Lead database"
        description="A fast searchable view of assigned leads, context, scores, and next actions."
      />
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1.2fr_0.8fr_0.7fr_0.6fr] border-b border-white/10 px-5 py-3 text-xs uppercase tracking-[0.18em] text-slate-500">
          <div>Lead</div>
          <div>Contact</div>
          <div>Status</div>
          <div>Score</div>
        </div>
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="grid grid-cols-[1.2fr_0.8fr_0.7fr_0.6fr] items-center border-b border-white/5 px-5 py-4 last:border-b-0"
          >
            <div>
              <div className="font-medium text-white">{lead.business}</div>
              <div className="text-sm text-slate-500">{lead.location}</div>
            </div>
            <div>
              <div className="text-sm text-slate-200">{lead.contact}</div>
              <div className="text-xs text-slate-500">{lead.phone}</div>
            </div>
            <Badge>{lead.status}</Badge>
            <div className="font-semibold text-sky-200">{lead.score}</div>
          </div>
        ))}
      </Card>
    </>
  );
}
