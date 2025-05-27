import { 
  ChevronLeft, 
  ChevronRight,
  Star,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "EasyVoyage transformed our family trip to Japan! The AI itinerary was perfectly tailored to keep both our teenagers and us happy. Every hotel and activity recommendation was spot on.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
  },
  {
    id: 2,
    name: "James Wilson",
    location: "London, UK",
    text: "As a solo traveler, I was amazed at how EasyVoyage helped me plan a perfect itinerary for my Southeast Asia adventure. The budget tracking feature saved me from overspending while still experiencing everything I wanted.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    location: "Barcelona, Spain",
    text: "My friends and I used EasyVoyage for our multi-city European tour. The group coordination was seamless, and the local recommendations were amazing! We discovered restaurants and hidden spots we would have never found otherwise.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4,
  },
  {
    id: 4,
    name: "David Chen",
    location: "Sydney, Australia",
    text: "I'm impressed with how EasyVoyage handled our last-minute changes when a flight was canceled. The real-time updates and alternative suggestions saved our vacation. The customer service is exceptional!",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
  },
];

export function Testimonials() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from fellow travelers who have experienced the magic of EasyVoyage's AI-powered trip planning.
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <Avatar className="h-12 w-12 border-2 border-primary/10">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex">{renderStars(testimonial.rating)}</div>
                      </div>
                      
                      <div className="relative mb-6 flex-grow">
                        <Quote className="h-6 w-6 absolute -top-2 -left-2 text-primary/20" />
                        <p className="text-muted-foreground">{testimonial.text}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}