import { streamText } from "ai";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";
import { BASE_SYSTEM, CHAT_SYSTEM, buildPrompt, type Feature } from "./prompts";

const MODEL = "google/gemini-3.7-flash";

function friendlyError(error: unknown): never {
  const status =
    typeof error === "object" && error !== null
      ? ((error as { statusCode?: number; status?: number }).statusCode ??
        (error as { status?: number }).status)
      : undefined;
  const message = error instanceof Error ? error.message : "Unknown AI error";

  if (status === 429) {
    throw new Error("The assistant is rate limited right now. Please try again in a moment.");
  }
  if (status === 402) {
    throw new Error(
      "AI credits are exhausted for this workspace. The app owner needs to add credits in Lovable.",
    );
  }
  if (status === 403) {
    throw new Error("AI access is blocked by workspace policy. Please contact the app owner.");
  }
  if (status === 401) {
    throw new Error("AI is not configured correctly (missing or invalid API key).");
  }
  throw new Error(message);
}

export async function runAssistantPrompt(feature: Feature, fields: Record<string, string>) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured: missing LOVABLE_API_KEY.");

  const gateway = createLovableAiGatewayProvider(key);
  try {
    const result = streamText({
      model: gateway(MODEL),
      system: BASE_SYSTEM,
      prompt: buildPrompt(feature, fields),
    });
    return { text: await result.text };
  } catch (error) {
    friendlyError(error);
  }
}

export async function runAssistantChat(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured: missing LOVABLE_API_KEY.");

  const gateway = createLovableAiGatewayProvider(key);
  try {
    const result = streamText({
      model: gateway(MODEL),
      system: CHAT_SYSTEM,
      messages,
    });
    return { text: await result.text };
  } catch (error) {
    friendlyError(error);
  }
}
