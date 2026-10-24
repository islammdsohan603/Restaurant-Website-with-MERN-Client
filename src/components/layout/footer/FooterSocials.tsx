import Link from "next/link";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: FiInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: FiFacebook,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    icon: FiYoutube,
  },
];

export default function FooterSocials() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit our ${label}`}
          data-footer-link
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#B7B1A7] transition-all duration-300 hover:-translate-y-1 hover:border-[#B8955A] hover:text-[#D0B477]"
        >
          <Icon size={17} aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
