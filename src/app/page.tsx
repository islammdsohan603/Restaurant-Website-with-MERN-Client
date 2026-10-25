import HomePage from "../components/home/HompePage";
import MenuSection from "../components/home/menu/MenuSection";
import PhilosophySection from "../components/home/philosophy/PhilosophySection";
import SpacesSection from "../components/home/spaces/SpacessSection";
import HomePageAnimations from "../components/home/HomePageAnimations";
import ReservationSection from "../components/home/revservation/ReservationSection";

export default function Home() {
  return (
    <HomePageAnimations>
      <HomePage />
      <SpacesSection />
      <MenuSection />
      <ReservationSection />
      <PhilosophySection />
    </HomePageAnimations>
  );
}
