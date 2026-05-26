import { PageHeader } from "@/components/crm/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { leaderboard } from "@/lib/crm-data";

export default function LeaderboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leaderboard"
        title="Rep performance"
        description="Simple, visible performance signals: calls, meetings, and points from meaningful outcomes."
      />
      <Card className="p-5">
        <div className="space-y-3">
          {leaderboard.map((rep) => (
            <div key={rep.name} className="grid grid-cols-[56px_1fr_90px_90px_90px] items-center rounded-lg border border-white/10 bg-white/[0.035] p-4">
              <div className="text-2xl font-semibold text-sky-200">#{rep.rank}</div>
              <div className="flex items-center gap-3">
                <rep.badge className="size-5 text-amber-200" />
                <div className="font-medium text-white">{rep.name}</div>
              </div>
              <Badge>{rep.calls} calls</Badge>
              <Badge>{rep.meetings} mtgs</Badge>
              <div className="text-right font-semibold text-white">{rep.points}</div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
