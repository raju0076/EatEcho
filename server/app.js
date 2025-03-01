import env from "dotenv";
env.config();
import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_API_URL = process
const GEOCODING_URL =process.env.GEOCODING_URL;

app.use(express.json());

// Function to get latitude & longitude from a city name
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

// Get top restaurants based on city name OR latitude/longitude
app.get("/top-items", async (req, res) => {
    try {
        let { city, latitude, longitude } = req.query;

        // Convert city name to coordinates if provided
        if (city) {
            ({ latitude, longitude } = await getCoordinates(city));
        }

        if (!latitude || !longitude) {
            return res.status(400).json({ error: "City name or Latitude & Longitude are required" });
        }

        // Call Google Places API
        const requestUrl = `${GOOGLE_API_URL}?location=${latitude},${longitude}&radius=5000&type=restaurant&key=${GOOGLE_API_KEY}`;
        console.log("Requesting:", requestUrl);

        const response = await axios.get(requestUrl);
        console.log("API Response:", response.data);

        // Process API results
        const restaurants = response.data.results.slice(0, 5).map((restaurant) => ({
            name: restaurant.name,
            rating: restaurant.rating || "No rating",
            address: restaurant.vicinity || "No address available",
            top_item: restaurant.types.length ? restaurant.types[0] : "Popular Dish",
        }));

        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Failed to fetch restaurant data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
