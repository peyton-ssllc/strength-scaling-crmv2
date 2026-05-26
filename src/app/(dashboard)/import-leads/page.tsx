import { ImportLeadsUploader } from "@/components/crm/import-leads-uploader";
import { PageHeader } from "@/components/crm/page-header";

export default function ImportLeadsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Import Leads"
        title="Upload gym lead CSVs"
        description="Import leads directly from the CRM. New leads are saved to Supabase and become available in My Queue."
      />

      <ImportLeadsUploader />
    </>
  );
}
