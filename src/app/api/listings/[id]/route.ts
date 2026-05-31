import { getServerSession } from "next-auth";
import { z } from "zod";
import { ok, problem } from "@/lib/api-response";
import { authOptions } from "@/lib/auth-options";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientKey } from "@/lib/security/rate-limit";

const listingUpdateSchema = z
  .object({
    title: z.string().trim().min(3).max(100).optional(),
    description: z.string().trim().min(20).max(5_000).optional(),
    price: z.coerce.number().positive().max(1_000_000_000).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, "Provide at least one change.");

async function requireListingOwner(id: string) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return null;

  const listing = await prisma.listing.findUnique({
    where: { id },
    select: { id: true, ownerId: true, owner: { select: { email: true } } },
  });

  if (!listing?.ownerId || listing.owner?.email !== email) {
    return null;
  }

  return listing;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.DATABASE_URL) {
    return problem("Database-backed listing updates are not configured in this environment.", 503, "DATABASE_UNAVAILABLE");
  }

  const { id } = await params;
  const rateLimit = checkRateLimit({ key: `listing-update:${getClientKey(request)}`, limit: 20, windowMs: 60_000 });
  if (!rateLimit.allowed) return problem("Too many listing changes. Please wait a minute.", 429, "RATE_LIMITED");

  const listing = await requireListingOwner(id);
  if (!listing) return problem("You do not have permission to edit this listing.", 403, "FORBIDDEN");

  const parsed = listingUpdateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return problem("Check the listing changes and try again.", 422, "VALIDATION_ERROR");

  const updated = await prisma.listing.update({
    where: { id },
    data: parsed.data,
    select: { id: true, title: true, description: true, price: true, updatedAt: true },
  });

  await prisma.auditLog.create({
    data: { actorUserId: listing.ownerId, action: "listing.updated", entityType: "Listing", entityId: id },
  });
  logger.info("listing_updated", { listingId: id });
  return ok(updated);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.DATABASE_URL) {
    return problem("Database-backed listing updates are not configured in this environment.", 503, "DATABASE_UNAVAILABLE");
  }

  const { id } = await params;
  const rateLimit = checkRateLimit({ key: `listing-delete:${getClientKey(request)}`, limit: 6, windowMs: 60_000 });
  if (!rateLimit.allowed) return problem("Too many listing changes. Please wait a minute.", 429, "RATE_LIMITED");

  const listing = await requireListingOwner(id);
  if (!listing) return problem("You do not have permission to archive this listing.", 403, "FORBIDDEN");

  await prisma.$transaction([
    prisma.listing.update({ where: { id }, data: { status: "ARCHIVED" } }),
    prisma.auditLog.create({
      data: { actorUserId: listing.ownerId, action: "listing.archived", entityType: "Listing", entityId: id },
    }),
  ]);
  logger.info("listing_archived", { listingId: id });
  return ok({ id, status: "ARCHIVED" });
}

