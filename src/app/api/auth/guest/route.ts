import { cookies } from "next/headers";
import { ok } from "@/lib/api-response";
import { createGuestSession, getGuestCookieOptions, GUEST_COOKIE_NAME } from "@/lib/security/guest-session";
import { checkRateLimit, getClientKey } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rateLimit = checkRateLimit({ key: `guest:${clientKey}`, limit: 10, windowMs: 60_000 });

  if (!rateLimit.allowed) {
    return Response.json({ ok: false, error: { code: "RATE_LIMITED", message: "Please wait a moment before starting another guest session." } }, { status: 429 });
  }

  const session = createGuestSession();
  const cookieStore = await cookies();
  cookieStore.set(GUEST_COOKIE_NAME, session.id, getGuestCookieOptions(session.expiresAt));

  return ok({ role: "guest", expiresAt: new Date(session.expiresAt).toISOString() }, { status: 201 });
}

