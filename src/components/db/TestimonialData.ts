export type Testimonial = {
  id: string | number;
  name: string;
  initials: string;
  role: string;
  review: string;
  rating?: number; // 1-5, default 5
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Lord Rupert Sterling",
    initials: "LR",
    role: "FOOD & WINE UK · VERIFIED",
    review:
      "The Italian sea bass is an absolute revelation. Subtle smoke, perfect tenderness, and the Cretan olive pairing elevated it into Michelin three-star territory.",
  },
  {
    id: 2,
    name: "Claire Vance",
    initials: "CV",
    role: "ANNIVERSARY CELEBRATION",
    review:
      "Chef Arnaud Dubois has delivered London's most atmospheric dining room. The Chef's Counter felt intimate, educational, and deeply theatrical.",
    featured: true,
  },
  {
    id: 3,
    name: "Dr. Marcus Keller",
    initials: "MK",
    role: "EPICUREAN SOCIETY MEMBER",
    review:
      "The wine curation by sommelier Matteo is immaculate. Each course's temperature, vintage, and backstory were executed without flaw.",
  },
  {
    id: 4,
    name: "Eleanor Whitmore",
    initials: "EW",
    role: "PRIVATE DINING GUEST",
    review:
      "An unforgettable evening. Every detail, from the candlelit atmosphere to the extraordinary service, felt effortlessly elegant.",
  },
  {
    id: 5,
    name: "James Harrington",
    initials: "JH",
    role: "RETURNING GUEST",
    review:
      "A remarkable restaurant with exceptional flavours. The seasonal menu makes every visit feel like an entirely new experience.",
  },
  {
    id: 6,
    name: "Sofia Marchetti",
    initials: "SM",
    role: "FOOD CRITIC",
    review:
      "Fire, season and restraint. The wood-fired courses taste of olive groves and smoke, and nothing on the plate is accidental.",
  },
];

// পরে এখানে ডাটাবেস কল বসাবেন, রিটার্ন টাইপ একই রাখলেই হবে।
export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials;
}
