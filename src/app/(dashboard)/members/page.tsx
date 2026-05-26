import { PageHeader } from "@/components/crm/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { members } from "@/lib/crm-data";

export default function MembersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Members"
        title="Team and permissions"
        description="Manage admins, SDR reps, account status, and what each person should focus on today."
        action={<Button>Invite Member</Button>}
      />
      <Card className="overflow-hidden">
        {members.map((member) => (
          <div key={member.name} className="grid grid-cols-[1fr_120px_120px_1fr] items-center border-b border-white/5 px-5 py-4 last:border-b-0">
            <div className="font-medium text-white">{member.name}</div>
            <Badge>{member.role}</Badge>
            <div className="text-sm text-emerald-200">{member.status}</div>
            <div className="text-sm text-slate-400">{member.focus}</div>
          </div>
        ))}
      </Card>
    </>
  );
}
