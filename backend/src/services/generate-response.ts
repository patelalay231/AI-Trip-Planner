require("dotenv").config();
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
model: "gemini-2.0-flash",
systemInstruction: "Generate Travel plan for location : [location] for [number of days] days for [solo/couple/friend/family] with a [type of budget] budget. Give me hotel options list with hotelName, hotel address, gro cordinates ,price details, hotel image url, rating, description, abd suggest iliternary with placename, placedatils, place image url, gro cordinates, ticket pricing, rating, time travel each of the location for 3 days with each day plan with best time to visist in json format.\n",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};
  

export const chatSession = model.startChat({
    generationConfig,
    history: [
    {
        role: "user",
        parts: [
        {text: "Generate Travel plan for location : las vegas for 3 days for couple with a cheap budget. Give me hotel options list with HotelName, hotel address, gro cordinates ,price with currency sign, hotel image url, rating, description, and suggest iliternary with placename, placedatils, place image url, gro cordinates, ticket pricing, rating, time travel each of the location for 3 days with each day plan with best time to visist in json format.\n"},
        ],
    },
    {
        role: "model",
        parts: [
        {text: "```json\n{\n  \"tripDetails\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 Days\",\n    \"budget\": \"Cheap/Budget-Friendly\",\n    \"travelers\": \"Couple\"\n  },\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"Sin City hotel\",\n      \"hotelAddress\": \"1223 Las Vegas Blvd S, Las Vegas, NV 89104, USA\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1571,\n        \"longitude\": -115.1441\n      },\n      \"pricePerNight\": \"25$\",\n      \"hotelImageURL\": \"https://example.com/sincityhotel.jpg\",\n      \"rating\": 7.5,\n      \"description\": \"A social hotel close to the Strip, offering dorms and private rooms. Good for meeting people and experiencing Vegas on a budget.\",\n        \"amenities\": [\"Free Wi-Fi\", \"Communal Kitchen\", \"Social Events\", \"Laundry Facilities\"]\n    },\n    {\n      \"hotelName\": \"hotel Cat Las Vegas\",\n      \"hotelAddress\": \"1236 Las Vegas Blvd S, Las Vegas, NV 89104, USA\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1567,\n        \"longitude\": -115.1443\n      },\n      \"pricePerNight\": \"28$\",\n      \"hotelImageURL\": \"https://example.com/hotelcat.jpg\",\n      \"rating\": 8.2,\n      \"description\": \"A clean and comfortable hotel with a relaxed atmosphere, near the Stratosphere. Offers both dorms and private rooms.\",\n       \"amenities\": [\"Free Wi-Fi\", \"Swimming Pool\", \"BBQ Area\", \"Free Parking\"]\n    },\n    {\n      \"hotelName\": \"Las Vegas hotel\",\n      \"hotelAddress\": \"1323 Las Vegas Blvd S, Las Vegas, NV 89104, USA\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.155,\n        \"longitude\": -115.143\n      },\n      \"pricePerNight\": \"22$\",\n      \"hotelImageURL\": \"https://example.com/lashotel.jpg\",\n      \"rating\": 6.9,\n      \"description\": \"Basic hotel offering budget-friendly accommodation. Close to the Arts District and downtown.\",\n       \"amenities\": [\"Free Wi-Fi\", \"Common Room\", \"Tour Desk\"]\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"theme\": \"Downtown & Fremont Street Experience\",\n      \"morning\": {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"A pedestrian mall with a light show on a giant LED canopy. Free to walk around and watch the shows.\",\n        \"placeImageURL\": \"https://example.com/fremontstreet.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1701,\n          \"longitude\": -115.1422\n        },\n        \"ticketPricing\": \"Free (for walking around and shows)\",\n        \"rating\": 8.5,\n        \"timeToVisit\": \"Morning/Early Afternoon (less crowded)\",\n        \"travelTimeFromhotel\": \"10-15 minutes by bus/ride-share from most hotels on the south end of the Strip\"\n      },\n      \"afternoon\": {\n        \"placeName\": \"Downtown Container Park\",\n        \"placeDetails\": \"An open-air shopping center made of shipping containers, with restaurants, bars, and a playground.\",\n        \"placeImageURL\": \"https://example.com/containerpark.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1683,\n          \"longitude\": -115.1404\n        },\n        \"ticketPricing\": \"Free entry (costs for food/drinks/activities)\",\n        \"rating\": 7.8,\n        \"timeToVisit\": \"Afternoon\",\n        \"travelTimeFromFremont\": \"5-minute walk\"\n      },\n      \"evening\": {\n        \"placeName\": \"Fremont Street Light Show\",\n        \"placeDetails\": \"Watch the Viva Vision light show on the Fremont Street Experience canopy.\",\n        \"placeImageURL\": \"https://example.com/fremontlightshow.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1701,\n          \"longitude\": -115.1422\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 9.0,\n        \"timeToVisit\": \"Evening (shows run frequently)\",\n        \"travelTimeFromContainerPark\": \"5-minute walk\"\n      }\n    },\n    \"day2\": {\n      \"theme\": \"The Strip & Free Attractions\",\n      \"morning\": {\n        \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n        \"placeDetails\": \"A beautiful indoor garden that changes seasonally.\",\n        \"placeImageURL\": \"https://example.com/bellagiogarden.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1127,\n          \"longitude\": -115.1743\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 9.2,\n        \"timeToVisit\": \"Morning (less crowded)\",\n        \"travelTimeFromhotel\": \"15-25 minutes by bus/ride-share from hotels on the south end of the Strip\"\n      },\n      \"afternoon\": {\n        \"placeName\": \"Walk the Strip & Window Shopping\",\n        \"placeDetails\": \"Explore the famous Las Vegas Strip, see the hotels, and enjoy the atmosphere. Window shop (or find affordable souvenirs).\",\n        \"placeImageURL\": \"https://example.com/thestrip.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1146,\n          \"longitude\": -115.1728\n        },\n        \"ticketPricing\": \"Free (unless you gamble or buy things)\",\n        \"rating\": 8.0,\n        \"timeToVisit\": \"Afternoon\",\n        \"travelTimeFromBellagio\": \"Start right outside the Bellagio!\"\n      },\n      \"evening\": {\n        \"placeName\": \"Fountains of Bellagio\",\n        \"placeDetails\": \"Watch the spectacular water show set to music.\",\n        \"placeImageURL\": \"https://example.com/bellagiofountains.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1126,\n          \"longitude\": -115.1761\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 9.5,\n        \"timeToVisit\": \"Evening (shows run frequently)\",\n        \"travelTimeFromStripWalk\": \"Continue walking south on the Strip\"\n      }\n    },\n    \"day3\": {\n      \"theme\": \"Nature & Budget Entertainment\",\n      \"morning\": {\n        \"placeName\": \"Red Rock Canyon National Conservation Area\",\n        \"placeDetails\": \"Scenic desert landscape with hiking trails and rock formations. Great for a morning hike or scenic drive.\",\n        \"placeImageURL\": \"https://example.com/redrockcanyon.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1333,\n          \"longitude\": -115.4167\n        },\n        \"ticketPricing\": \"$15 per vehicle\",\n        \"rating\": 9.0,\n        \"timeToVisit\": \"Morning (cooler temperatures)\",\n        \"travelTimeFromhotel\": \"30-45 minute drive (consider ride-share or renting a car for the day)\"\n      },\n      \"afternoon\": {\n        \"placeName\": \"Pinball Hall of Fame\",\n        \"placeDetails\": \"A collection of hundreds of pinball machines, where you can play for a small fee per game.\",\n        \"placeImageURL\": \"https://example.com/pinballhall.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.0853,\n          \"longitude\": -115.1436\n        },\n        \"ticketPricing\": \"Cost per pinball game (cheap entertainment)\",\n        \"rating\": 8.3,\n        \"timeToVisit\": \"Afternoon\",\n        \"travelTimeFromRedRockCanyon\": \"30-40 minute drive (back towards the Strip)\"\n      },\n      \"evening\": {\n        \"placeName\": \"High Roller Observation Wheel (Optional - Budget Permitting)\",\n        \"placeDetails\": \"A giant Ferris wheel offering panoramic views of Las Vegas.\",\n        \"placeImageURL\": \"https://example.com/highroller.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1162,\n          \"longitude\": -115.1692\n        },\n        \"ticketPricing\": \"$25-37 per person (can find discounts online)\",\n        \"rating\": 8.8,\n        \"timeToVisit\": \"Evening (for the best views)\",\n        \"travelTimeFromPinballHall\": \"15-20 minute drive\"\n      }\n    }\n  }\n}\n```\n\n**Important Notes and Explanations:**\n\n*   **Replace Placeholders:**  All image URLs (`hotelImageURL`, `placeImageURL`) are placeholders (`https://example.com/...`).  You **must** replace these with actual image URLs from Google Images, booking sites, or other sources.\n*   **Pricing:** Prices are estimates and can vary.  Check current prices before you go.  hotel prices are per night, but often *per person* in a dorm.\n*   **Transportation:**  This itinerary assumes you will use a combination of:\n    *   **Ride-sharing (Uber/Lyft):** Can be relatively affordable for short distances, but costs can add up.\n    *   **Public Bus (RTC):** The cheapest option, but can be slower.  Look into day passes.\n    *   **Walking:**  Essential on the Strip and in Downtown.\n    *   **Rental Car (Day 3 Optional):**  May be worthwhile *if* you really want to see Red Rock Canyon and aren't comfortable with ride-sharing there and back.  Factor in parking costs.\n*   **hotel Choice:**  The best hotel for you will depend on your priorities (social atmosphere, location, amenities). Read reviews carefully.\n*   **Flexibility:**  This is a suggested itinerary. Feel free to adjust it based on your interests and energy levels.  Las Vegas can be tiring!\n*   **Free Activities:** Emphasize free attractions like the Bellagio Conservatory, Fountains of Bellagio, walking the Strip, and the Fremont Street Experience.\n*   **Food:**  Eating on the cheap in Vegas requires planning.  Consider:\n    *   **Grocery store runs:**  Stock up on snacks and drinks.\n    *   **Happy hour deals:** Many restaurants offer discounted appetizers and drinks during happy hour.\n    *   **Fast food:**  It's readily available and cheap.\n    *   **Buffets (one splurge):**  If you really want to experience a Vegas buffet, look for lunch deals which are generally cheaper than dinner.\n*   **Booking:** Book hotels in advance, especially during peak season.  Check for deals on attractions.\n*   **Safety:** Be aware of your surroundings, especially at night. Stay hydrated, and wear comfortable shoes.\n\n**How to Use This JSON:**\n\n1.  **Copy and Paste:** Copy the entire JSON text into a text file and save it with a `.json` extension (e.g., `las_vegas_trip.json`).\n2.  **Use a JSON Viewer/Formatter:**  You can open this file in a JSON viewer (many free online options) to make it more readable.\n3.  **Parse with Code (Optional):** If you are a programmer, you can use a programming language (like Python or JavaScript) to parse this JSON data and display it in a more user-friendly way.\n\n**Next Steps:**\n\n1.  **Fill in Image URLs:**  Find appropriate images for the hotels and attractions.\n2.  **Refine hotel Choice:**  Research the hotels in more detail and book your accommodation.\n3.  **Check Prices:**  Verify the pricing for activities and transportation.\n4.  **Customize:**  Adjust the itinerary to fit your specific interests.\n5.  **Book in Advance:**  Especially for popular attractions or tours.\n\nI hope this helps you plan an amazing and affordable trip to Las Vegas!  Let me know if you have any more questions.\n"},
        ],
    },
    ],
});
