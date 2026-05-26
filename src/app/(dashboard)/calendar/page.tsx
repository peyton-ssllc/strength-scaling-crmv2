import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/crm/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const events = [
  ["10:00 AM", "Follow up with ForgeFit Studio", "Call"],
  ["11:30 AM", "Discovery call: Peak House Gym", "Meeting"],
  ["2:00 PM", "Admin review: Iron Valley", "Review"],
  ["4:15 PM", "Callback: Northline Athletics", "Call"],
];

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Calendar"
        title="Follow-ups and booked meetings"
        description="The calendar keeps the queue honest: due work comes back automatically instead of relying on memory."
      />
      <Card className="p-5">
        <div className="space-y-3">
          {events.map(([time, title, type]) => (
            <div key={title} className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4">
              <div className="flex size-11 items-center justify-center rounded-lg bg-sky-300/10 text-sky-200">
                <CalendarDays className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-white">{title}</div>
                <div className="text-sm text-slate-500">{time}</div>
              </div>
              <Badge>{type}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
