import Link from "next/link";
import type { ReactNode } from "react";

type GsapButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
};

export default function GsapButton({
  href,
  variant = "primary",
  children,
}: GsapButtonProps) {
  const baseClasses =
    "group inline-flex min-h-12 items-center justify-center gap-2.5 border px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D0B477]";

  const variantClasses =
    variant === "primary"
      ? "border-[#B8955A] bg-[#B8955A] text-[#11110F] hover:border-[#D0B477] hover:bg-[#D0B477]"
      : "border-white/20 bg-white/[0.03] text-[#F5F0E8] hover:border-[#B8955A] hover:bg-white/[0.08]";

  return (
    <Link
      href={href}
      data-gsap-hover="button"
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
    </Link>
  );
}
