"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Calendar as CalendarIcon, 
  Users, 
  DollarSign 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";

export function HeroSection() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateEnd, setDateEnd] = useState<Date | undefined>(
    addDays(new Date(), 7)
  );
  const [travelers, setTravelers] = useState("2");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
    if (!destination || !date || !dateEnd) return;

    // In a real app, this would construct a query string with all parameters
    router.push(`/plan?destination=${encodeURIComponent(destination)}`);
  };

  return (
    <div className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Discover Your Perfect <span className="text-primary">Journey</span>
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          AI-powered travel planning with personalized itineraries, hotel bookings, and local experiences.
        </p>

        {/* Search form */}
        <div className="bg-background/95 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Where to?</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="City or destination"
                  className="pl-10"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Dates</label>
              <div className="grid grid-cols-2 gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "MMM dd") : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !dateEnd && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateEnd ? format(dateEnd, "MMM dd") : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateEnd}
                      onSelect={setDateEnd}
                      initialFocus
                      disabled={(date) => date < (new Date() || date < (date || new Date()))}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Travelers</label>
              <Select value={travelers} onValueChange={setTravelers}>
                <SelectTrigger className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Traveler</SelectItem>
                  <SelectItem value="2">2 Travelers</SelectItem>
                  <SelectItem value="3">3 Travelers</SelectItem>
                  <SelectItem value="4">4 Travelers</SelectItem>
                  <SelectItem value="5+">5+ Travelers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Budget</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Your budget"
                  className="pl-10"
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSearch} 
            className="w-full mt-4 py-6 text-lg"
            size="lg"
          >
            Plan Your Trip
          </Button>
        </div>
      </div>
    </div>
  );
}