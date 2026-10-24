import HomePage from "../components/home/HompePage";
import MenuSection from "../components/home/menu/MenuSection";
import PhilosophySection from "../components/home/philosophy/PhilosophySection";
import SpacesSection from "../components/home/spaces/SpacessSection";
import HomePageAnimations from "../components/home/HomePageAnimations";

export default function Home() {
  return (
    <HomePageAnimations>
      <HomePage />
      <SpacesSection />
      <MenuSection />
      <PhilosophySection />
    </HomePageAnimations>
  );
}
