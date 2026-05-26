"use client";

import { useMemo, useState, useTransition } from "react";
import { CheckCircle2, FileSpreadsheet, UploadCloud, XCircle } from "lucide-react";
import { importLeadsFromCsv, type ImportLeadInput } from "@/app/(dashboard)/import-leads/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type CsvRow = Record<string, string>;

function splitCsvLine(line: string) {
  const result: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function parseCsv(text: string) {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]).map((header) =>
    header.replace(/^"|"$/g, "").trim(),
  );

  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    const row: CsvRow = {};

    headers.forEach((header, index) => {
      row[header] = (values[index] ?? "").replace(/^"|"$/g, "").trim();
    });

    return row;
  });
}

function pick(row: CsvRow, names: string[]) {
  const normalized = Object.entries(row).map(([key, value]) => ({
    key: key.toLowerCase().replace(/[^a-z0-9]/g, ""),
    value,
  }));

  for (const name of names) {
    const target = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const match = normalized.find((entry) => entry.key === target);
    if (match?.value) return match.value;
  }

  return "";
}

function mapRowToLead(row: CsvRow): ImportLeadInput {
  const business =
    pick(row, ["business_name", "business", "company", "company_name", "gym", "gym_name", "name"]) ||
    "Unknown Business";

  const contact = pick(row, ["contact_name", "contact", "owner", "owner_name", "first_name", "full_name"]);

  const scoreValue = Number(pick(row, ["score", "lead_score"]));

  return {
    business_name: business,
    contact_name: contact,
    owner_name: pick(row, ["owner_name", "owner"]) || contact,
    email: pick(row, ["email", "email_address", "owner_email"]),
    phone: pick(row, ["phone", "phone_number", "mobile", "cell", "owner_phone"]),
    website: pick(row, ["website", "url", "site"]),
    instagram_url: pick(row, ["instagram", "instagram_url", "ig"]),
    city: pick(row, ["city", "town", "market"]),
    state: pick(row, ["state", "st"]),
    lead_source: pick(row, ["lead_source", "source", "list"]),
    score: Number.isFinite(scoreValue) && scoreValue > 0 ? scoreValue : 50,
  };
}

export function ImportLeadsUploader() {
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isPending, startTransition] = useTransition();

  const leads = useMemo(() => rows.map(mapRowToLead), [rows]);
  const preview = leads.slice(0, 8);

  async function handleFile(file: File | undefined) {
    setMessage("");
    setIsError(false);

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setMessage("Please upload a CSV file.");
      setIsError(true);
      return;
    }

    const text = await file.text();
    const parsedRows = parseCsv(text);

    setFileName(file.name);
    setRows(parsedRows);

    if (parsedRows.length === 0) {
      setMessage("No rows found. Make sure the first row has column headers.");
      setIsError(true);
    }
  }

  function handleImport() {
    setMessage("");
    setIsError(false);

    startTransition(async () => {
      const result = await importLeadsFromCsv({
        fileName,
        leads,
      });

      setMessage(result.message);
      setIsError(!result.ok);

      if (result.ok) {
        setRows([]);
        setFileName("");
      }
    });
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
            <UploadCloud className="size-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Upload CSV</h2>
            <p className="text-sm text-slate-400">Import gym leads without touching Supabase.</p>
          </div>
        </div>

        <label className="mt-6 flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/20 p-6 text-center hover:bg-white/[0.035]">
          <FileSpreadsheet className="size-12 text-sky-200" />
          <span className="mt-4 text-sm font-semibold text-white">
            Choose or drag in a CSV file
          </span>
          <span className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Common columns like business, phone, email, city, state, owner, website, and source are detected automatically.
          </span>
          <input
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
        </label>

        {fileName ? (
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300">
            <div className="font-semibold text-white">{fileName}</div>
            <div className="mt-1 text-slate-500">{rows.length} rows detected</div>
          </div>
        ) : null}

        {message ? (
          <div
            className={`mt-4 flex items-center gap-2 rounded-xl border p-3 text-sm ${
              isError
                ? "border-red-300/20 bg-red-400/10 text-red-200"
                : "border-emerald-300/20 bg-emerald-400/10 text-emerald-200"
            }`}
          >
            {isError ? <XCircle className="size-4" /> : <CheckCircle2 className="size-4" />}
            {message}
          </div>
        ) : null}
      </Card>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <h2 className="text-lg font-semibold text-white">Import preview</h2>
            <p className="text-sm text-slate-400">Review mapped leads before importing.</p>
          </div>
          <Button onClick={handleImport} disabled={isPending || leads.length === 0}>
            {isPending ? "Importing..." : `Import ${leads.length || ""} Leads`}
          </Button>
        </div>

        <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr_0.5fr] border-b border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          <div>Business</div>
          <div>Contact</div>
          <div>Phone</div>
          <div>City</div>
          <div>Score</div>
        </div>

        {preview.length > 0 ? (
          preview.map((lead, index) => (
            <div
              key={`${lead.business_name}-${index}`}
              className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr_0.5fr] border-b border-white/5 px-5 py-4 text-sm last:border-b-0"
            >
              <div className="font-medium text-white">{lead.business_name}</div>
              <div className="text-slate-400">{lead.contact_name || "-"}</div>
              <div className="text-slate-300">{lead.phone || "-"}</div>
              <div className="text-slate-400">{lead.city || "-"}</div>
              <div className="font-semibold text-sky-200">{lead.score ?? 50}</div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-sm text-slate-500">
            Upload a CSV to preview leads here.
          </div>
        )}
      </Card>
    </div>
  );
}
