import type { IconType } from "react-icons";
import { FiArrowUpRight, FiCalendar } from "react-icons/fi";

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
      "Starlit glasshouse overlooking Mayfair's skyline, featuring seasonal botanical mixology and coastal-inspired dining.",
    image: "/images/spaces/rooftop-solarium.jpg",
    imageAlt: "Elegant rooftop glasshouse restaurant at twilight",
    action: "View Space",
    href: "/experiences/rooftop-solarium",
    icon: FiArrowUpRight,
  },
  {
    id: "intimate",
    eyebrow: "GROUND FLOOR",
    title: "Intimate Dining",
    description:
      "Dimly-lit velvet booths, bespoke walnut tables, curated vinyl jazz records, and candlelit conversations.",
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
      "Front-row culinary theatre featuring a wood-fired hearth and an unscripted nine-course interactive tasting.",
    image: "/images/spaces/chefs-counter.jpg",
    imageAlt: "Chef preparing fine dining dishes at an open kitchen counter",
    action: "Reserve Counter",
    href: "/reservations",
    icon: FiCalendar,
  },
  {
    id: "courtyard",
    eyebrow: "THE CLOISTER",
    title: "Olive Garden Courtyard",
    description:
      "Sheltered garden pavilion, enclosed by century-old olive trees, beneath a canopy of warm lights.",
    image: "/images/spaces/olive-garden-courtyard.jpg",
    imageAlt: "Mediterranean courtyard restaurant surrounded by olive trees",
    action: "View Space",
    href: "/experiences/olive-garden",
    icon: FiArrowUpRight,
  },
];
