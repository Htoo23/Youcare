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
          {/* Landing page links (Chinese) */}
          <Link href="/" className="text-muted-foreground hover:text-primary">
            关于我们
          </Link>
          <a href="#services" className="text-muted-foreground hover:text-primary">
            服务
          </a>
          <a href="#process" className="text-muted-foreground hover:text-primary">
            流程
          </a>
          <a href="#faq" className="text-muted-foreground hover:text-primary">
            常见问题
          </a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {/* Booking and record links (Chinese) */}
          <Link href="/book" className="text-muted-foreground hover:text-primary">
            预约咨询
          </Link>
          <Link href="/bookings" className="text-muted-foreground hover:text-primary">
            预约管理
          </Link>
          <Link href="/records" className="text-muted-foreground hover:text-primary">
            健康档案
          </Link>
          <Button size='sm'>注册</Button>
        </div>
      </div>
    </header>
  );
}
