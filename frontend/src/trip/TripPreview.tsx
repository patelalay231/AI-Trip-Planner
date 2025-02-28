import TripView from '@/components/custom/TripView';
import { getTrip } from '@/lib/trip-api';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

function TripPreview() {
    const { tripId } = useParams();
    const [tripDetails, setTripDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchTrip = useCallback(async () => {
        setLoading(true);
        if (tripId) {
            const data = await getTrip(tripId);
            setTripDetails(data[0]);
        }
        setTimeout(() => {
            setLoading(false);
        }
        , 2000);
    }, [tripId]);
    console.log(tripDetails)
    useEffect(() => {
        fetchTrip();
    }, [fetchTrip]);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[300px]">
                <p className="text-gray-500 text-lg">Loading trip...</p>
            </div>
        );
    }
    return (
        <TripView tripDetails={tripDetails.tripDetails} hotelOptions={tripDetails.hotelDetails} itinerary={tripDetails.itiernaryDetails} />
    )
}

export default TripPreview