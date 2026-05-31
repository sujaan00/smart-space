import { neighborhoods, properties } from "@/lib/data";

type ChatLocale = "en" | "hi";

function findNeighborhood(message: string) {
  const normalized = message.toLowerCase();
  return neighborhoods.find((area) => normalized.includes(area.name.toLowerCase()));
}

export function answerPropertyQuestion(message: string, locale: ChatLocale) {
  const area = findNeighborhood(message);
  const asksForMetro = /metro|मेट्रो/i.test(message);
  const asksForThreeBedrooms = /3\s*(bhk|bed|bedroom)|तीन/i.test(message);
  const asksForQuiet = /quiet|calm|noise|शांत/i.test(message);

  if (locale === "hi") {
    const matchingHomes = properties.filter((property) => !asksForThreeBedrooms || property.beds >= 3);
    return {
      message: `मेट्रो के पास ${matchingHomes.length} उपयुक्त घर मिले। सबसे अच्छा शुरुआती विकल्प ${matchingHomes[0].title}, ${matchingHomes[0].locality} है। इसका अनुमानित ऑफिस कम्यूट ${matchingHomes[0].commute} मिनट है। उपलब्ध डेटा के आधार पर मैं पार्किंग या फ्लोर की पुष्टि नहीं कर सकता।`,
      sources: ["Verified listings", "Commute profile", "Neighborhood signals"],
    };
  }

  if (area) {
    return {
      message: `${area.name} is a ${area.demand.toLowerCase()}-demand neighborhood with average sale pricing around Rs ${area.averagePrice.toLocaleString("en-IN")} per sq ft and ${area.growth}% year-on-year growth. ${area.summary} I can compare it with another area or narrow homes by commute.`,
      sources: [`${area.name} market snapshot`, "12-month trend data"],
    };
  }

  if (asksForQuiet || asksForMetro) {
    return {
      message:
        "Indiranagar and HSR Layout are the strongest starting points in the available dataset. Indiranagar has the better metro story and an 18-minute example commute to MG Road; HSR Layout is calmer and more residential, but the commute tradeoff is a little higher. I would start with Indiranagar if transit matters most.",
      sources: ["Neighborhood signals", "Commute profile", "Verified listings"],
    };
  }

  return {
    message:
      "I can help with that, but I need one more detail to make the answer useful: share your office location, target budget, or a neighborhood you want to compare. I will keep verified facts separate from suggestions.",
    sources: ["SmartSpace guidance policy"],
  };
}

export function buildListingDraft(input: {
  title: string;
  locality: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  notes?: string;
}) {
  const homeLabel = input.bedrooms > 0 ? `${input.bedrooms}-Bedroom` : input.propertyType;
  const notes = input.notes?.toLowerCase() ?? "";
  const hasNaturalLight = notes.includes("bright") || notes.includes("natural light");
  const hasMetro = notes.includes("metro");
  const hasQuietLane = notes.includes("quiet");

  const highlights = [
    `${input.bedrooms} bedrooms and ${input.bathrooms} bathrooms`,
    `${input.area.toLocaleString("en-IN")} sq ft ${input.propertyType.toLowerCase()}`,
    hasNaturalLight ? "Generous natural light in the living area" : "Practical, easy-to-furnish layout",
    hasQuietLane ? "Quieter residential setting" : `Convenient ${input.locality} location`,
  ];

  const tags = [
    hasNaturalLight ? "Natural light" : "Practical layout",
    hasMetro ? "Metro nearby" : "Connected locality",
    hasQuietLane ? "Quiet lane" : "Everyday access",
    input.bedrooms >= 3 ? "Family fit" : "Easy upkeep",
  ];

  return {
    title: `${hasNaturalLight ? "Sunlit " : ""}${homeLabel} ${input.propertyType} in ${input.locality}`,
    description: `A ${input.area.toLocaleString("en-IN")} sq ft ${input.propertyType.toLowerCase()} in ${input.locality} with ${input.bedrooms} bedrooms and ${input.bathrooms} bathrooms. ${hasNaturalLight ? "The submitted notes describe a bright living area with natural light. " : ""}${hasQuietLane ? "The home is described as being on a quieter lane. " : ""}${hasMetro ? "Metro access is noted as being nearby. " : ""}Review the draft and confirm amenities, parking, floor, and pricing before publishing.`,
    highlights,
    tags,
    followUp: "Please confirm the floor, parking availability, and maintenance charges before publishing.",
  };
}

