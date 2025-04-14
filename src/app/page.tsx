import HeroSection from '../components/hero/HeroSection';
import StorySection from '../components/story/StorySection';
import ShowcaseSection from '../components/showcase/ShowcaseSection';
import InteractionsSection from '../components/interactions/InteractionsSection';
import FooterSection from '../components/footer/FooterSection';
import Navbar from '@/components/navigation/Navbar';

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StorySection />
      <ShowcaseSection />
      <InteractionsSection />
      <FooterSection />
    </main>
  );
}
