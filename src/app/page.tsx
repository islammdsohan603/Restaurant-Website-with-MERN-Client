import HomePage from "../components/home/HompePage";
import MenuSection from "../components/home/menu/MenuSection";
import PhilosophySection from "../components/home/philosophy/PhilosophySection";
import SpacesSection from "../components/home/spaces/SpacessSection";

export default function Home() {
  return (
    <>
      <HomePage />
      <SpacesSection />
      <MenuSection />
      <PhilosophySection />
    </>
  );
}
