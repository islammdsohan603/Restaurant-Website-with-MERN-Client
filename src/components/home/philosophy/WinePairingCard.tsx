import { RiFileWordLine } from "react-icons/ri";
import { winePairing } from "../../db/PhilosophyData";

export default function WinePairingCard() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#11110F]/95 p-3 shadow-2xl backdrop-blur-xl sm:gap-4 sm:p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#B8955A]/15 bg-[#B8955A]/10 text-[#D6B77D] sm:h-12 sm:w-12">
        <RiFileWordLine size={21} aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#D6B77D] sm:text-[9px]">
          {winePairing.eyebrow}
        </p>

        <p className="mt-1 font-serif text-xs italic leading-5 text-[#E8E0D3] sm:text-sm">
          {winePairing.name}
        </p>
      </div>

      <span className="shrink-0 text-[8px] font-semibold tracking-[0.08em] text-[#C7BDAA] sm:text-[9px]">
        {winePairing.price}
      </span>
    </div>
  );
}
