import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, Search, MessageSquare, ArrowRight, Zap } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Disclaimer } from "@/components/AiOutput";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant — Dashboard" },
      {
        name: "description",
        content:
          "Automate daily work with AI: draft emails, summarize meetings, plan tasks, and research topics from one professional dashboard.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Draft emails, summarize meetings, prioritize tasks, and research faster with one AI workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/email",
    label: "Smart Email Generator",
    icon: Mail,
    text: "Tone- and audience-aware drafts with subject lines and a clear call to action.",
  },
  {
    to: "/notes",
    label: "Meeting Notes Summarizer",
    icon: FileText,
    text: "Turn raw notes into decisions, action items with owners, and open questions.",
  },
  {
    to: "/planner",
    label: "AI Task Planner",
    icon: ListChecks,
    text: "Prioritize by impact and urgency, then get a realistic time-blocked schedule.",
  },
  {
    to: "/research",
    label: "AI Research Assistant",
    icon: Search,
    text: "Executive briefings with insights, trade-offs, and recommended next steps.",
  },
  {
    to: "/chat",
    label: "AI Chatbot",
    icon: MessageSquare,
    text: "Ask anything about your work in a running conversation with full context.",
  },
] as const;

const STATS = [
  { label: "Workflows automated", value: "5" },
  { label: "Structured prompts", value: "Built-in" },
  { label: "Avg. draft time", value: "< 30s" },
  { label: "Human review", value: "Always" },
];

function Dashboard() {
  return (
    <AppShell
      title="Dashboard"
      description="Your AI workspace for daily professional tasks"
    >
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="card-surface relative overflow-hidden p-6 lg:p-9">
          <div className="absolute -top-24 -right-16 size-72 rounded-full bg-brand-soft blur-2xl" />
          <div className="relative max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-primary">
              <Zap className="size-3.5" /> Powered by Lovable AI
            </span>
            <h2 className="font-display text-2xl leading-tight font-semibold lg:text-3xl">
              Get an hour back, every working day.
            </h2>
            <p className="text-sm text-muted-foreground lg:text-base">
              Five structured AI workflows built for professionals: write the email, close the
              meeting, plan the day, brief the team. Each tool uses a carefully engineered prompt so
              the output arrives clear, professional, and ready to send.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/email"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Draft an email <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
              >
                Open AI chat
              </Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="card-surface p-4">
              <p className="font-display text-xl font-semibold text-primary">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Workflows
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {TOOLS.map(({ to, label, icon: Icon, text }) => (
              <Link
                key={to}
                to={to}
                className="card-surface group flex flex-col gap-3 p-5 transition-shadow hover:shadow-lift"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-base font-semibold">{label}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary">
                  Open
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
