import { FiArrowUpRight, FiCalendar } from "react-icons/fi";
import type { IconType } from "react-icons";

export type Space = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  action: string;
  href: string;
  icon: IconType;
};

export const spaces: Space[] = [
  {
    id: "rooftop",
    eyebrow: "LEVEL 4",
    title: "Rooftop Solarium",
    description:
      "A starlit glasshouse overlooking the skyline, featuring seasonal botanical drinks and coastal-inspired dining.",
    image: "/images/spaces/rooftop-solarium.jpg",
    imageAlt: "Rooftop glasshouse restaurant at twilight",
    action: "View Space",
    href: "/experiences/rooftop-solarium",
    icon: FiArrowUpRight,
  },
  {
    id: "intimate",
    eyebrow: "GROUND FLOOR",
    title: "Intimate Dining",
    description:
      "Velvet booths, bespoke walnut tables, curated jazz records and candlelit conversations.",
    image: "/images/spaces/intimate-dining.jpg",
    imageAlt: "Intimate candlelit restaurant with green velvet seating",
    action: "View Space",
    href: "/experiences/intimate-dining",
    icon: FiArrowUpRight,
  },
  {
    id: "chefs-counter",
    eyebrow: "SIGNATURE",
    title: "The Chef's Counter",
    description:
      "Front-row culinary theatre featuring an open kitchen and an interactive tasting experience.",
    image: "/ChefImage.png",
    imageAlt: "Chef preparing a signature fine-dining dish",
    action: "Reserve Counter",
    href: "/reservations",
    icon: FiCalendar,
  },
  {
    id: "courtyard",
    eyebrow: "THE CLOISTER",
    title: "Olive Garden Courtyard",
    description:
      "A sheltered garden pavilion surrounded by olive trees beneath a canopy of warm lights.",
    image: "/images/spaces/olive-garden-courtyard.jpg",
    imageAlt: "Mediterranean courtyard restaurant surrounded by olive trees",
    action: "View Space",
    href: "/experiences/olive-garden",
    icon: FiArrowUpRight,
  },
];
