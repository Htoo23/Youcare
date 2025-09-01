"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold text-xl">
          YouCare
        </Link>
        <nav className="hidden md:flex gap-8">
          {/* Landing page links */}
          <Link href="/" className="text-muted-foreground hover:text-primary">
            About us
          </Link>
          <a href="#services" className="text-muted-foreground hover:text-primary">
            Services
          </a>
          <a href="#process" className="text-muted-foreground hover:text-primary">
            Process
          </a>
          <a href="#faq" className="text-muted-foreground hover:text-primary">
            FAQ
          </a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {/* New feature links */}
          <Link href="/book" className="text-muted-foreground hover:text-primary">
            Book
          </Link>
          <Link href="/bookings" className="text-muted-foreground hover:text-primary">
            Bookings
          </Link>
          <Link href="/records" className="text-muted-foreground hover:text-primary">
            Records
          </Link>
          <Button size='sm'>Sign up</Button>
        </div>
      </div>
    </header>
  );
}
