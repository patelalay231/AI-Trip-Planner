"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, DollarSign, Users } from "lucide-react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/lib/fetch-place-image";
import { useEffect, useState } from "react";
import HotelOption from "@/components/custom/HotelOption";
import PlaceOption from "@/components/custom/PlaceOption";
import { removeTrip, storeTrip } from "@/lib/trip-api";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import supabase from "@/lib/supabaseClient";

function TripView({ tripDetails, hotelOptions, itinerary }: {
  tripDetails: any;
  hotelOptions: any;
  itinerary: any;
}) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<string>("day1");
  const [savingTrip, setSavingTrip] = useState<boolean>(false);
  const [savedTrip, setSavedTrip] = useState<boolean>(false);
  const [tripId, setTripId] = useState<number | null>(null);
  const [session, setSession] = useState<any>(null);
  
  useEffect(() => {
    tripDetails && GetPlacePhoto();
  }, [tripDetails]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: tripDetails.location };
    const result = await GetPlaceDetails(data);
    const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", result.data.places[0].photos[0].name);
    setPhotoUrl(PhotoUrl);
  };
  interface TripData {
    user_id: Number;
    tripDetails: Record<string, any>;
    hotelDetails: Record<string, any>;
    itiernaryDetails: Record<string, any>;
  }

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const tripData: TripData = {
    user_id: session?.user.id,
    tripDetails: tripDetails,
    hotelDetails: hotelOptions,
    itiernaryDetails: itinerary,
  };
  const handleSaveTrip = () => {
    setSavingTrip(true);
    
    setTimeout(async () => {
      const data = await storeTrip(tripData);
      if (data) {
        
        setTripId(data[0].id);
      }
      setSavedTrip(true);
      setSavingTrip(false);
      toast("Trip saved successfully");
    }, 1000);
  }

  const handleSavedTrip = () => {
    setSavedTrip(true);
    setSavingTrip(true);
    if(tripId){
      setTimeout(async() => {
        await removeTrip(tripId);
        setSavingTrip(false);
        setSavedTrip(false);
        toast("Trip removed successfully");
      }, 1000);
      
    }
    
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link to='/create-trip'>
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Create New Trip
          </Button>
        </Link>
        {
          !savedTrip ? (
            savingTrip ? (
              <Button variant="outline"
                className="border-[#f56551] text-[#f56551] hover:bg-[#f56551] hover:text-white" disabled>Saving...</Button>
            ) : (
              <Button variant="outline"
                className="border-[#f56551] text-[#f56551] hover:bg-[#f56551] hover:text-white" onClick={handleSaveTrip}>Save Trip</Button>
            )
          ) : (
            savingTrip ? (
              <Button variant="outline"
                className="border-[#f56551] text-[#f56551] hover:bg-[#f56551] hover:text-white" disabled>Removing...</Button>
            ) : (
              <Button variant="outline"
                className="border-[#f56551] text-[#f56551] hover:bg-[#f56551] hover:text-white" onClick={handleSavedTrip}>Saved</Button>
            )
          )
        }
      </div>

      <div className="relative rounded-2xl overflow-hidden mb-10 shadow-lg">
        <div className="h-[400px] w-full">
          <img
            src={photoUrl ?? "/place.jpeg"}
            className="h-full w-full object-cover"
            alt="Trip location"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{tripDetails.location}</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{tripDetails.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>{tripDetails.travelers}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              <span>{tripDetails.budget ?? "Budget Unavailable"}</span>
            </div>
          </div>
        </div>
      </div>

      {hotelOptions?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recommended Hotels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hotelOptions.map((hotel: any, index: number) => (
              <HotelOption key={index} hotel={hotel} />
            ))}
          </div>
        </div>
      )}

      {itinerary && Object.keys(itinerary).length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Itinerary</h2>

          <Tabs defaultValue="day1" value={activeDay} onValueChange={setActiveDay}>
            <TabsList className="mb-6 flex flex-wrap">
              {Object.keys(itinerary).map((dayKey, index) => (
                <TabsTrigger key={dayKey} value={dayKey} className="flex-grow">
                  Day {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.keys(itinerary).map((dayKey) => {
              const day = itinerary[dayKey];
              if (!day) return null;

              return (
                <TabsContent key={dayKey} value={dayKey} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Theme: {day.theme || "Explore the City"}</h3>
                    <Badge variant="outline" className="bg-[#f56551]/10 text-[#f56551] border-[#f56551]">
                      Day {dayKey.replace("day", "")}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.keys(day)
                      .filter((key) => key !== "theme")
                      .map((timeKey) => {
                        const activity = day[timeKey];
                        return <PlaceOption key={timeKey} timeKey={timeKey} activity={activity} />;
                      })}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default TripView;
