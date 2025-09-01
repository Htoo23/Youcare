"use client";

import * as React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-border">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <button
          className="w-full flex items-center justify-between py-4 text-left"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="font-medium">{question}</span>
          <ChevronDown className={cn('h-5 w-5 transition', open && 'rotate-180')} />
        </button>
        <Collapsible.Content className="pb-6 text-muted-foreground">
          {typeof answer === 'string' ? <p>{answer}</p> : answer}
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}
