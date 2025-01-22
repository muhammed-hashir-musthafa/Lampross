import { BenefitsAndApp } from "@/components/Landing/benefits/Benefits";
import ExploreSection from "@/components/Landing/explore/Explore";
import Hero from "@/components/Landing/hero/Hero";

export default function Home() {
  return (
    <div className="min-h-screen mx-auto ">
      <Hero />
      <ExploreSection />
      <BenefitsAndApp />
    </div>
  );
}
