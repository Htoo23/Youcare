"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Intersection observer hook to detect when stats become visible
function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.unobserve(el);
      }
    }, { threshold: 0.3, ...opts });
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return { ref, inView } as const;
}

// Animated counter component
function CountUp({ to, start = 0, duration = 1200, play = true, fmt }: {
  to: number;
  start?: number;
  duration?: number;
  play?: boolean;
  fmt: (n: number) => string;
}) {
  const [val, setVal] = React.useState(start);
  React.useEffect(() => {
    if (!play) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(start + (to - start) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, start, duration, play]);
  return <>{fmt(val)}</>;
}

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        <div>
          {/* Chinese translation of the hero section as in the original design */}
          <Badge className="mb-4">革新医疗保健</Badge>
          <h1 className="section-title mb-4">
            改变 <span className="text-blue-600">您的健康</span>
          </h1>
          <p className="lead mb-6">探索旨在提升您整体健康和福祉的多样化服务。</p>
          <div className="flex gap-4 mb-10">
            <Button>了解更多</Button>
            <Button variant="outline">开始使用</Button>
          </div>
          {/* Animated stats translated to Chinese */}
          <div ref={ref} className="grid grid-cols-2 gap-x-12 gap-y-8 max-w-md">
            <div className="text-center">
              <div className="text-2xl font-bold">
                <CountUp to={13} play={inView} fmt={(n) => `${Math.round(n)}+`} />
              </div>
              <div className="text-muted-foreground text-sm">多年经验</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                <CountUp to={85} play={inView} fmt={(n) => `${Math.round(n)}+`} />
              </div>
              <div className="text-muted-foreground text-sm">专业医生</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                <CountUp to={3} play={inView} fmt={(n) => `${Math.round(n)}M+`} />
              </div>
              <div className="text-muted-foreground text-sm">满意患者</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                <CountUp to={85} play={inView} fmt={(n) => `${Math.round(n)}+`} />
              </div>
              <div className="text-muted-foreground text-sm">成功治疗</div>
            </div>
          </div>
        </div>
        {/* Placeholder image area as in original design */}
        <div className="flex justify-center">
          <div className="w-80 h-64 bg-blue-50 rounded-2xl flex items-center justify-center">
            <p className="text-muted-foreground">[Image Placeholder]</p>
          </div>
        </div>
      </div>
    </section>
  );
}
