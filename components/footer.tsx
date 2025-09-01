"use client";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className='bg-[#0b1220] text-white py-12 mt-12'>
      <div className='container grid md:grid-cols-4 gap-8'>
        <div>
          <h3 className='text-xl font-bold mb-4'>YouCare</h3>
          <p className='text-muted-foreground'>一步一步改变医疗健康。</p>
        </div>
        <div>
          <h4 className='font-semibold mb-4'>关于我们</h4>
          <ul className='space-y-2 text-muted-foreground'>
            <li><Link href='#services'>服务</Link></li>
            <li><Link href='#process'>流程</Link></li>
            <li><Link href='#faq'>常见问题</Link></li>
          </ul>
        </div>
        <div>
          <h4 className='font-semibold mb-4'>合作伙伴</h4>
          <ul className='space-y-2 text-muted-foreground'>
            <li>研究</li>
            <li>医院</li>
            <li>诊所</li>
          </ul>
        </div>
        <div>
          <h4 className='font-semibold mb-4'>保持联系</h4>
          <p className='text-muted-foreground mb-2'>订阅我们的新闻通讯以获取更新</p>
          <div className='flex gap-2'>
            <Input placeholder='输入您的电子邮箱' />
            <Button>订阅</Button>
          </div>
        </div>
      </div>
      <div className='container mt-8 text-center border-t border-border pt-6'>
        <p className='text-sm text-muted-foreground'>&copy; 2025 YouCare。保留所有权利。</p>
      </div>
    </footer>
  );
}
