import { Card } from "@/components/ui/card";

export function MetricGrid({
  metrics,
}: {
  metrics: Array<{ label: string; value: string; change?: string }>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="p-5">
          <div className="text-sm text-slate-400">{metric.label}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight text-white">{metric.value}</div>
          {metric.change ? <div className="mt-2 text-xs text-sky-200">{metric.change}</div> : null}
        </Card>
      ))}
    </div>
  );
}
