import { philosophyStats } from "../../db/PhilosophyData";

export default function PhilosophyStats() {
  return (
    <div className="grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-5 sm:gap-6">
      {philosophyStats.map((stat) => (
        <div key={stat.value} className="min-w-0">
          <p
            className={`font-serif text-2xl leading-none sm:text-[27px] ${
              stat.value === "100%" ? "text-[#E98765]" : "text-[#D6B77D]"
            }`}
          >
            {stat.value}
          </p>

          <p className="mt-2 max-w-[240px] text-xl leading-[1.8] text-[#B8B1A6]">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
}
