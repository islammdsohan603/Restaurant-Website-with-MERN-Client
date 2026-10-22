import Image from "next/image";
import WinePairingCard from "./WinePairingCard";
import { winePairing } from "../../db/PhilosophyData";

export default function PhilosophyImage() {
  return (
    <div className="group relative">
      <div className="relative aspect-[1.25/1] overflow-hidden rounded-2xl border border-[#B8955A]/20 bg-[#201F1C] sm:aspect-[1.4/1] lg:aspect-[1.25/1]">
        <Image
          src="/images/chef-philosophy.png"
          alt={winePairing.imageAlt}
          fill
          priority={false}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-[#11110F]/60 via-transparent to-black/10"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent"
        />
      </div>

      <div className="relative z-10 mx-3 -mt-16 sm:mx-5 sm:-mt-[76px]">
        <WinePairingCard />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-24 w-24 rounded-full border border-[#B8955A]/15 sm:-bottom-5 sm:-right-5 sm:h-32 sm:w-32"
      />
    </div>
  );
}
