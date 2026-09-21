import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | Saffron & Sage",
  description: "Sign in or create your Saffron & Sage dining account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {children}
    </div>
  );
}
