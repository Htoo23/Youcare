"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * A section highlighting the new functionality in the current design.
 * This mixes the original landing page design with the booking and records features.
 */
export function GettingStarted() {
  const items = [
    {
      title: '预约咨询',
      description: '轻松预约医生，选择适合您的时间和医生。',
      href: '/book',
      cta: '立即预约',
    },
    {
      title: '管理您的预约',
      description: '查看、确认或取消您的预约。',
      href: '/bookings',
      cta: '查看预约',
    },
    {
      title: '健康档案',
      description: '查看您的个人档案，包括过往预约和医疗记录。',
      href: '/records',
      cta: '查看档案',
    },
  ];
  return (
    <section className='py-12 md:py-24' id='get-started'>
      <div className='container text-center mb-10'>
        <h2 className='section-title'>开始您的健康之旅</h2>
        <p className='lead mt-2 max-w-2xl mx-auto'>
          除了专业的健康服务，我们还提供便捷的在线预约、预约管理和个人档案查看功能。
        </p>
      </div>
      <div className='container grid md:grid-cols-3 gap-6'>
        {items.map((item) => (
          <Card key={item.title} className='shadow-soft'>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className='mb-4'>{item.description}</CardDescription>
              <Link href={item.href}>
                <Button>{item.cta}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}