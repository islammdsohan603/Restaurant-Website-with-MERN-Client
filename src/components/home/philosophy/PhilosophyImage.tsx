import Image from "next/image";
import WinePairingCard from "./WinePairingCard";
import { winePairing } from "../../db/PhilosophyData";

export default function PhilosophyImage() {
  return (
    <div className="group relative w-full">
      {/* Main image */}
      <div className="relative aspect-[1.18/1] w-full overflow-hidden rounded-2xl border border-[#B8955A]/20 bg-[#201F1C] sm:aspect-[1.3/1] lg:aspect-[1.18/1] xl:aspect-[1.25/1]">
        <Image
          src="/images/chef-philosophy.png"
          alt={winePairing.imageAlt}
          fill
          sizes="(max-width: 1023px) 100vw, (max-width: 1440px) 50vw, 640px"
          className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
        />

        {/* Image overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-[#11110F]/65 via-transparent to-black/10"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/35 to-transparent"
        />

        {/* Pairing card inside the image */}
        <div className="absolute inset-x-3 bottom-3 z-10 sm:inset-x-4 sm:bottom-4 lg:inset-x-3 xl:inset-x-4">
          <WinePairingCard />
        </div>
      </div>

      {/* Decorative corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-20 w-20 rounded-full border border-[#B8955A]/15 sm:h-28 sm:w-28"
      />
    </div>
  );
}
