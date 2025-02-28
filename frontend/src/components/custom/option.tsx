export const SelectTravelersList = [
  {
    id: 1,
    title: 'Just Me',
    description: 'A solo traveler on an adventure',
    icon: './hiking.png', // Modern solo traveler icon
    people: '1 person'
  },
  {
    id: 2,
    title: 'A Couple',
    description: 'Two travelers exploring together',
    icon: './honeymoon.png', // Modern couple icon
    people: '2 people'
  },
  {
    id: 3,
    title: 'Family',
    description: 'A fun-filled family trip',
    icon: './family.png', // Modern family icon
    people: '3 to 5 people'
  },
  {
    id: 4,
    title: 'Friends',
    description: 'An exciting group adventure',
    icon: './friends.png', // Modern friends icon
    people: '5 to 10 people'
  }
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Economy',
    description: 'Affordable yet memorable experiences',
    icon: './dollar.png', // Modern budget-friendly icon
  },
  {
    id: 2,
    title: 'Standard',
    description: 'A perfect balance of comfort and cost',
    icon: './money.png', // Modern standard quality icon
  },
  {
    id: 3,
    title: 'Luxury',
    description: 'Indulge in premium experiences',
    icon: './money-bag.png', // Modern luxury travel icon
  }
];

export const Tripdata = {
  "tripDetails": {
    "location": "Las vegas",
    "duration": "3 Days",
    "budget": "Economy",
    "travelers": "Couple"
  },
  "hotelOptions": [
    {
      "HotelName": "Sliema Marina Hotel",
      "hotelAddress": "143 Tower Road, Sliema, Malta",
      "geoCoordinates": {
        "latitude": 35.9167,
        "longitude": 14.5014
      },
      "pricePerNight": 40,
      "hotelImageURL": "https://example.com/sliemamarinahotel.jpg",
      "rating": 7.5,
      "description": "Located in Sliema, this affordable hotel offers easy access to Valletta and other attractions. Offers rooms with sea views and a rooftop terrace.",
      "amenities": [
        "Free Wi-Fi",
        "Rooftop Terrace",
        "Air Conditioning",
        "Breakfast Available"
      ]
    },
    {
      "HotelName": "Valletta Backpacker's Inn",
      "hotelAddress": "Strait Street 65, Valletta, Malta",
      "geoCoordinates": {
        "latitude": 35.8959,
        "longitude": 14.5113
      },
      "pricePerNight": 25,
      "hotelImageURL": "https://example.com/vallettabackpackers.jpg",
      "rating": 7.0,
      "description": "Located in the heart of Valletta, this hotel is a budget-friendly option for exploring the capital city. Offers dorms and private rooms.",
      "amenities": [
        "Free Wi-Fi",
        "Communal Kitchen",
        "Common Room",
        "Tour Desk"
      ]
    },
    {
      "HotelName": "Marco Polo Party hotel",
      "hotelAddress": "Triq il-Qaliet, St Julian's, Malta",
      "geoCoordinates": {
        "latitude": 35.9226,
        "longitude": 14.4942
      },
      "pricePerNight": 30,
      "hotelImageURL": "https://example.com/marcopolo.jpg",
      "rating": 6.8,
      "description": "A lively hotel in St Julian's, known for its party atmosphere. Offers dorms and private rooms, with a bar and social events.",
      "amenities": [
        "Bar",
        "Social Events",
        "Free Wi-Fi",
        "Communal Kitchen"
      ]
    }
  ],
  "itinerary": {
    "day1": {
      "theme": "Valletta Exploration",
      "morning": {
        "placeName": "Upper Barrakka Gardens",
        "placeDetails": "Enjoy panoramic views of the Grand Harbour from these beautiful gardens. Witness the Saluting Battery firing at noon.",
        "placeImageURL": "https://example.com/upperbarrakkagardens.jpg",
        "geoCoordinates": {
          "latitude": 35.8976,
          "longitude": 14.5146
        },
        "ticketPricing": "Free",
        "rating": 4.6,
        "timeToVisit": "Morning",
        "travelTimeFromSliema": "15-minute ferry ride or 30-minute bus ride to Valletta."
      },
      "afternoon": {
        "placeName": "St. John's Co-Cathedral",
        "placeDetails": "Visit this stunning Baroque cathedral, known for its opulent interior and Caravaggio paintings.",
        "placeImageURL": "https://example.com/stjohnscocathedral.jpg",
        "geoCoordinates": {
          "latitude": 35.8965,
          "longitude": 14.5121
        },
        "ticketPricing": "€15",
        "rating": 4.7,
        "timeToVisit": "Afternoon",
        "travelTimeFromUpperBarrakkaGardens": "5-minute walk"
      },
      "evening": {
        "placeName": "Walk along Valletta Waterfront & Dinner",
        "placeDetails": "Enjoy a stroll along the Valletta Waterfront, with its colorful buildings and restaurants. Have dinner at an affordable eatery.",
        "placeImageURL": "https://example.com/vallettawaterfront.jpg",
        "geoCoordinates": {
          "latitude": 35.8943,
          "longitude": 14.5162
        },
        "ticketPricing": "Free (food costs apply)",
        "rating": 4.4,
        "timeToVisit": "Evening",
        "travelTimeFromStJohnsCoCathedral": "10-minute walk"
      }
    },
    "day2": {
      "theme": "Mdina & Rabat",
      "morning": {
        "placeName": "Mdina Old City",
        "placeDetails": "Explore the ancient walled city of Mdina, known as the 'Silent City'. Wander through its narrow streets and admire the architecture.",
        "placeImageURL": "https://example.com/mdina.jpg",
        "geoCoordinates": {
          "latitude": 35.8811,
          "longitude": 14.4022
        },
        "ticketPricing": "Free (some attractions have fees)",
        "rating": 4.8,
        "timeToVisit": "Morning",
        "travelTimeFromValletta": "30-minute bus ride to Mdina"
      },
      "afternoon": {
        "placeName": "Rabat - St. Paul's Catacombs",
        "placeDetails": "Visit the St. Paul's Catacombs in Rabat, located just outside Mdina. Explore the underground Roman burial sites.",
        "placeImageURL": "https://example.com/stpaulscatacombs.jpg",
        "geoCoordinates": {
          "latitude": 35.8804,
          "longitude": 14.3995
        },
        "ticketPricing": "€6",
        "rating": 4.3,
        "timeToVisit": "Afternoon",
        "travelTimeFromMdina": "5-minute walk"
      },
      "evening": {
        "placeName": "Dingli Cliffs",
        "placeDetails": "Watch the sunset from Dingli Cliffs, the highest point in Malta. Enjoy panoramic views of the Mediterranean Sea.",
        "placeImageURL": "https://example.com/dinglicliffs.jpg",
        "geoCoordinates": {
          "latitude": 35.8444,
          "longitude": 14.3822
        },
        "ticketPricing": "Free",
        "rating": 4.6,
        "timeToVisit": "Evening",
        "travelTimeFromRabat": "20-minute bus ride to Dingli Cliffs"
      }
    },
    "day3": {
      "theme": "Gozo Day Trip",
      "morning": {
        "placeName": "Ferry to Gozo",
        "placeDetails": "Take a ferry from Ċirkewwa (northern Malta) to Gozo, Malta's sister island.",
        "placeImageURL": "https://example.com/gozoferry.jpg",
        "geoCoordinates": {
          "latitude": 36.0167,
          "longitude": 14.3222
        },
        "ticketPricing": "€4.65 (round trip)",
        "rating": 4.5,
        "timeToVisit": "Morning",
        "travelTimeFromSliema": "45-minute bus ride to Ċirkewwa. Ferry to Gozo: 25 minutes"
      },
      "afternoon": {
        "placeName": "Victoria (Rabat) - Citadel",
        "placeDetails": "Explore the Citadel in Victoria (Rabat), Gozo's capital city. Enjoy panoramic views of the island from the fortified walls.",
        "placeImageURL": "https://example.com/gozocitadel.jpg",
        "geoCoordinates": {
          "latitude": 36.0444,
          "longitude": 14.2389
        },
        "ticketPricing": "Free (some museums have fees)",
        "rating": 4.7,
        "timeToVisit": "Afternoon",
        "travelTimeFromGozoFerryTerminal": "10-minute bus ride to Victoria"
      },
      "evening": {
        "placeName": "Azure Window (Dwejra Bay) - Now Inland Sea",
        "placeDetails": "Visit the site of the former Azure Window (collapsed in 2017). Swim in the Inland Sea and explore the surrounding area.",
        "placeImageURL": "https://example.com/inlandsea.jpg",
        "geoCoordinates": {
          "latitude": 36.0289,
          "longitude": 14.1956
        },
        "ticketPricing": "Free (boat trip through tunnel extra)",
        "rating": 4.4,
        "timeToVisit": "Evening",
        "travelTimeFromVictoria": "20-minute bus ride to Dwejra"
      }
    }
  }
};