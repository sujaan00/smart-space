import { cookies } from "next/headers";
import { ok, problem } from "@/lib/api-response";
import { logger } from "@/lib/logger";
import { readGuestSession, GUEST_COOKIE_NAME } from "@/lib/security/guest-session";
import { checkRateLimit, getClientKey } from "@/lib/security/rate-limit";
import { buildListingDraft } from "@/lib/services/ai-service";
import { listingDraftSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const guest = readGuestSession(cookieStore.get(GUEST_COOKIE_NAME)?.value);
  const clientKey = guest?.id ?? getClientKey(request);
  const rateLimit = checkRateLimit({ key: `listing-draft:${clientKey}`, limit: guest ? 5 : 3, windowMs: 60_000 });

  if (!rateLimit.allowed) {
    logger.warn("listing_draft_rate_limited", { clientKey });
    return problem("You have reached the draft preview limit. Please wait a minute and try again.", 429, "RATE_LIMITED");
  }

  const parsed = listingDraftSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return problem("Check the property details and try again.", 422, "VALIDATION_ERROR");
  }

  const draft = buildListingDraft(parsed.data);
  logger.info("listing_draft_generated", { guest: Boolean(guest), propertyType: parsed.data.propertyType });
  return ok(draft, { status: 201 });
}

