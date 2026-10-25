import MenuSection from "../components/home/menu/MenuSection";
import PhilosophySection from "../components/home/philosophy/PhilosophySection";

import HomePageAnimations from "../components/home/HomePageAnimations";
import ReservationSection from "../components/home/revservation/ReservationSection";
import TestimonialsSection from "../components/home/testimonials/TestimonialsSection";

import { getTestimonials } from "@/src/components/db/TestimonialData";
import { getOffer } from "@/src/components/db/OfferData";
import OfferBanner from "../components/home/offer/OfferBanner";
import HomePage from "../components/home/HompePage";
import MenuSection from "../components/home/menu/MenuSection";
import PhilosophySection from "../components/home/philosophy/PhilosophySection";
import SpacesSection from "../components/home/spaces/SpacessSection";

export default async function Home() {
  const testimonials = await getTestimonials();
  const offer = await getOffer();

  return (
    <HomePageAnimations>
      <HomePage />
      <SpacesSection />
      <MenuSection />
  development
      <ReservationSection />
      <TestimonialsSection testimonials={testimonials} />
      <OfferBanner offer={offer} />
      <PhilosophySection />
    </HomePageAnimations>
 
      <PhilosophySection />
    </>
  main
  );
}
