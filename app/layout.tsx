import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // Translated metadata for simplified Chinese audience
  title: 'YouCare — 改变您的健康',
  description: '使用 Next.js、Tailwind 和 shadcn/ui 构建的医疗健康首页',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Set language to Simplified Chinese
    <html lang='zh-CN'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
