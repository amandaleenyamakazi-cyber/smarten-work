import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import { AlertTriangle, Check, Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`flex items-start gap-2 text-xs text-muted-foreground ${className}`}>
      <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-warning" />
      AI-generated content may require human review.
    </p>
  );
}

export function OutputPanel({
  text,
  loading,
  error,
  emptyHint,
}: {
  text: string | null;
  loading: boolean;
  error: string | null;
  emptyHint: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="card-surface flex min-h-[22rem] flex-col p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          AI Output
        </h2>
        {text && !loading && (
          <Button variant="outline" size="sm" onClick={copy}>
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        )}
      </div>

      {loading && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin text-primary" />
            Drafting a professional response…
          </div>
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {!loading && !error && !text && (
        <div className="flex flex-1 items-center justify-center text-center text-sm text-muted-foreground">
          <p className="max-w-xs">{emptyHint}</p>
        </div>
      )}

      {!loading && !error && text && (
        <>
          <div className="ai-prose flex-1">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
          <Disclaimer className="mt-5 border-t border-border pt-4" />
        </>
      )}
    </div>
  );
}
