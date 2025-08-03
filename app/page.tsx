import Hero from "@/components/Landing Page/Hero";
import Navbar from "@/components/Landing Page/Navbar";

export default function Home() {
  return (
    <section className="h-screen w-full flex flex-col">
      <Navbar />
      <Hero />
    </section>
  );
}
