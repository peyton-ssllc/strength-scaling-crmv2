"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Mail, MessageSquare, PhoneCall, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { leads, outcomes } from "@/lib/crm-data";

export function LeadWorkspace({ compact = false }: { compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [selectedOutcome, setSelectedOutcome] = useState(outcomes[0]);
  const lead = leads[index % leads.length];
  const attempts = useMemo(() => 3 + index, [index]);

  return (
    <div className={compact ? "grid gap-4 xl:grid-cols-[1.1fr_0.9fr]" : "grid gap-5 xl:grid-cols-[1.15fr_0.85fr]"}>
      <Card className="overflow-hidden">
        <div className="border-b border-white/10 bg-white/[0.035] p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{lead.status}</Badge>
                <Badge className="border-emerald-300/20 bg-emerald-300/10 text-emerald-100">
                  Score {lead.score}
                </Badge>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">{lead.business}</h2>
              <p className="mt-1 text-sm text-slate-400">
                {lead.contact}, {lead.role} · {lead.location}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button className="px-3" aria-label="Call lead">
                <PhoneCall className="size-4" />
              </Button>
              <Button variant="secondary" className="px-3" aria-label="Text lead">
                <MessageSquare className="size-4" />
              </Button>
              <Button variant="secondary" className="px-3" aria-label="Email lead">
                <Mail className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-3">
            <Info label="Phone" value={lead.phone} />
            <Info label="Email" value={lead.email} />
            <Info label="Source" value={lead.source} />
            <Info label="Last touch" value={lead.lastTouch} />
            <Info label="Attempts" value={`${attempts} total`} />
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-sky-200">
              Suggested next action
            </div>
            <p className="mt-3 text-lg font-medium text-white">{lead.nextAction}</p>
            <p className="mt-4 text-sm leading-6 text-slate-400">{lead.notes}</p>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Log outcome</h3>
            <p className="text-sm text-slate-400">One click, short note, next lead loads.</p>
          </div>
          <Button variant="ghost" className="h-9 px-3">
            <RotateCcw className="size-4" /> Skip
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {outcomes.map((outcome) => (
            <button
              key={outcome}
              onClick={() => setSelectedOutcome(outcome)}
              className={`rounded-lg border px-3 py-3 text-left text-sm font-medium transition ${
                selectedOutcome === outcome
                  ? "border-sky-300/60 bg-sky-300/15 text-sky-50"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
              }`}
            >
              {outcome}
            </button>
          ))}
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-medium text-slate-300">Rep note</span>
          <textarea
            className="mt-2 h-28 w-full resize-none rounded-lg border border-white/10 bg-black/25 p-3 text-sm text-white outline-none ring-sky-300/20 placeholder:text-slate-600 focus:ring-4"
            placeholder="Quick context for the next touch..."
          />
        </label>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <select className="h-10 rounded-lg border border-white/10 bg-black/25 px-3 text-sm text-slate-200 outline-none">
            <option>Follow up tomorrow</option>
            <option>Follow up in 2 days</option>
            <option>Follow up next week</option>
            <option>No follow-up needed</option>
          </select>
          <Button
            onClick={() => setIndex((value) => value + 1)}
            className="w-full"
          >
            Save & Load Next Lead <ArrowRight className="size-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-medium text-slate-100">{value}</div>
    </div>
  );
}
