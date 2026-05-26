"use client";

import { useMemo, useState, useTransition } from "react";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  Filter,
  Mail,
  Phone,
  PhoneCall,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Link from "next/link";
import { logQueueCall } from "@/app/(dashboard)/queue/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { queueOutcomes } from "@/lib/queue-data";
import type { DbQueueLead } from "@/lib/queue-service";

function statusClass(status: string) {
  if (status === "New") return "border-slate-400/20 bg-slate-300/10 text-slate-200";
  if (status === "Called") return "border-blue-300/25 bg-blue-400/10 text-blue-200";
  if (status === "No Answer") return "border-zinc-300/20 bg-zinc-300/10 text-zinc-200";
  if (status === "Booked") return "border-emerald-300/25 bg-emerald-400/10 text-emerald-200";
  if (status === "Callback") return "border-amber-300/25 bg-amber-400/10 text-amber-200";
  return "border-sky-300/20 bg-sky-300/10 text-sky-100";
}

export function QueueOperatingTable({ leads }: { leads: DbQueueLead[] }) {
  const [rows, setRows] = useState(leads);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [dueOnly, setDueOnly] = useState(false);
  const [selectedId, setSelectedId] = useState(rows[0]?.id ?? "");
  const [outcome, setOutcome] = useState(queueOutcomes[0]);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const selected = rows.find((lead) => lead.id === selectedId) ?? rows[0];

  const statusOptions = useMemo(
    () => ["All", ...Array.from(new Set(rows.map((lead) => lead.status)))],
    [rows],
  );

  const filteredRows = useMemo(() => {
    return rows.filter((lead) => {
      const searchMatch = `${lead.business} ${lead.phone} ${lead.city} ${lead.state} ${lead.niche}`
        .toLowerCase()
        .includes(query.toLowerCase());

      const statusMatch = status === "All" || lead.status === status;
      const dueMatch = !dueOnly || lead.due;

      return searchMatch && statusMatch && dueMatch;
    });
  }, [rows, query, status, dueOnly]);

  function callNextLead() {
    const nextLead = filteredRows.find((lead) => lead.due) ?? filteredRows[0] ?? rows[0];
    if (nextLead) setSelectedId(nextLead.id);
  }

  function saveLogAndNext() {
    if (!selected) return;

    setMessage("");

    startTransition(async () => {
      const result = await logQueueCall({
        leadId: selected.id,
        outcome,
        note,
      });

      if (!result.ok) {
        setMessage(result.message ?? "Could not save call.");
        return;
      }

      setRows((current) => current.filter((lead) => lead.id !== selected.id));

      const remaining = filteredRows.filter((lead) => lead.id !== selected.id);
      const nextLead = remaining[0] ?? rows.find((lead) => lead.id !== selected.id);

      if (nextLead) setSelectedId(nextLead.id);

      setOutcome(queueOutcomes[0]);
      setNote("");
      setMessage("Call logged in Supabase.");
    });
  }

  if (!selected) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-xl font-semibold text-white">No queue leads found</h2>
        <p className="mt-2 text-sm text-slate-400">
          Add leads in Supabase or import a CSV to start calling.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row">
            <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3 text-sm text-slate-400">
              <Search className="size-4 shrink-0" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search leads..."
                className="min-w-0 flex-1 bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
              />
            </div>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-11 rounded-xl border border-white/10 bg-white/[0.045] px-3 text-sm font-medium text-slate-200 outline-none"
            >
              {statusOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>

            <button
              onClick={() => setDueOnly((value) => !value)}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                dueOnly
                  ? "border-sky-300/40 bg-sky-300/15 text-sky-100"
                  : "border-white/10 bg-white/[0.045] text-slate-300 hover:bg-white/[0.08]"
              }`}
            >
              <Filter className="size-4" />
              Due now
            </button>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary">
              <Plus className="size-4" />
              New Contact
            </Button>
            <Button onClick={callNextLead}>
              <PhoneCall className="size-4" />
              Call Next Lead
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="grid grid-cols-[34px_1.2fr_0.8fr_0.75fr_0.9fr_0.7fr_0.45fr_0.5fr_0.75fr] border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            <div />
            <div>Business</div>
            <div>Phone</div>
            <div>Status</div>
            <div>Follow Up</div>
            <div>City</div>
            <div>ST</div>
            <div>Calls</div>
            <div className="text-right">Actions</div>
          </div>

          {filteredRows.map((lead) => {
            const active = selected.id === lead.id;

            return (
              <div
                key={lead.id}
                className={`grid grid-cols-[34px_1.2fr_0.8fr_0.75fr_0.9fr_0.7fr_0.45fr_0.5fr_0.75fr] items-center border-b border-white/5 px-4 py-4 last:border-b-0 ${
                  active ? "bg-sky-300/[0.07]" : "hover:bg-white/[0.035]"
                }`}
              >
                <button
                  onClick={() => setSelectedId(lead.id)}
                  className={`size-4 rounded-full border ${
                    active
                      ? "border-sky-300 bg-sky-300 shadow-[0_0_18px_rgba(46,175,255,0.45)]"
                      : "border-sky-300/60"
                  }`}
                  aria-label={`Select ${lead.business}`}
                />
                <div>
                  <div className="font-semibold text-white">{lead.business}</div>
                  <div className="mt-1 text-xs text-slate-500">{lead.niche} · Score {lead.score}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Phone className="size-3.5 text-slate-600" />
                  {lead.phone}
                </div>
                <Badge className={statusClass(lead.status)}>{lead.status}</Badge>
                <div className="text-sm text-slate-400">{lead.followUp}</div>
                <div className="text-sm text-slate-300">{lead.city}</div>
                <div className="text-sm text-slate-400">{lead.state}</div>
                <div>
                  <span className="rounded-md bg-white/[0.07] px-2 py-1 text-xs font-semibold text-slate-300">
                    {lead.calls}
                  </span>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedId(lead.id)}
                    className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/[0.1]"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => setSelectedId(lead.id)}
                    className="rounded-lg bg-sky-400 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-sky-300"
                  >
                    Log Call
                  </button>
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      <Card className="h-fit overflow-hidden">
        <div className="flex items-start justify-between border-b border-white/10 bg-white/[0.035] p-5">
          <div>
            <Badge className={statusClass(selected.status)}>{selected.status}</Badge>
            <h2 className="mt-3 text-xl font-semibold text-white">{selected.business}</h2>
            <p className="mt-1 text-sm text-slate-400">
              {selected.contact} · {selected.role}
            </p>
          </div>
          <button className="rounded-lg p-2 text-slate-500 hover:bg-white/[0.06] hover:text-slate-200">
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div className="grid grid-cols-2 gap-3">
            <MiniInfo icon={Phone} label="Phone" value={selected.phone} />
            <MiniInfo icon={Mail} label="Email" value={selected.email} />
            <MiniInfo icon={Building2} label="Market" value={`${selected.city}, ${selected.state}`} />
            <MiniInfo icon={CalendarClock} label="Follow Up" value={selected.followUp} />
          </div>

          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
              Next action
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-200">{selected.nextAction}</p>
            <p className="mt-3 text-sm leading-6 text-slate-500">{selected.notes}</p>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <SlidersHorizontal className="size-4 text-sky-300" />
              Outcome
            </div>
            <div className="grid grid-cols-2 gap-2">
              {queueOutcomes.map((item) => (
                <button
                  key={item}
                  onClick={() => setOutcome(item)}
                  className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold transition ${
                    outcome === item
                      ? "border-sky-300/60 bg-sky-300/15 text-sky-50"
                      : "border-white/10 bg-white/[0.04] text-slate-400 hover:bg-white/[0.08]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-white">Call note</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="mt-2 h-24 w-full resize-none rounded-xl border border-white/10 bg-black/25 p-3 text-sm text-white outline-none ring-sky-300/20 placeholder:text-slate-600 focus:ring-4"
              placeholder="What happened on the call?"
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/queue/call"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-slate-100 hover:bg-white/[0.1]"
            >
              Focus Mode
            </Link>
            <Button onClick={saveLogAndNext} disabled={isPending}>
              {isPending ? "Saving..." : "Save & Next"}
              <ArrowRight className="size-4" />
            </Button>
          </div>

          {message ? (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-300/15 bg-emerald-300/10 p-3 text-xs text-emerald-100">
              <CheckCircle2 className="size-4" />
              {message}
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

function MiniInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
        <Icon className="size-3.5" />
        {label}
      </div>
      <div className="mt-2 truncate text-sm font-medium text-slate-100">{value}</div>
    </div>
  );
}
