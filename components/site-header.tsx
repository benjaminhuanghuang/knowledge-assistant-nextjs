import Link from "next/link";

import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/demo", label: "Demo" },
  { href: "/knowledge-base", label: "Knowledge Base" },
  { href: "/chat", label: "Chat" },
];

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold">
          Knowledge Assistant
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" render={<Link href="/login" />}>
            Log in
          </Button>
          <Button render={<Link href="/signup" />}>Sign up</Button>
        </div>
      </div>
    </header>
  );
}
