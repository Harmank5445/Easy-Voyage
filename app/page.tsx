import { HeroSection } from '@/components/home/hero-section';
import { FeaturedDestinations } from '@/components/home/featured-destinations';
import { HowItWorks } from '@/components/home/how-it-works';
import { TravelExperiences } from '@/components/home/travel-experiences';
import { Testimonials } from '@/components/home/testimonials';
import { CtaSection } from '@/components/home/cta-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section with search */}
      <HeroSection />
      
      {/* Featured destinations */}
      <FeaturedDestinations />
      
      {/* How it works */}
      <HowItWorks />
      
      {/* Travel experiences */}
      <TravelExperiences />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* CTA Section */}
      <CtaSection />
    </div>
  );
}