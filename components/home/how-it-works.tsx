import React from "react";
import { 
  MapPin, 
  Hotel, 
  Calendar, 
  DollarSign, 
  Map, 
  Plane,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Choose Your Destination",
    description: "Select from hundreds of popular destinations or discover hidden gems off the beaten path.",
    icon: <MapPin className="h-8 w-8" />,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    id: 2,
    title: "Personalize Your Stay",
    description: "Find the perfect accommodations tailored to your preferences and budget.",
    icon: <Hotel className="h-8 w-8" />,
    color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  },
  {
    id: 3,
    title: "Add Activities & Experiences",
    description: "Explore local attractions, tours, and unique experiences to enhance your journey.",
    icon: <Calendar className="h-8 w-8" />,
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
  {
    id: 4,
    title: "Set Your Budget",
    description: "Control your spending with our smart budgeting tools that help maximize your experience.",
    icon: <DollarSign className="h-8 w-8" />,
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    id: 5,
    title: "Generate AI Itinerary",
    description: "Let our AI create the perfect day-by-day itinerary based on your preferences.",
    icon: <Map className="h-8 w-8" />,
    color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  },
  {
    id: 6,
    title: "Book and Go!",
    description: "Secure your entire trip in one place and receive all details in your personal dashboard.",
    icon: <Plane className="h-8 w-8" />,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How EasyVoyage Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Planning your perfect trip is simple with our AI-powered platform. Follow these easy steps to create your dream vacation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${step.color}`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}