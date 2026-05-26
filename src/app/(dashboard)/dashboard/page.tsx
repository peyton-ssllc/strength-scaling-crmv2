import { ActivityFeed } from "@/components/crm/activity-feed";
import { MetricGrid } from "@/components/crm/metric-grid";
import { PageHeader } from "@/components/crm/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { adminMetrics, repMetrics } from "@/lib/crm-data";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Sales floor command center"
        description="Admin visibility without turning the CRM into a reporting maze. Reps get action metrics; admins get team health and review signals."
        action={<Button>Start Calling</Button>}
      />

      <div className="space-y-5">
        <MetricGrid metrics={adminMetrics} />
        <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Rep dashboard preview</h2>
                <p className="text-sm text-slate-400">What an SDR sees when they are not in the queue.</p>
              </div>
              <Badge>Role-aware</Badge>
            </div>
            <div className="mt-5">
              <MetricGrid metrics={repMetrics} />
            </div>
          </Card>
          <ActivityFeed />
        </div>
      </div>
    </>
  );
}
