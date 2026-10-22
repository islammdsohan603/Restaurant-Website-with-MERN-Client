export type MenuCategory =
  | "All Dishes"
  | "Chef's Signatures"
  | "Italian Classics"
  | "Mediterranean"
  | "Artisanal Desserts"
  | "Sommelier's Cellar";

export type MenuItem = {
  id: string;
  name: string;
  category: Exclude<MenuCategory, "All Dishes">;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  imageAlt: string;
  badge: string;
  featured?: boolean;
};

export const menuCategories: MenuCategory[] = [
  "All Dishes",
  "Chef's Signatures",
  "Italian Classics",
  "Mediterranean",
  "Artisanal Desserts",
  "Sommelier's Cellar",
];

export const menuItems: MenuItem[] = [
  {
    id: "pan-seared-scallop",
    name: "Pan-Seared Scallop & Herb Risotto",
    category: "Chef's Signatures",
    description: "Saffron risotto, seasonal herbs, citrus beurre blanc.",
    price: 44,
    rating: 4.9,
    reviewCount: 84,
    image: "/images/menu/scallop-risotto.jpg",
    imageAlt: "Pan-seared scallops served with saffron risotto",
    badge: "CHEF'S PICK",
    featured: true,
  },
  {
    id: "black-winter-truffle",
    name: "Black Winter Truffle Risotto",
    category: "Italian Classics",
    description: "Aged Parmesan, arborio rice, shaved winter truffle.",
    price: 35,
    rating: 5.0,
    reviewCount: 24,
    image: "/images/menu/truffle-risotto.jpg",
    imageAlt: "Creamy risotto with freshly shaved black truffle",
    badge: "SIGNATURE",
    featured: true,
  },
  {
    id: "dry-aged-ribeye",
    name: "Dry-Aged Wagyu Striploin",
    category: "Chef's Signatures",
    description: "Wood-fired Wagyu, smoked shallot jus, seasonal greens.",
    price: 68,
    rating: 4.9,
    reviewCount: 31,
    image: "/images/menu/wagyu-striploin.jpg",
    imageAlt: "Sliced grilled Wagyu steak on a dark ceramic plate",
    badge: "30-DAY AGED",
    featured: true,
  },
  {
    id: "heirloom-burrata",
    name: "Heirloom Tomato & Burrata",
    category: "Mediterranean",
    description: "Garden tomatoes, creamy burrata, basil oil and sourdough.",
    price: 28,
    rating: 4.8,
    reviewCount: 91,
    image: "/images/menu/heirloom-burrata.jpg",
    imageAlt: "Fresh heirloom tomatoes with burrata and basil",
    badge: "SEASONAL",
  },
  {
    id: "lemon-tart",
    name: "Burnt Lemon Meringue Tart",
    category: "Artisanal Desserts",
    description: "Silky lemon curd, toasted meringue, buttery pastry.",
    price: 16,
    rating: 4.9,
    reviewCount: 46,
    image: "/images/menu/lemon-tart.jpg",
    imageAlt: "Elegant lemon tart topped with toasted meringue",
    badge: "PATISSERIE",
  },
  {
    id: "mediterranean-seabass",
    name: "Mediterranean Sea Bass",
    category: "Mediterranean",
    description: "Pan-roasted sea bass, fennel, olives and lemon dressing.",
    price: 39,
    rating: 4.8,
    reviewCount: 37,
    image: "/images/menu/sea-bass.jpg",
    imageAlt: "Pan-roasted sea bass with Mediterranean vegetables",
    badge: "SEASONAL",
  },
];
