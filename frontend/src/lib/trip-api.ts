import supabase from "./supabaseClient";

interface TripData {
    user_id: Number;
    tripDetails: Record<string, any>;
    hotelDetails: Record<string, any>;
    itiernaryDetails: Record<string, any>;
}

export const storeTrip = async (tripData: TripData): Promise<any> => {
    const { data, error } = await supabase.from("trips").insert(tripData).select();

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const removeTrip = async (tripId: number) : Promise<any> => {
    const { data, error } = await supabase.from("trips").delete().eq("id", tripId).select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export const getTrips = async (userId: number): Promise<any> => {
    const { data, error } = await supabase.from("trips").select().eq("user_id", userId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export const getTrip = async (tripId: string): Promise<any> => {
    const { data, error } = await supabase.from("trips").select().eq("id", tripId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}