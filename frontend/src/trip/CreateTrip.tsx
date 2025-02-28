import { SelectBudgetOptions, SelectTravelersList } from '@/components/custom/option';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Loader2 } from 'lucide-react'; 
import Axios from 'axios';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import TripView from '@/components/custom/TripView';

function CreateTrip() {
  const [formData, setFormData] = useState({
    place: null,
    days: 3,
    budget: -1,
    travelers: -1,
    budgetData: null,
    travelersData: null,
  });

  const [errors, setErrors] = useState({
    place: '',
    days: '',
    budget: '',
    travelers: '',
  });

  const [tripData, setTripData] = useState({
    tripDetails: null,
    hotelOptions: null,
    itinerary: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    let validationErrors: any = {};

    if (!formData.place) validationErrors.place = 'Destination is required';
    if (!formData.days || formData.days < 1 || formData.days > 10)
      validationErrors.days = 'Enter a valid number of days between 1 to 10';
    if (formData.budget === -1) validationErrors.budget = 'Select a budget';
    if (formData.travelers === -1) validationErrors.travelers = 'Select travelers';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    const tripRequest = {
      ...formData,
      budgetData: SelectBudgetOptions[formData.budget],
      travelersData: SelectTravelersList[formData.travelers],
    };

    try {
      const response = await Axios.post(import.meta.env.VITE_BACKEND_URL + '/api/trip/generate-trip', tripRequest);

      const result = typeof response.data.result === "string" ? JSON.parse(response.data.result) : response.data.result;
      
      setTripData({
        tripDetails: result.tripDetails,
        hotelOptions: result.hotelOptions,
        itinerary: result.itinerary,
      });

    } catch (error) {
      console.error('Error generating trip:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <>
      {!tripData.tripDetails ? (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-20">
          <h2 className="font-bold text-3xl">Tell us your travel preferences🏕️🌴</h2>
          <p className="mt-3 text-gray-700 text-xl">
            Just provide basic information and our trip planner will generate a customized itinerary based on your preferences.
          </p>

          {/* Progress Bar */}
          

          <div className="mt-10 flex flex-col gap-10">
            {/* Destination */}
            <div>
              <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  value: formData.place,
                  onChange: (place) => handleChange('place', place ? place : ''),
                }}
              />
              {errors.place && <p className="text-red-500 text-sm mt-1">{errors.place}</p>}
            </div>

            {/* Trip Duration */}
            <div>
              <h2 className="text-xl my-3 font-medium">How many days are you planning for your trip?</h2>
              <Input
                value={formData.days}
                type="number"
                onChange={(e) => handleChange('days', Number(e.target.value))}
              />
              {errors.days && <p className="text-red-500 text-sm mt-1">{errors.days}</p>}
            </div>

            {/* Budget Selection */}
            <div>
              <h2 className="text-xl font-medium">What is your budget?</h2>
              <p>The budget is exclusively allocated for activities and dining purposes.</p>
              <div className="grid grid-cols-3 gap-5 mt-5">
                {SelectBudgetOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 border-2 cursor-pointer rounded-lg hover:shadow-md ${
                      index === formData.budget ? 'border-black shadow-lg' : ''
                    }`}
                    onClick={() => handleChange('budget', index)}
                  >
                    <img src={option.icon} alt={option.title} className="w-10 h-10" />
                    <h2 className="font-medium text-lg mt-2">{option.title}</h2>
                    <h3 className="text-sm">{option.description}</h3>
                  </div>
                ))}
              </div>
              {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
            </div>

            {/* Travelers Selection */}
            <div className="mt-5">
              <h2 className="text-xl font-medium">Who do you plan on traveling with?</h2>
              <div className="grid grid-cols-3 gap-5 mt-5">
                {SelectTravelersList.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 border-2 cursor-pointer rounded-lg hover:shadow-md ${
                      index === formData.travelers ? 'border-black shadow-lg' : ''
                    }`}
                    onClick={() => handleChange('travelers', index)}
                  >
                    <img src={option.icon} alt={option.title} className="w-10 h-10" />
                    <h2 className="font-medium text-lg mt-2">{option.title}</h2>
                    <h3 className="text-sm">{option.description}</h3>
                  </div>
                ))}
              </div>
              {errors.travelers && <p className="text-red-500 text-sm mt-1">{errors.travelers}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mb-10">
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Generating...
                  </>
                ) : (
                  'Generate Trip'
                )}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <TripView
          tripDetails={tripData.tripDetails}
          hotelOptions={tripData.hotelOptions}
          itinerary={tripData.itinerary}
        />
      )}
    </>
  );
}

export default CreateTrip;
