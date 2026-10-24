export default function MenuHeading() {
  return (
    <div
      data-gsap-reveal
      className="mx-auto mb-8 max-w-2xl text-center sm:mb-10"
    >
      <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D6B77D] sm:text-[10px]">
        The Epicurean Journey
      </p>

      <h2
        id="menu-heading"
        className="font-serif text-3xl tracking-[-0.04em] text-[#F5F0E8] sm:text-4xl"
      >
        Find Your Flavor
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-[#AAA59B] sm:text-sm">
        An evolving dialogue between fire, season and simplicity. Discover the
        ingredients, precision and craftsmanship behind each plate.
      </p>
    </div>
  );
}
