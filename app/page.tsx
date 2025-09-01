// app/page.tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { GettingStarted } from "@/components/getting-started"; // CTA cards to Book/Bookings/Records
import { Process } from "@/components/process";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <section id="services">
        <Services />
      </section>
      <GettingStarted />
      <section id="process">
        <Process />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <Footer />
    </>
  );
}
