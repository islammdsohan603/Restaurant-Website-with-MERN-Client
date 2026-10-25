import type { Testimonial } from "../../db/TestimonialData";

export default function TestimonialCard({ item }: { item: Testimonial }) {
  const rating = item.rating ?? 5;

  return (
    <article
      className={`relative flex h-full min-h-[245px] flex-col rounded-xl border bg-[#20201E] p-6 transition-colors duration-300 hover:border-[#D0B477]/35 hover:bg-[#252522] sm:px-7 ${
        item.featured ? "border-[#D0B477]/25" : "border-white/[0.06]"
      }`}
    >
      {item.featured && (
        <span className="absolute -top-2.5 right-6 rounded-full bg-[#E5C17F] px-3 py-1 text-[8px] font-bold uppercase tracking-[0.06em] text-[#171510]">
          Editor&apos;s Choice
        </span>
      )}

      <div
        className="mb-4 text-[15px] tracking-[3px] text-[#E5C17F]"
        role="img"
        aria-label={`${rating} out of 5 stars`}
      >
        {"★".repeat(rating)}
        <span className="text-white/15">{"★".repeat(5 - rating)}</span>
      </div>

      <blockquote className="flex-1 font-serif text-[13.5px] italic leading-[1.75] text-[#E4DED3]">
        &ldquo;{item.review}&rdquo;
      </blockquote>

      <div className="my-5 h-px w-full bg-white/[0.07]" />

      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#383835] text-[10px] font-semibold text-[#E5C17F]">
          {item.initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-[13px] font-medium text-[#F5F0E8]">
            {item.name}
          </h3>
          <p className="mt-1 truncate text-[8.5px] font-medium uppercase tracking-[0.1em] text-[#E5C17F]">
            {item.role}
          </p>
        </div>
      </div>
    </article>
  );
}
