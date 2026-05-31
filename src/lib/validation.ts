import { z } from "zod";

export const aiChatSchema = z.object({
  message: z.string().trim().min(2).max(1_200),
  locale: z.enum(["en", "hi"]).default("en"),
  sessionId: z.string().uuid().optional(),
});

export const listingDraftSchema = z.object({
  title: z.string().trim().min(3).max(100),
  locality: z.string().trim().min(2).max(80),
  propertyType: z.enum(["Apartment", "Villa", "Penthouse", "Office"]),
  bedrooms: z.coerce.number().int().min(0).max(20),
  bathrooms: z.coerce.number().int().min(0).max(20),
  area: z.coerce.number().positive().max(100_000),
  notes: z.string().trim().max(4_000).optional(),
});

export const uploadMetadataSchema = z.object({
  fileName: z.string().trim().min(1).max(180),
  fileSize: z.number().int().positive().max(12 * 1024 * 1024),
  contentType: z.enum([
    "image/jpeg",
    "image/png",
    "image/webp",
    "audio/mpeg",
    "audio/mp4",
    "audio/wav",
    "audio/webm",
  ]),
});

