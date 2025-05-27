"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar as CalendarIcon, ListTodo, Map, Sparkles, User, Users, Globe, Mountain, Utensils, TreePalm as PalmTree, Music, Building, ArrowRight, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { TravelPreference, TravelerType } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  startDate: z.date(),
  endDate: z.date(),
  travelers: z.string(),
  travelerType: z.string(),
  budget: z.number().min(100),
  preferences: z.array(z.string()).min(1, {
    message: "Select at least one preference.",
  }),
  additionalInfo: z.string().optional(),
});

const travelerTypes: { value: TravelerType; label: string; icon: React.ReactNode }[] = [
  { value: "solo", label: "Solo Traveler", icon: <User className="h-4 w-4" /> },
  { value: "couple", label: "Couple", icon: <Users className="h-4 w-4" /> },
  { value: "family", label: "Family", icon: <Users className="h-4 w-4" /> },
  { value: "friends", label: "Friends Group", icon: <Users className="h-4 w-4" /> },
  { value: "business", label: "Business Trip", icon: <Building className="h-4 w-4" /> },
];

const preferences: { value: TravelPreference; label: string; icon: React.ReactNode }[] = [
  { value: "adventure", label: "Adventure", icon: <Mountain className="h-4 w-4" /> },
  { value: "relaxation", label: "Relaxation", icon: <PalmTree className="h-4 w-4" /> },
  { value: "culture", label: "Culture", icon: <Globe className="h-4 w-4" /> },
  { value: "food", label: "Food & Dining", icon: <Utensils className="h-4 w-4" /> },
  { value: "nature", label: "Nature", icon: <Mountain className="h-4 w-4" /> },
  { value: "budget", label: "Budget-friendly", icon: <Building className="h-4 w-4" /> },
  { value: "luxury", label: "Luxury", icon: <Building className="h-4 w-4" /> },
];

export default function PlanTrip() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const initialDestination = searchParams.get('destination') || '';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: initialDestination,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      travelers: "2",
      travelerType: "couple",
      budget: 2000,
      preferences: [],
      additionalInfo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/itinerary/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      if (response.ok) {
        // Store the AI-generated itinerary in localStorage or state management
        localStorage.setItem('aiItinerary', data.itinerary);
        router.push('/plan/itinerary');
      } else {
        console.error('Failed to generate itinerary:', data.error);
        setIsGenerating(false);
        // Show error alert
        alert(data.error || "Failed to generate itinerary");
      }
    } catch (error: any) {
      console.error('Error generating itinerary:', error);
      setIsGenerating(false);
      // Show error alert
      alert(error.message || "Failed to generate itinerary");
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Plan Your Perfect Trip</h1>
          <p className="text-muted-foreground">
            Tell us about your dream vacation and our AI will create a personalized itinerary just for you.
          </p>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-primary" />
              AI Travel Planner
            </CardTitle>
            <CardDescription>
              Fill in your travel details to generate a custom itinerary with our AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Destination */}
                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="City, country or region" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Enter a city, country, or region you want to visit.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Traveler Type */}
                  <FormField
                    control={form.control}
                    name="travelerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Traveler Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select traveler type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {travelerTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center">
                                  {type.icon}
                                  <span className="ml-2">{type.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Start Date */}
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* End Date */}
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              disabled={(date) => 
                                date < new Date() || 
                                date < form.getValues("startDate")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Number of Travelers */}
                  <FormField
                    control={form.control}
                    name="travelers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Travelers</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((num) => (
                              <SelectItem key={num.toString()} value={num.toString()}>
                                {num} {num === 1 ? "Traveler" : "Travelers"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Budget */}
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget per person (USD)</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <Slider
                              min={100}
                              max={10000}
                              step={100}
                              defaultValue={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">$100</span>
                              <span className="font-medium">${field.value}</span>
                              <span className="text-sm text-muted-foreground">$10,000+</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Preferences */}
                <FormField
                  control={form.control}
                  name="preferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Travel Preferences (select at least one)</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {preferences.map((preference) => {
                            const isSelected = field.value?.includes(preference.value);
                            return (
                              <div key={preference.value}>
                                <Button
                                  type="button"
                                  variant={isSelected ? "default" : "outline"}
                                  className={cn(
                                    "w-full justify-start",
                                    isSelected && "bg-primary text-primary-foreground"
                                  )}
                                  onClick={() => {
                                    const newValues = isSelected
                                      ? field.value.filter((val) => val !== preference.value)
                                      : [...field.value, preference.value];
                                    field.onChange(newValues);
                                  }}
                                >
                                  {preference.icon}
                                  <span className="ml-2">{preference.label}</span>
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Additional Information */}
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us more about your travel preferences, places you'd like to visit, activities you enjoy, dietary requirements, etc."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The more details you provide, the better we can tailor your itinerary.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating your personalized itinerary...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Create My Itinerary
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}