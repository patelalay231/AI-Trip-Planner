import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge';
import { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/lib/fetch-place-image';

function HotelOption({ hotel }: { hotel: any }) {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [placeId, setPlaceId] = useState<string | null>(null);
    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel.HotelName ?? hotel.hotelName,
        }
        const result = await GetPlaceDetails(data);
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[0].name);
        setPhotoUrl(PhotoUrl);
        setPlaceId(result.data.places[0].id);
    }

    const handleViewDetails = () => {
        const map_url = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
        console.log(map_url);
        window
            .open(map_url, '_blank')
            ?.focus();
    }

    return (
        <>
            <Card
                key={hotel?.id}
                className="flex flex-col gap-4 p-4 rounded-lg cursor-pointer hover:border-[#f56551] border-2 transition duration-300 hover:shadow-lg w-full h-[480px]"
            >
                <div className="relative w-full h-48">
                    <img
                        src={photoUrl ?? ''}
                        className="rounded-lg w-full h-40 object-cover"
                        alt={hotel.HotelName ?? hotel.hotelName}
                    />
                    {hotel?.rating && (
                        <span className="absolute top-3 right-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                            ⭐ {hotel.rating}
                        </span>
                    )}
                </div>

                <CardContent className="flex flex-col justify-between w-full h-full px-0">
                    <h3 className="font-semibold text-xl truncate">{hotel.HotelName ?? hotel.hotelName}</h3>
                    {hotel?.description && (
                        <p className="text-md text-gray-500 italic line-clamp-2">
                            {hotel.description}
                        </p>
                    )}
                    {hotel?.HotelAddress && <p className="text-md font-medium truncate">{hotel.HotelAddress}</p>}
                    {hotel?.pricePerNight && (
                        <p className="text-md font-medium">Price per night: {hotel.pricePerNight}</p>
                    )}
                    {hotel?.amenities && hotel.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 my-2">
                            {hotel.amenities.slice(0, 4).map((amenity: string, index: number) => (
                                <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700">
                                    {amenity}
                                </Badge>
                            ))}
                        </div>
                    )}
                    <div className="mt-auto">
                        <Button className="w-full text-white hover:bg-[#f56551] transition duration-300 hover:shadow-lg" onClick={handleViewDetails}>
                            View Details
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default HotelOption
