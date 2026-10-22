import type { MenuCategory } from "../../db/MenuData";

type MenuCategoriesProps = {
  categories: MenuCategory[];
  activeCategory: MenuCategory;
  onCategoryChange: (category: MenuCategory) => void;
};

export default function MenuCategories({
  categories,
  activeCategory,
  onCategoryChange,
}: MenuCategoriesProps) {
  return (
    <div
      aria-label="Filter menu by category"
      className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:mb-9 sm:flex-wrap sm:justify-center sm:overflow-visible"
    >
      {categories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onCategoryChange(category)}
            className={`shrink-0 cursor-pointer rounded-full border px-3.5 py-2 text-xm font-semibold uppercase tracking-[0.1em] transition-colors duration-300 sm:px-4 ${
              isActive
                ? "border-[#E66A3C] bg-[#E66A3C] text-[#171511]"
                : "border-white/[0.09] bg-[#242320] text-[#C4BFB5] hover:border-[#B8955A]/60 hover:text-[#E5C38B]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
