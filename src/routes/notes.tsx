import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { FeatureWorkspace, type FieldConfig } from "@/components/FeatureWorkspace";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Turn raw meeting notes or transcripts into key points, decisions, owners, and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer" },
      {
        property: "og:description",
        content: "Structured recaps with decisions, action items, owners, and deadlines.",
      },
    ],
  }),
  component: NotesPage,
});

const FIELDS: FieldConfig[] = [
  {
    name: "notes",
    label: "Raw notes or transcript",
    type: "textarea",
    rows: 12,
    placeholder: "Paste your messy notes, bullet points, or a meeting transcript…",
  },
  {
    name: "context",
    label: "Meeting context (optional)",
    type: "text",
    placeholder: "e.g. Weekly product sync, 6 attendees, Q3 roadmap",
  },
];

function NotesPage() {
  return (
    <AppShell
      title="Meeting Notes Summarizer"
      description="Key points, decisions, action items, and deadlines"
    >
      <FeatureWorkspace
        feature="notes"
        fields={FIELDS}
        requiredField="notes"
        submitLabel="Summarize meeting"
        emptyHint="Paste your notes and you'll get an executive summary, decisions, and an action-item table."
        tips={[
          "Include speaker names so owners can be assigned accurately.",
          "Keep timestamps or dates — deadlines are extracted from them.",
          "Owners and dates are never invented; unclear items are flagged.",
        ]}
        sample={{
          notes:
            "Weekly product sync.\nPriya: onboarding drop-off is 38% at step 3. Wants to cut the company-size question.\nTom: engineering can ship the shorter form next sprint, needs final copy by Friday.\nPriya agreed to send copy Thursday.\nDaniel raised that legal still needs to review the new consent text - he'll ping legal today, expects an answer within a week.\nDecision: we ship the 3-step form, keep the analytics event names unchanged.\nOpen: do we A/B test or roll out to everyone? Tom to propose an approach next week.",
          context: "Weekly product sync, 3 attendees, onboarding funnel",
        }}
      />
    </AppShell>
  );
}
