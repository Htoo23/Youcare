import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { GettingStarted } from '@/components/getting-started';
import { Process } from '@/components/process';
import { FAQ } from '@/components/faq';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      {/* New section mixing current features with the original landing design */}
      <GettingStarted />
      <Process />
      <FAQ />
      <Footer />
    </>
  );
}
