import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/lib/fetch-place-image';
import { useNavigate } from 'react-router-dom';
import { Trash } from 'lucide-react';
import { removeTrip } from '@/lib/trip-api';
import { toast } from 'sonner';

function TripCard(trip: any) {
  const tripDetails = trip.trip.tripDetails;
  const [photoUrl, setPhotoUrl] = useState<string>("/default-place.jpg");
  const navigate = useNavigate();
  useEffect(() => {
    if (tripDetails?.location) {
      GetPlacePhoto();
    }
  }, [tripDetails]);

  const handleRemove = async () => {
    console.log("Removing trip:", trip.trip.id);
    try {
      const { data, error } = await removeTrip(trip.trip.id);
      if (error) {
        throw error;
      }
      if (data) {
        toast.success("Trip removed successfully");
        navigate("/my-trips");
      }
    } catch (error) {
      console.error("Error removing trip:", error);
      toast.error("Error removing trip");
    }
  }

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: tripDetails.location ?? "las vegas" };
      const result = await GetPlaceDetails(data);

      if (result?.data?.places?.length > 0) {
        const place = result.data.places[0];

        if (place.photos?.length > 0) {
          const photoRef = place.photos[0].name;
          if (photoRef) {
            const newPhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
            setPhotoUrl(newPhotoUrl);
            return;
          }
        }
      }

      console.warn("No photos found for:", tripDetails.location);
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };
  return (
    <div className="relative w-auto lg:h-[380px] xl:h-[400px] h-[300px]">
      <Card className="relative w-full h-full rounded-lg overflow-hidden hover:border-[#f56551] cursor-pointer border-2 transition duration-300 hover:shadow-lg">
        {/* Full-size image */}
        <img
          src={photoUrl}
          alt="loading..."
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setPhotoUrl("/default-place.jpg")} // Fallback to default image
        />

        <Button
          onClick={handleRemove}
          className="absolute top-2 right-2 bg-transparent p-1 rounded-full z-11 hover:bg-transparent transition hover:scale-150 duration-300 border-none shadow-none"
        >
          <Trash className="text-white " size={24} />
        </Button>


        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

        {/* Content on top of the image */}
        <CardContent className="absolute bottom-0 w-full p-4 text-white">
          <h3 className="font-semibold text-2xl truncate">{tripDetails.location}</h3>
          <p className="text-md text-gray-300">Duration: {tripDetails.duration}</p>
          <p className="text-md text-gray-300">Budget: {tripDetails?.budget}</p>
          <p className="text-md text-gray-300">Travelers: {tripDetails?.travelers}</p>
          <p className="text-sm text-gray-400">
            Created: {new Date(trip.trip.created_at).toLocaleDateString()}
          </p>

          <div className="mt-3">
            <Button
              className="w-full hover:text-white bg-transparent hover:bg-[#f56551] transition duration-300 border-[#f56551]"
              variant={'outline'}
              onClick={() => navigate(`/trip/${trip.trip.id}`)}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TripCard;
