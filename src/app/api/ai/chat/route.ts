import { cookies } from "next/headers";
import { ok, problem } from "@/lib/api-response";
import { logger } from "@/lib/logger";
import { readGuestSession, GUEST_COOKIE_NAME } from "@/lib/security/guest-session";
import { checkRateLimit, getClientKey } from "@/lib/security/rate-limit";
import { answerPropertyQuestion } from "@/lib/services/ai-service";
import { aiChatSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const guest = readGuestSession(cookieStore.get(GUEST_COOKIE_NAME)?.value);
  const clientKey = guest?.id ?? getClientKey(request);
  const rateLimit = checkRateLimit({ key: `ai-chat:${clientKey}`, limit: guest ? 12 : 6, windowMs: 60_000 });

  if (!rateLimit.allowed) {
    logger.warn("ai_chat_rate_limited", { clientKey });
    return problem("You have reached the preview limit. Please wait a minute and try again.", 429, "RATE_LIMITED");
  }

  const parsed = aiChatSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return problem("Please enter a clear question under 1,200 characters.", 422, "VALIDATION_ERROR");
  }

  const answer = answerPropertyQuestion(parsed.data.message, parsed.data.locale);
  logger.info("ai_chat_answered", { locale: parsed.data.locale, guest: Boolean(guest) });
  return ok(answer);
}

