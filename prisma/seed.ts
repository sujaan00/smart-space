import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, PropertyType } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/smartspace",
});
const prisma = new PrismaClient({ adapter });

const neighborhoodSeeds = [
  {
    slug: "indiranagar",
    name: "Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    summary: "Metro-connected premium neighborhood with strong walkability and dining access.",
  },
  {
    slug: "koramangala",
    name: "Koramangala",
    city: "Bengaluru",
    state: "Karnataka",
    summary: "High-demand rental market close to startup offices, cafes, and everyday amenities.",
  },
  {
    slug: "whitefield",
    name: "Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    summary: "Growing office corridor supported by transit expansion and new residential supply.",
  },
];

async function main() {
  for (const neighborhoodSeed of neighborhoodSeeds) {
    await prisma.neighborhood.upsert({
      where: { slug: neighborhoodSeed.slug },
      update: neighborhoodSeed,
      create: neighborhoodSeed,
    });
  }

  const indiranagar = await prisma.neighborhood.findUniqueOrThrow({ where: { slug: "indiranagar" } });
  const property = await prisma.property.create({
    data: {
      neighborhoodId: indiranagar.id,
      type: PropertyType.APARTMENT,
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 1680,
      furnishing: "Semi-furnished",
      amenities: ["Metro nearby", "Quiet lane", "Natural light"],
    },
  });

  await prisma.listing.create({
    data: {
      propertyId: property.id,
      title: "Sunlit Residences",
      description: "Bright three-bedroom apartment in a quieter pocket of Indiranagar.",
      price: 18_500_000,
      status: "PUBLISHED",
      isVerified: true,
      publishedAt: new Date(),
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

