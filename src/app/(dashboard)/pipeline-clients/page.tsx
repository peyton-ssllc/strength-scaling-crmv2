import { ActivityFeed } from "@/components/crm/activity-feed";
import { PageHeader } from "@/components/crm/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { pipelineStages } from "@/lib/crm-data";

export default function PipelineClientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pipeline & Clients"
        title="Team revenue workspace"
        description="One internal operating section for active opportunities, handoffs, won clients, manager review, and onboarding status."
        action={<Button>Add Client Handoff</Button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <div className="grid gap-4 xl:grid-cols-4">
            {pipelineStages.map((stage) => (
              <Card key={stage.name} className="min-h-[360px] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-white">{stage.name}</h2>
                    <p className="text-sm text-slate-500">{stage.value} tracked</p>
                  </div>
                  <Badge>{stage.items.length}</Badge>
                </div>
                <div className="mt-4 space-y-3">
                  {stage.items.map((item) => (
                    <div key={item.company} className="rounded-lg border border-white/10 bg-black/20 p-3">
                      <div className="font-medium text-white">{item.company}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.owner}</div>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-sky-200">{item.rep}</span>
                        <span className="text-slate-500">{item.age}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Internal client tracker</h2>
                <p className="text-sm text-slate-400">Won accounts stay visible for onboarding and team handoff.</p>
              </div>
              <Badge>Clients</Badge>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {["Barbell Republic", "Pulse Fitness Lab", "Legacy Strength Club"].map((client, index) => (
                <div key={client} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <div className="font-medium text-white">{client}</div>
                  <div className="mt-1 text-sm text-slate-500">
                    {index === 0 ? "Onboarding call scheduled" : index === 1 ? "Assets requested" : "Proposal pending signature"}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Badge>{index === 2 ? "Late stage" : "Onboarding"}</Badge>
                    <Badge className="border-violet-300/20 bg-violet-300/10 text-violet-100">Team use</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <ActivityFeed />
      </div>
    </>
  );
}
