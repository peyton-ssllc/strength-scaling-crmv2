import { UploadCloud } from "lucide-react";
import { PageHeader } from "@/components/crm/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const fields = ["Business Name", "Owner Name", "Phone", "Email", "Website", "City", "State", "Lead Source"];

export default function ImportLeadsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Import Leads"
        title="Load new gym owner lists"
        description="CSV import with mapping, duplicate review, and validation before new leads enter rep queues."
      />
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="flex min-h-[320px] flex-col items-center justify-center border-dashed p-8 text-center">
          <UploadCloud className="size-12 text-sky-200" />
          <h2 className="mt-4 text-xl font-semibold text-white">Drop a CSV file</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
            The importer maps fields, catches duplicates, and creates clean queue-ready leads.
          </p>
          <Button className="mt-5">Choose File</Button>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Field mapping</h2>
            <Badge>Preview</Badge>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field} className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                <div className="text-sm font-medium text-white">{field}</div>
                <select className="mt-2 h-9 w-full rounded-lg border border-white/10 bg-black/25 px-2 text-sm text-slate-300">
                  <option>Map CSV column</option>
                  <option>{field}</option>
                </select>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
