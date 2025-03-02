import env from "dotenv";
env.config();
import express from "express";
import axios from "axios";
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_API_URL = process.env.GOOGLE_API_URL;
const GEOCODING_URL = process.env.GEOCODING_URL;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

app.use(express.json());

app.use(cors())

// List of dish names
const dishNames = [
    "Spaghetti Carbonara", "Sushi Platter", "Grilled Steak", "Chicken Biryani", "Vegan Salad",
    "BBQ Ribs", "Pad Thai", "Margherita Pizza", "Tacos Al Pastor", "Lobster Bisque",
    "Pho Noodle Soup", "Dim Sum", "Falafel Wrap", "Peking Duck", "Chili Crab",
    "Ramen Bowl", "Fish and Chips", "Greek Gyro", "Butter Chicken", "Tandoori Paneer"
];

// Function to fetch images for dishes from Unsplash API
const fetchDishImages = async (dishName) => {
  try {
      console.log(`Fetching image for: ${dishName}`);  // Debugging log

      const response = await axios.get("https://api.unsplash.com/search/photos", {
          params: { query: dishName, client_id: UNSPLASH_ACCESS_KEY, per_page: 1 }
      });

      if (response.data.results.length === 0) {
          console.log(`No image found for: ${dishName}`);
          return "https://via.placeholder.com/400"; // Default placeholder
      }

      const imageUrl = response.data.results[0].urls.regular;
      console.log(`Image found: ${imageUrl}`);
      return imageUrl;
  } catch (error) {
      console.error(`Error fetching image for ${dishName}:`, error.message);
      return "https://via.placeholder.com/400"; // Fallback image
  }
};


// Function to get 5 unique random dishes with images
const getRandomDishesWithImages = async () => {
    const shuffled = [...dishNames].sort(() => 0.5 - Math.random()); // Shuffle dish names
    const selectedDishes = shuffled.slice(0, 5); // Pick first 5

    // Fetch images for the selected dishes
    const dishPromises = selectedDishes.map(async (dish) => {
        const imageUrl = await fetchDishImages(dish);
        return { name: dish, image: imageUrl || "https://via.placeholder.com/400" }; // Fallback image
    });

    return Promise.all(dishPromises);
};

// Function to get city coordinates
const getCoordinates = async (city) => {
    try {
        const response = await axios.get(GEOCODING_URL, {
            params: { address: city, key: GOOGLE_API_KEY },
        });

        if (response.data.status !== "OK") throw new Error("City not found");

        const { lat, lng } = response.data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        throw new Error("Failed to get city coordinates");
    }
};

// Route to get top restaurants with dishes
app.get("/top-items", async (req, res) => {
    try {
        let { city, latitude, longitude } = req.query;

        if (city) {
            ({ latitude, longitude } = await getCoordinates(city));
        }

        if (!latitude || !longitude) {
            return res.status(400).json({ error: "City name or Latitude & Longitude are required" });
        }

        const requestUrl = `${GOOGLE_API_URL}?location=${latitude},${longitude}&radius=5000&type=restaurant&key=${GOOGLE_API_KEY}`;
        console.log("Requesting:", requestUrl);

        const response = await axios.get(requestUrl);
        console.log("API Response:", response.data);

        const restaurants = response.data.results.slice(0, 5); // Take top 5 restaurants

        // Format the restaurant data
        const formattedRestaurants = await Promise.all(
            restaurants.map(async (restaurant) => {
                const photoReference = restaurant.photos ? restaurant.photos[0].photo_reference : null;
                const imageUrl = photoReference
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`
                    : "No image available";

                // Get 5 random dishes with images
                const dishes = await getRandomDishesWithImages();

                return {
                    name: restaurant.name,
                    rating: restaurant.rating || "No rating",
                    address: restaurant.vicinity || "No address available",
                    top_items: dishes, // Includes dish name + image
                    image: imageUrl,
                };
            })
        );

        console.log("Top items:", formattedRestaurants.map(r => r.top_items));
        res.json(formattedRestaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Failed to fetch restaurant data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
