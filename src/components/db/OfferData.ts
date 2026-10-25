export type Offer = {
  badge: string;
  title: string;
  description: string;
  priceLabel: string;
  price: string;
  priceSuffix: string;
  ctaLabel: string;
  ctaHref: string;
};

export const offer: Offer = {
  badge: "Limited Autumn Residency",
  title: "Autumn White Truffle & Barolo Weekend",
  description:
    "A bespoke 7-course tasting menu featuring direct Alba white truffles flown in weekly, paired alongside rare 1990–2010 vintages of Giacomo Conterno Barolo.",
  priceLabel: "Tasting with pairings",
  price: "£210",
  priceSuffix: "/ Guest",
  ctaLabel: "Inquire Availability",
  ctaHref: "/reservations",
};

export async function getOffer(): Promise<Offer> {
  return offer;
}
