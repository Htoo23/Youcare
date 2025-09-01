import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// Import global styles scoped to the app directory. Use a relative path
// starting with './' because this file lives in the same directory as
// globals.css. Using '../globals.css' would incorrectly resolve to the
// parent directory and cause a module resolution error.
import './globals.css';

// Import the floating chat assistant so it can be rendered globally. Use a
// named import because FabChat exports a named function.
import { FabChat } from '@/components/chat/FabChat';

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
      <body className={inter.className}>
        {children}
        {/* Render the chatbot globally so it appears on every page */}
        <FabChat />
      </body>
    </html>
  );
}
