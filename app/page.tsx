import PageWrapper from "@/components/container/page-wrapper";
import HeroSection from "@/components/homepage/hero";

export default function Home() {
  return (
      <div className="flex flex-col max-w-[70rem]">
        <HeroSection />
      </div>
  );
}
