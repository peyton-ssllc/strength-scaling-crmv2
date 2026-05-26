import { Send } from "lucide-react";
import { PageHeader } from "@/components/crm/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const messages = [
  ["Jordan", "Peak House is booked for tomorrow. Owner wants a growth audit angle."],
  ["Peyton", "Flag any pricing questions today. I’ll review those before end of day."],
  ["Avery", "Iron Valley is warm. Leaving notes in the timeline now."],
];

export default function TeamChatPage() {
  return (
    <>
      <PageHeader
        eyebrow="Team Chat"
        title="Sales floor signal"
        description="A lightweight internal channel for handoffs, manager notes, and urgent lead context."
      />
      <Card className="p-5">
        <div className="space-y-4">
          {messages.map(([name, body]) => (
            <div key={body} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <div className="text-sm font-semibold text-sky-200">{name}</div>
              <p className="mt-1 text-sm text-slate-300">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <input
            className="h-10 min-w-0 flex-1 rounded-lg border border-white/10 bg-black/25 px-3 text-sm outline-none ring-sky-300/20 placeholder:text-slate-600 focus:ring-4"
            placeholder="Post a team update..."
          />
          <Button><Send className="size-4" /> Send</Button>
        </div>
      </Card>
    </>
  );
}
