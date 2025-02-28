import { GetPlaceDetails, PHOTO_REF_URL } from "@/lib/fetch-place-image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge"; // Import Badge Component

function PlaceOption({ timeKey, activity }: { timeKey: string; activity: any }) {
    const [photoUrl, setPhotoUrl] = useState<string>("/default-place.jpg");

    useEffect(() => {
        if (activity?.placeName) {
            GetPlacePhoto();
        }
    }, [activity]);

    const GetPlacePhoto = async () => { 
        try {
            const data = { textQuery: activity.placeName ?? "las vegas" };
            const result = await GetPlaceDetails(data);

            if (result?.data?.places?.length > 0 && result.data.places[0]?.photos?.length > 0) {
                const photoRef = result.data.places[0].photos[0].name;
                const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
                setPhotoUrl(photoUrl);
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
        }
    };

    const handleExplore = () => {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${activity.placeName}`;
        window.open(mapUrl, "_blank")?.focus();
    }

    return (
        <Card 
            key={timeKey} 
            className="flex flex-row items-center gap-6 p-4 rounded-2xl hover:border-[#f56551] border-2 transition duration-300 hover:shadow-lg"
        >
            {/* Left Side - Image */}
            <div className="relative min-w-[140px] h-[140px]">
                <img 
                    src={photoUrl} 
                    className="rounded-2xl h-full w-[220px] object-fill" 
                    alt={activity?.placeName ?? "Activity Image"} 
                />
                {activity?.rating != "N/A" && (
                    <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-lg">
                        ⭐ {activity.rating}
                    </div>
                )}
            </div>
                
            {/* Right Side - Details */}
            <CardContent className="flex flex-col justify-center gap-1 w-full">
                <h3 className="font-semibold text-lg">{activity?.placeName ?? "Unknown Place"}</h3>
                {activity?.placeDetails && <p className="text-md text-gray-500 italic">{activity.placeDetails}</p>}
                
                {/* Time to Visit Badge */}
                {activity?.timeToVisit && (
                    <Badge className="w-fit bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md">
                        🕒 Best Time: {activity.timeToVisit}
                    </Badge>
                )}
                
                {activity?.ticketPricing && <p className="text-sm font-medium text-gray-800">💰 Ticket: {activity.ticketPricing}</p>}
                <Button onClick={handleExplore} className="mt-1 cursor-pointer w-1/3 hover:bg-[#f56551] transition duration-300 hover:shadow-lg">Explore</Button>
            </CardContent>
        </Card>
    );
}

export default PlaceOption;
