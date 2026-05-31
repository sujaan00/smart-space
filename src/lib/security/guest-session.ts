import { randomUUID } from "node:crypto";

export const GUEST_COOKIE_NAME = "smartspace_guest";
const GUEST_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 14;

export type GuestSession = {
  id: string;
  createdAt: number;
  expiresAt: number;
  aiRequests: number;
  savedListingIds: string[];
};

const globalForGuestSessions = globalThis as unknown as {
  smartspaceGuestSessions?: Map<string, GuestSession>;
};

const guestSessions = globalForGuestSessions.smartspaceGuestSessions ?? new Map<string, GuestSession>();

if (process.env.NODE_ENV !== "production") {
  globalForGuestSessions.smartspaceGuestSessions = guestSessions;
}

export function createGuestSession() {
  const now = Date.now();
  const session: GuestSession = {
    id: randomUUID(),
    createdAt: now,
    expiresAt: now + GUEST_SESSION_TTL_MS,
    aiRequests: 0,
    savedListingIds: [],
  };

  guestSessions.set(session.id, session);
  return session;
}

export function saveGuestListing(sessionId: string, listingId: string) {
  const session = readGuestSession(sessionId);
  if (!session) return null;

  session.savedListingIds = [...new Set([...session.savedListingIds, listingId])].slice(0, 50);
  guestSessions.set(session.id, session);
  return session;
}

export function removeGuestListing(sessionId: string, listingId: string) {
  const session = readGuestSession(sessionId);
  if (!session) return null;

  session.savedListingIds = session.savedListingIds.filter((id) => id !== listingId);
  guestSessions.set(session.id, session);
  return session;
}

export function readGuestSession(id: string | undefined) {
  if (!id) return null;

  const session = guestSessions.get(id);
  if (!session || session.expiresAt <= Date.now()) {
    guestSessions.delete(id);
    return null;
  }

  return session;
}

export function getGuestCookieOptions(expiresAt: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
    path: "/",
  };
}
