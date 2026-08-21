import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { FeatureWorkspace, type FieldConfig } from "@/components/FeatureWorkspace";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Prioritize your task list by impact and urgency and get a realistic time-blocked schedule.",
      },
      { property: "og:title", content: "AI Task Planner" },
      {
        property: "og:description",
        content: "Impact-and-urgency prioritization plus a time-blocked plan for your day or week.",
      },
    ],
  }),
  component: PlannerPage,
});

const FIELDS: FieldConfig[] = [
  {
    name: "tasks",
    label: "Your tasks (one per line)",
    type: "textarea",
    rows: 9,
    placeholder: "Finish Q3 budget\nReview Sam's PR\nPrep board deck\nRespond to vendor quote…",
  },
  {
    name: "horizon",
    label: "Planning horizon",
    type: "select",
    options: ["Today", "Tomorrow", "This week", "Next two weeks"],
    defaultValue: "Today",
  },
  {
    name: "hours",
    label: "Available working hours",
    type: "select",
    options: ["3", "4", "6", "8", "10"],
    defaultValue: "8",
  },
  {
    name: "priorities",
    label: "Hard deadlines or priorities (optional)",
    type: "text",
    placeholder: "e.g. Board deck due Thursday 09:00; budget can slip",
  },
];

function PlannerPage() {
  return (
    <AppShell
      title="AI Task Planner"
      description="Prioritization, effort estimates, and a time-blocked schedule"
    >
      <FeatureWorkspace
        feature="planner"
        fields={FIELDS}
        requiredField="tasks"
        submitLabel="Build my plan"
        emptyHint="List your tasks and you'll get a ranked priority table plus a realistic schedule."
        tips={[
          "One task per line keeps the ranking clean.",
          "Note dependencies (‘needs legal sign-off first’).",
          "Set honest working hours so the schedule stays realistic.",
        ]}
        sample={{
          tasks:
            "Finish Q3 budget spreadsheet\nReview Sam's pull request\nPrep board deck (12 slides)\nRespond to vendor quote\nBook team offsite venue\n1:1 with Ana\nClear inbox backlog",
          horizon: "Today",
          hours: "8",
          priorities: "Board deck due tomorrow 09:00; vendor quote expires today",
        }}
      />
    </AppShell>
  );
}
