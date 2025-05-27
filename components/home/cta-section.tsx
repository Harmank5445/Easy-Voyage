import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plane, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-purple-500/80 mix-blend-multiply" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <Sparkles className="h-5 w-5 text-white mr-2" />
            <span className="text-white text-sm font-medium">Powered by AI</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Your Dream Vacation is Just a Few Clicks Away
          </h2>
          
          <p className="text-white/90 text-xl mb-8">
            Let our AI-powered platform create the perfect itinerary tailored to your preferences, budget, and travel style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link href="/plan" className="px-8">
                <Plane className="mr-2 h-5 w-5" /> Plan Your Trip
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/20">
              <Link href="/destinations" className="px-8">
                Explore Destinations
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}