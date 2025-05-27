"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  Coffee, 
  DollarSign, 
  Edit, 
  Hotel, 
  MapPin, 
  MoreHorizontal, 
  Plus, 
  Share2, 
  Trash, 
  Utensils, 
  Download, 
  Map,
  Sparkles,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShareDialog } from "@/components/itinerary/share-dialog";
import { ExportDialog } from "@/components/itinerary/export-dialog";
import { formatCurrency, formatDate } from "@/lib/utils";
import axios from "axios";

export default function ItineraryPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [itineraryData, setItineraryData] = useState(null);
  const location = searchParams.get("location");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Check if AI-generated itinerary exists in localStorage
        const aiItinerary = localStorage.getItem('aiItinerary');
        if (aiItinerary) {
          setItineraryData({ aiItinerary });
          setLoading(false);
          return;
        }

        // Fetch hotels
        const hotelsResponse = await axios.get(`/api/hotels/search?location=${location}`);
        
        // Fetch activities
        const activitiesResponse = await axios.get(`/api/activities/search?location=${location}`);
        
        // Fetch nearby places
        const nearbyResponse = await axios.get(`/api/places/nearby?location=${location}`);

        // Combine the data
        const data = {
          name: `${location} Adventure`,
          destination: location,
          startDate: new Date(),
          endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
          budget: 2000,
          totalCost: 0,
          days: []
        };

        // Process hotels
        const hotels = hotelsResponse.data.hotels || [];
        const activities = activitiesResponse.data.features || [];
        const nearbyPlaces = nearbyResponse.data || [];

        // Create itinerary days
        const days = [];
        for (let i = 0; i < 5; i++) {
          days.push({
            day: i + 1,
            date: new Date(new Date().setDate(new Date().getDate() + i)),
            activities: activities.slice(i * 3, (i + 1) * 3).map(activity => ({
              id: activity.id,
              name: activity.properties.name,
              time: "10:00 AM - 1:00 PM",
              description: activity.properties.kinds,
              location: activity.properties.address || location,
              price: Math.floor(Math.random() * 50) + 20,
              image: `https://source.unsplash.com/800x600/?${activity.properties.kinds.split(',')[0]}`,
              type: activity.properties.kinds.split(',')[0]
            })),
            accommodation: hotels[i] ? {
              id: hotels[i].id,
              name: hotels[i].name,
              location: hotels[i].address || location,
              price: hotels[i].price || 150,
              image: hotels[i].image || "https://source.unsplash.com/800x600/?hotel",
              rating: hotels[i].rating || 4.5
            } : null
          });
        }

        data.days = days;
        
        // Calculate total cost
        data.totalCost = days.reduce((total, day) => {
          const activitiesCost = day.activities.reduce((sum, activity) => sum + activity.price, 0);
          const accommodationCost = day.accommodation ? day.accommodation.price : 0;
          return total + activitiesCost + accommodationCost;
        }, 0);

        setItineraryData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  if (loading || !itineraryData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Generating your itinerary...</span>
      </div>
    );
  }

  // Calculate totals
  const totalActivities = itineraryData.days.reduce(
    (total, day) => total + day.activities.length, 0
  );
  
  const totalActivitiesCost = itineraryData.days.reduce(
    (total, day) => total + day.activities.reduce(
      (dayTotal, activity) => dayTotal + activity.price, 0
    ), 0
  );

  const totalAccommodationCost = itineraryData.days.reduce(
    (total, day) => total + (day.accommodation ? day.accommodation.price : 0), 0
  );

  // Function to display activity type icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "food":
        return <Utensils className="h-4 w-4" />;
      case "landmark":
        return <MapPin className="h-4 w-4" />;
      case "cultural":
        return <Coffee className="h-4 w-4" />;
      default:
        return <Map className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{itineraryData.name}</h1>
          <div className="flex flex-wrap items-center text-muted-foreground">
            <div className="flex items-center mr-4">
              <MapPin className="h-4 w-4 mr-1" />
              {itineraryData.destination}
            </div>
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(itineraryData.startDate)} - {formatDate(itineraryData.endDate)}
            </div>
            <Badge variant="outline" className="ml-0 mt-2 md:mt-0 md:ml-2">
              AI Generated
            </Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <ShareDialog itineraryId="123" onShare={() => {}} />
          <ExportDialog itineraryId="123" />
          <Button variant="default" size="sm" className="h-9" onClick={() => setEditMode(!editMode)}>
            <Edit className="h-4 w-4 mr-2" />
            {editMode ? "View Mode" : "Edit Itinerary"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="itinerary">Daily Itinerary</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{itineraryData.days.length} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Activities</span>
                  <span className="font-medium">{totalActivities}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accommodations</span>
                  <span className="font-medium">{itineraryData.days.length} nights</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Cost</span>
                  <span className="font-medium">{formatCurrency(itineraryData.totalCost)}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Budget Card */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Budget</span>
                  <span className="font-medium">{formatCurrency(itineraryData.budget)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Activities</span>
                  <span className="font-medium">{formatCurrency(totalActivitiesCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accommodations</span>
                  <span className="font-medium">{formatCurrency(totalAccommodationCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className={`font-medium ${itineraryData.budget - itineraryData.totalCost > 0 ? "text-green-600" : "text-red-600"}`}>
                    {formatCurrency(itineraryData.budget - itineraryData.totalCost)}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            {/* Accommodation Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stay</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {itineraryData.days[0].accommodation && (
                  <div className="space-y-3">
                    <div 
                      className="h-32 rounded-md bg-cover bg-center"
                      style={{ backgroundImage: `url(${itineraryData.days[0].accommodation.image})` }}
                    />
                    <h3 className="font-semibold">{itineraryData.days[0].accommodation.name}</h3>
                    <div className="flex items-start text-sm">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                      <span className="text-muted-foreground">{itineraryData.days[0].accommodation.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{itineraryData.days.length} nights</span>
                      <span className="font-medium">{formatCurrency(itineraryData.days[0].accommodation.price)} / night</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="#">View Hotel Details</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Highlights Section */}
          <Card>
            <CardHeader>
              <CardTitle>Trip Highlights</CardTitle>
              <CardDescription>
                Key experiences during your stay in {itineraryData.destination}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {itineraryData.days.slice(0, 2).flatMap(day => 
                  day.activities.slice(0, 2).map(activity => (
                    <div key={activity.id} className="border rounded-lg overflow-hidden">
                      <div 
                        className="h-40 bg-cover bg-center"
                        style={{ backgroundImage: `url(${activity.image})` }}
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            Day {day.day}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                        <h3 className="font-medium mb-1">{activity.name}</h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{activity.location}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Itinerary Tab */}
        <TabsContent value="itinerary" className="space-y-8">
          {itineraryData.days.map((day) => (
            <div key={day.day} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Day {day.day}: {formatDate(day.date)}</h2>
                {editMode && (
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Activity
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                {day.activities.map((activity, index) => (
                  <Card key={activity.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div 
                        className="h-48 md:h-auto md:w-1/3 lg:w-1/4 bg-cover bg-center"
                        style={{ backgroundImage: `url(${activity.image})` }}
                      />
                      <div className="flex-grow p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <Badge className="mb-2">
                              <Clock className="h-3 w-3 mr-1" />
                              {activity.time}
                            </Badge>
                            <h3 className="text-xl font-semibold">{activity.name}</h3>
                          </div>
                          {editMode && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Activity
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Clock className="h-4 w-4 mr-2" />
                                  Change Time
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="h-4 w-4 mr-2" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground mb-4">
                          {activity.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center justify-between">
                          <div className="flex items-center mr-4 mb-2 md:mb-0">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{activity.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {getActivityIcon(activity.type)}
                              <span className="ml-1 capitalize">{activity.type}</span>
                            </Badge>
                            <span className="font-medium">
                              {formatCurrency(activity.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {/* Accommodation for the day */}
                {day.accommodation && (
                  <Card>
                    <div className="flex flex-col md:flex-row">
                      <div 
                        className="h-48 md:h-auto md:w-1/3 lg:w-1/4 bg-cover bg-center"
                        style={{ backgroundImage: `url(${day.accommodation.image})` }}
                      />
                      <div className="flex-grow p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              <Hotel className="h-3 w-3 mr-1" />
                              Accommodation
                            </Badge>
                            <h3 className="text-xl font-semibold">{day.accommodation.name}</h3>
                          </div>
                          {editMode && (
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Change Hotel
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-between">
                          <div className="flex items-center mr-4 mb-2 md:mb-0">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{day.accommodation.location}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium">
                              {formatCurrency(day.accommodation.price)} / night
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
              
              {/* Separator between days */}
              {day.day < itineraryData.days.length && <Separator />}
            </div>
          ))}
        </TabsContent>
        
        {/* Map View Tab */}
        <TabsContent value="map" className="min-h-[500px]">
          <Card className="border-none">
            <CardContent className="p-0">
              <div className="bg-muted/50 rounded-lg flex flex-col items-center justify-center min-h-[500px]">
                <Map className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Interactive Map Coming Soon</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  We're working on an interactive map to show all your activities and accommodations in {itineraryData.destination}.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Budget Tab */}
        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Summary</CardTitle>
              <CardDescription>
                Track your expenses and budget for your trip to {itineraryData.destination}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Budget</h3>
                  <p className="text-3xl font-bold">{formatCurrency(itineraryData.budget)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Spent</h3>
                  <p className="text-3xl font-bold">{formatCurrency(itineraryData.totalCost)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Remaining</h3>
                  <p className={`text-3xl font-bold ${itineraryData.budget - itineraryData.totalCost > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {formatCurrency(itineraryData.budget - itineraryData.totalCost)}
                  </p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Expenses Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Hotel className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>Accommodations ({itineraryData.days.length} nights)</span>
                      </div>
                      <span className="font-medium">{formatCurrency(totalAccommodationCost)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>Activities & Attractions ({totalActivities})</span>
                      </div>
                      <span className="font-medium">{formatCurrency(totalActivitiesCost)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Utensils className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>Food & Dining</span>
                      </div>
                      <span className="font-medium">{formatCurrency(itineraryData.days.reduce(
                        (total, day) => total + day.activities.reduce(
                          (dayTotal, activity) => dayTotal + (activity.type === "food" ? activity.price : 0), 0
                        ), 0
                      ))}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Daily Expenses</h3>
                  <div className="space-y-3">
                    {itineraryData.days.map((day) => {
                      const dayTotal = day.activities.reduce(
                        (total, activity) => total + activity.price, 0
                      ) + (day.accommodation ? day.accommodation.price : 0);
                      
                      return (
                        <div key={day.day} className="flex justify-between items-center">
                          <span>Day {day.day}: {formatDate(day.date)}</span>
                          <span className="font-medium">{formatCurrency(dayTotal)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Personalize Your Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Button className="mb-4">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Adjust Budget
                </Button>
                <p className="text-muted-foreground max-w-md mx-auto text-sm">
                  Optimize your itinerary based on your budget preferences. Our AI can recommend alternatives to stay within your budget.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}