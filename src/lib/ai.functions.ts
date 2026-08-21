import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runAssistantPrompt, runAssistantChat } from "./ai-run.server";

const GenerateInput = z.object({
  feature: z.enum(["email", "notes", "planner", "research"]),
  fields: z.record(z.string()),
});

export const generateAssistantOutput = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => GenerateInput.parse(input))
  .handler(async ({ data }) => runAssistantPrompt(data.feature, data.fields));

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .min(1),
});

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => runAssistantChat(data.messages));
