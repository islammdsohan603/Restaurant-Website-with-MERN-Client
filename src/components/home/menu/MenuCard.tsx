import Image from "next/image";
import { FiArrowUpRight, FiPlus, FiStar } from "react-icons/fi";
import type { MenuItem } from "../../db/MenuData";

type MenuCardProps = {
  item: MenuItem;
  onAddToOrder?: (item: MenuItem) => void;
};

export default function MenuCard({ item, onAddToOrder }: MenuCardProps) {
  return (
    <article className="menu-card group flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-[#201F1C] transition-[border-color,background-color] duration-300 hover:border-[#B8955A]/45 hover:bg-[#25231F]">
      <div className="relative aspect-[1.45/1] overflow-hidden bg-[#29251F]">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10" />

        <span className="absolute left-2.5 top-2.5 rounded-sm border border-[#D6B77D]/30 bg-[#171511]/85 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#E7CB94] backdrop-blur-sm">
          {item.badge}
        </span>

        <button
          type="button"
          aria-label={`View ${item.name}`}
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white transition-colors hover:border-[#D6B77D] hover:text-[#D6B77D]"
        >
          <FiArrowUpRight size={14} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1 text-[#E5C38B]">
            <FiStar size={10} fill="currentColor" />

            <span className="text-[10px] font-semibold">
              {item.rating.toFixed(1)}
            </span>

            <span className="truncate text-[9px] text-[#918B80]">
              ({item.reviewCount})
            </span>
          </div>

          <span className="shrink-0 font-serif text-sm text-[#E5C38B]">
            ${item.price}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[2.5rem] font-serif text-[15px] leading-5 text-[#F5F0E8] transition-colors group-hover:text-[#E5C38B]">
          {item.name}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[10px] leading-[1.7] text-[#AAA59B]">
          {item.description}
        </p>

        <button
          type="button"
          onClick={() => onAddToOrder?.(item)}
          className="mt-4 inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-md border border-white/[0.06] bg-[#292824] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#E9E3D9] transition-colors hover:border-[#B8955A]/50 hover:bg-[#B8955A] hover:text-[#171511] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6B77D]"
        >
          <FiPlus size={12} />
          Add to Order
        </button>
      </div>
    </article>
  );
}
