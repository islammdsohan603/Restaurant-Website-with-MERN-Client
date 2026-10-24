import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

type FooterLinkColumnProps = {
  title: string;
  links: FooterLink[];
};

export default function FooterLinkColumn({
  title,
  links,
}: FooterLinkColumnProps) {
  return (
    <div>
      <h3 className="mb-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D0B477]">
        {title}
      </h3>

      <ul className="space-y-5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              data-footer-link
              className="group inline-flex items-center gap-2 text-sm text-[#C7BFB5] transition-colors duration-300 hover:text-[#D0B477]"
            >
              <span>{link.label}</span>
              <span
                aria-hidden="true"
                className="h-px w-0 bg-[#D0B477] transition-all duration-300 group-hover:w-4"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
