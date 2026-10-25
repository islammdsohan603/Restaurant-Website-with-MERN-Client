
"use client";

import { useMemo, useState } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

import MenuHeading from "./MenuHeading";
import MenuCategories from "./MenuCategories";
import MenuGrid from "./MenuGrid";

import {
  menuCategories,
  menuItems,
  type MenuCategory,
  type MenuItem,
} from "../../db/MenuData";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] =
    useState<MenuCategory>("All Dishes");

  const [order, setOrder] = useState<MenuItem[]>([]);
  const [notice, setNotice] = useState("");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All Dishes") {
      return menuItems;
    }

    return menuItems.filter(
      (item) => item.category === activeCategory
    );
  }, [activeCategory]);

  function handleAddToOrder(item: MenuItem) {
    setOrder((currentOrder) => [...currentOrder, item]);
    setNotice(`${item.name} added to your order.`);
  }

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="relative overflow-hidden border-t border-white/[0.05] bg-[#11110F] py-16 text-[#F5F0E8] sm:py-20 lg:py-24"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(184,149,90,0.075),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <MenuHeading />

        <MenuCategories
          categories={menuCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Menu information */}
        <div
          data-gsap-reveal
          className="mb-5 flex items-center justify-between gap-3"
        >
          <p
            className="text-[10px] uppercase tracking-[0.15em] text-[#918B80]"
            aria-live="polite"
          >
            {filteredItems.length} curated dishes
          </p>

          {order.length > 0 && (
            <p className="inline-flex items-center gap-1.5 text-[10px] text-[#D6B77D]">
              <FiCheckCircle size={12} />
              {order.length} {order.length === 1 ? "item" : "items"} added
            </p>
          )}
        </div>

        {/* Menu cards */}
        <MenuGrid
          items={filteredItems}
          onAddToOrder={handleAddToOrder}
        />

        {/* Order notification */}
        {notice && (
          <p
            role="status"
            className="mt-4 text-center text-xs text-[#D6B77D]"
          >
            {notice}
          </p>
        )}

        {/* Full menu CTA */}
        <div
          data-gsap-reveal
          className="mt-9 flex justify-center sm:mt-12"
        >
          <a
            href="/menu"
            data-gsap-hover="button"
            className="group inline-flex min-h-11 items-center gap-3 border border-[#B8955A]/35 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#E5C38B] transition-colors duration-300 hover:border-[#D6B77D] hover:bg-[#B8955A]/10"
          >
            View Full Seasonal Tasting Menu

            <FiArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
