import { cookies } from "next/headers";
import { z } from "zod";
import { ok, problem } from "@/lib/api-response";
import { GUEST_COOKIE_NAME, readGuestSession, removeGuestListing, saveGuestListing } from "@/lib/security/guest-session";
import { checkRateLimit, getClientKey } from "@/lib/security/rate-limit";

const savedListingSchema = z.object({
  listingId: z.string().trim().min(2).max(120),
});

async function updateSavedListing(request: Request, action: "save" | "remove") {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(GUEST_COOKIE_NAME)?.value;
  const guest = readGuestSession(sessionId);

  if (!guest || !sessionId) {
    return problem("Start a guest session or sign in before saving homes.", 401, "UNAUTHENTICATED");
  }

  const rateLimit = checkRateLimit({ key: `saved-listing:${guest.id}:${getClientKey(request)}`, limit: 30, windowMs: 60_000 });
  if (!rateLimit.allowed) {
    return problem("Too many save changes. Please wait a moment.", 429, "RATE_LIMITED");
  }

  const parsed = savedListingSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return problem("Choose a valid listing.", 422, "VALIDATION_ERROR");
  }

  const updated = action === "save" ? saveGuestListing(sessionId, parsed.data.listingId) : removeGuestListing(sessionId, parsed.data.listingId);
  return ok({ listingId: parsed.data.listingId, saved: action === "save", total: updated?.savedListingIds.length ?? 0 });
}

export async function POST(request: Request) {
  return updateSavedListing(request, "save");
}

export async function DELETE(request: Request) {
  return updateSavedListing(request, "remove");
}

