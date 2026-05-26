import { activities } from "@/lib/crm-data";
import { Card } from "@/components/ui/card";

export function ActivityFeed() {
  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold text-white">Live activity</h2>
      <div className="mt-5 space-y-4">
        {activities.map((item) => (
          <div key={item.title} className="flex gap-3">
            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-sky-300/20 bg-sky-300/10 text-sky-200">
              <item.icon className="size-4" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-100">{item.title}</div>
              <div className="mt-1 text-xs text-slate-500">{item.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
