import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/crm/page-header";
import { getContactById } from "@/lib/contacts-service";

export const dynamic = "force-dynamic";

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = await getContactById(id);

  if (!contact) {
    notFound();
  }

  return (
    <>
      <Link
        href="/contacts"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to contacts
      </Link>

      <PageHeader
        eyebrow="Contact"
        title={contact.business}
        description="Lead details, contact info, and current CRM status."
      />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-5">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {contact.business}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {contact.contact || "No contact name yet"}
              </p>
            </div>

            <Badge className="border-sky-300/25 bg-sky-400/10 text-sky-200">
              {contact.status}
            </Badge>
          </div>

          <div className="grid gap-3 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <Phone className="size-4 text-sky-300" />
              {contact.phone || "No phone"}
            </div>

            <div className="flex items-center gap-3">
              <Mail className="size-4 text-sky-300" />
              {contact.email || "No email"}
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="size-4 text-sky-300" />
              {[contact.city, contact.state].filter(Boolean).join(", ") ||
                "No location"}
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Lead Snapshot
          </h3>

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-slate-500">Score</p>
              <p className="text-2xl font-semibold text-white">
                {contact.score}
              </p>
            </div>

            <div>
              <p className="text-slate-500">Source</p>
              <p className="text-white">{contact.source || "Imported lead"}</p>
            </div>

            <div>
              <p className="text-slate-500">Last Contacted</p>
              <p className="text-white">
                {contact.lastContacted || "Not contacted yet"}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
