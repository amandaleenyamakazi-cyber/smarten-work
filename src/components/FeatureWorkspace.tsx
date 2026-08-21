import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OutputPanel } from "@/components/AiOutput";
import { generateAssistantOutput } from "@/lib/ai.functions";
import type { Feature } from "@/lib/prompts";

export type FieldConfig =
  | { name: string; label: string; type: "text"; placeholder?: string; defaultValue?: string }
  | {
      name: string;
      label: string;
      type: "textarea";
      placeholder?: string;
      rows?: number;
      defaultValue?: string;
    }
  | {
      name: string;
      label: string;
      type: "select";
      options: string[];
      defaultValue: string;
    };

export function FeatureWorkspace({
  feature,
  fields,
  submitLabel,
  emptyHint,
  tips,
  requiredField,
  sample,
}: {
  feature: Feature;
  fields: FieldConfig[];
  submitLabel: string;
  emptyHint: string;
  tips: string[];
  requiredField: string;
  sample: Record<string, string>;
}) {
  const initial = Object.fromEntries(
    fields.map((f) => [f.name, "defaultValue" in f && f.defaultValue ? f.defaultValue : ""]),
  ) as Record<string, string>;

  const [values, setValues] = useState<Record<string, string>>(initial);
  const generate = useServerFn(generateAssistantOutput);

  const mutation = useMutation({
    mutationFn: async (data: Record<string, string>) =>
      generate({ data: { feature, fields: data } }),
  });

  const set = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));
  const canSubmit = (values[requiredField] ?? "").trim().length > 3;

  return (
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <form
        className="card-surface flex h-fit flex-col gap-5 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) mutation.mutate(values);
        }}
      >
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.type === "text" && (
              <Input
                id={field.name}
                value={values[field.name] ?? ""}
                placeholder={field.placeholder}
                onChange={(e) => set(field.name, e.target.value)}
              />
            )}
            {field.type === "textarea" && (
              <Textarea
                id={field.name}
                rows={field.rows ?? 7}
                value={values[field.name] ?? ""}
                placeholder={field.placeholder}
                onChange={(e) => set(field.name, e.target.value)}
                className="resize-y"
              />
            )}
            {field.type === "select" && (
              <Select value={values[field.name]} onValueChange={(v) => set(field.name, v)}>
                <SelectTrigger id={field.name}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        ))}

        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={!canSubmit || mutation.isPending} className="flex-1">
            {mutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="size-4" /> {submitLabel}
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setValues({ ...initial, ...sample });
              mutation.reset();
            }}
          >
            <RotateCcw className="size-4" /> Sample
          </Button>
        </div>

        <div className="rounded-lg bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
          <p className="mb-2 font-semibold text-foreground">Prompt tips</p>
          <ul className="list-disc space-y-1 pl-4">
            {tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </form>

      <OutputPanel
        loading={mutation.isPending}
        error={mutation.isError ? (mutation.error as Error).message : null}
        text={mutation.data?.text ?? null}
        emptyHint={emptyHint}
      />
    </div>
  );
}
