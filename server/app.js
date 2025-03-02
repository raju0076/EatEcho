import env from "dotenv";
env.config();
import express from "express";
import axios from "axios";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
const PORT = process.env.PORT
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_API_URL = process.env.GOOGLE_API_URL;
const GEOCODING_URL = process.env.GEOCODING_URL;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/profile",
  })
);

app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json(req.user);
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

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

app.get("/top-items", async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
    }
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

        const restaurants = response.data.results.slice(0, 5).map((restaurant) => {
            const photoReference = restaurant.photos ? restaurant.photos[0].photo_reference : null;
            const imageUrl = photoReference
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}`
                : null;

            return {
                name: restaurant.name,
                rating: restaurant.rating || "No rating",
                address: restaurant.vicinity || "No address available",
                top_item: restaurant.types.length ? restaurant.types[0] : "Popular Dish",
                image: imageUrl,
            };
        });

        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Failed to fetch restaurant data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
