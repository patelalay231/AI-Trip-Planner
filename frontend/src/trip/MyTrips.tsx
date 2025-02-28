import TripCard from '@/components/custom/TripCard';
import { Button } from '@/components/ui/button';
import supabase from '@/lib/supabaseClient';
import { getTrips } from '@/lib/trip-api';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function MyTrips() {
  const [session, setSession] = useState<any>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (session) {
      setUserId(session.user.id);
    }
  }, [session]);

  const fetchTrips = useCallback(async () => {
    if (userId) {
      setLoading(true);
      const data = await getTrips(userId);
      setTrips(data);
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold text-[#f56551]">My Trips</h1>
        <p className="text-gray-600 text-lg">Explore your planned adventures</p>
        <hr className="border-[1px] border-gray-300 w-full" />
      </div>

      {/* Loading & Empty States */}
      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-gray-500 text-lg">Loading trips...</p>
        </div>
      ) : trips.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16">
          <p className="text-gray-500 text-lg">No trips found.</p>
          <Button className="mt-4 bg-[#f56551] text-white hover:bg-[#d44a3d] transition" onClick={() => navigate('/create-trip')}>
            Plan a New Trip
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrips;
