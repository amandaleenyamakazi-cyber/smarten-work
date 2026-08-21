import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { FeatureWorkspace, type FieldConfig } from "@/components/FeatureWorkspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Generate professional workplace emails tailored to your audience, tone, and length in seconds.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      {
        property: "og:description",
        content: "Tone- and audience-aware AI email drafts with subject lines and clear next steps.",
      },
    ],
  }),
  component: EmailPage,
});

const FIELDS: FieldConfig[] = [
  {
    name: "brief",
    label: "What do you need to say?",
    type: "textarea",
    rows: 7,
    placeholder:
      "e.g. Tell the client the design review slipped by two days, propose Thursday 10:00, reassure them the launch date holds.",
  },
  {
    name: "audience",
    label: "Audience",
    type: "select",
    options: [
      "Client",
      "Manager / executive",
      "Direct report",
      "Cross-functional team",
      "External vendor",
      "New prospect",
    ],
    defaultValue: "Client",
  },
  {
    name: "tone",
    label: "Tone",
    type: "select",
    options: [
      "Professional",
      "Warm and friendly",
      "Direct and concise",
      "Persuasive",
      "Apologetic",
      "Formal",
    ],
    defaultValue: "Professional",
  },
  {
    name: "length",
    label: "Length",
    type: "select",
    options: ["Short (under 100 words)", "Medium", "Detailed"],
    defaultValue: "Medium",
  },
];

function EmailPage() {
  return (
    <AppShell
      title="Smart Email Generator"
      description="Audience- and tone-aware drafts, ready to review and send"
    >
      <FeatureWorkspace
        feature="email"
        fields={FIELDS}
        requiredField="brief"
        submitLabel="Generate email"
        emptyHint="Describe the message you need and your draft will appear here with subject line options."
        tips={[
          "Name the outcome you want (approval, a meeting, a decision).",
          "Include hard facts: dates, numbers, names, links.",
          "Mention anything that must not be said.",
        ]}
        sample={{
          brief:
            "Let the client know the design review moved from Tuesday to Thursday because of a late asset delivery. Propose Thursday 10:00 or Friday 14:00. Confirm the 12 September launch date is unaffected. Thank them for their patience.",
          audience: "Client",
          tone: "Professional",
          length: "Medium",
        }}
      />
    </AppShell>
  );
}
