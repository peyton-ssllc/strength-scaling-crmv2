import { LeadWorkspace } from "@/components/crm/lead-workspace";
import { PageHeader } from "@/components/crm/page-header";

export default function CallModePage() {
  return (
    <>
      <PageHeader
        eyebrow="Call Mode"
        title="Focused rep workflow"
        description="A stripped-down operating view for high-volume calling. The only goal is to complete the current touch and move immediately to the next lead."
      />
      <LeadWorkspace compact />
    </>
  );
}
