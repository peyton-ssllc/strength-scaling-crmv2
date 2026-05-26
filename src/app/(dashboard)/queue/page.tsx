import { QueueOperatingTable } from "@/components/crm/queue-operating-table";
import { PageHeader } from "@/components/crm/page-header";
import { Card } from "@/components/ui/card";
import { queueStats } from "@/lib/crm-data";

export default function QueuePage() {
  return (
    <>
      <PageHeader
        eyebrow="My Queue"
        title="Fast lead operating room"
        description="Search, filter, call, log outcomes, and move through gym-owner leads without bouncing between pages."
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {queueStats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4 p-4">
            <div
              className={`flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] ${stat.tone}`}
            >
              <stat.icon className="size-5" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-white">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <QueueOperatingTable />
    </>
  );
}
