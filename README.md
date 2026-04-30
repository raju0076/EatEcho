# Eat Echo - Voice Assistant for Restaurant Suggestions

## Introduction
Eat Echo is a voice-based assistant application that helps users find the top 5 food items from the nearest restaurants based on their location. The backend acts as a robust middleware to fetch restaurant data securely via Google APIs and supplement it with dish images from Unsplash. The project aims to provide a seamless, interactive experience for discovering popular local cuisine.

## Project Type
- **Backend**: Node.js, Express
- **Frontend**: React (Vite)

## Deployed App
- **Backend**: https://eatecho-4gmz.onrender.com (Deployed on Render)
- **Frontend**: https://eat-echo-app1.netlify.app/Home(Deployed on Netlify)

## Directory Structure
```text
EatEcho/
├── client/
│   └── Eat-Echo/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── contexts/
│       │   ├── pages/
│       │   ├── styles/
│       │   ├── App.css
│       │   ├── App.jsx
│       │   ├── index.css
│       │   └── main.jsx
│       ├── .env
│       ├── .gitignore
│       ├── eslint.config.js
│       ├── index.html
│       ├── package-lock.json
│       ├── package.json
│       ├── README.md
│       └── vite.config.js
├── server/
│   ├── .env
│   ├── .gitignore
│   ├── app.js
│   ├── package-lock.json
│   └── package.json
└── README.md
```

## Features
- 🎙 **Voice Command Recognition** – Users can speak to get suggestions.
- 📍 **Location-Based Results** – Finds nearby restaurants automatically using city name or coordinates.
- 🍽 **Top 5 Food Items** – Fetches the most popular dishes for each restaurant.
- ⭐ **User Ratings & Reviews** – Displays restaurant ratings to ensure quality recommendations.
- 🔊 **Voice Feedback** – Speaks the results back to the user.
- 🖼️ **Dynamic Image Fetching** – Integrates with Unsplash API for high-quality dish imagery.

## Design Decisions & Assumptions
- **Google Places API**: Chosen for accurate and up-to-date restaurant information based on coordinates and radius.
- **Unsplash API Integration**: Implemented to dynamically provide high-quality visual representations of popular dishes.
- **React with Vite**: Selected for a fast, optimized frontend development experience.
- **Express Backend**: Acts as a lightweight proxy to securely process external API requests without exposing API keys on the client.
- **Coordinate Geocoding**: Automatically translates city names to coordinates (latitude/longitude) if geolocation is not directly provided.

## Installation & Getting Started
Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/raju0076/EatEcho.git

# --- Backend Setup ---
# Navigate to backend directory
cd EatEcho/server

# Install dependencies
npm install

# Set up environment variables
# Create a .env file and configure the following:
# PORT=3000
# GOOGLE_API_KEY=your_google_api_key
# GOOGLE_API_URL=https://maps.googleapis.com/maps/api/place/nearbysearch/json
# GEOCODING_URL=https://maps.googleapis.com/maps/api/geocode/json
# UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# Start the backend server
npm start

# --- Frontend Setup ---
# Open a new terminal and navigate to frontend directory
cd EatEcho/client/Eat-Echo

# Install dependencies
npm install

# Create a .env file and configure the backend URL:
# VITE_API_URL=http://localhost:3000

# Start the frontend server
npm run dev
```

## Usage
### Running the Backend Server
```bash
npm start
```

### Running the Frontend Server
```bash
npm run dev
```

### Example API Usage
```bash
# Fetch top items for a specific city
GET /top-items?city=London

# Fetch top items using coordinates
GET /top-items?latitude=51.5074&longitude=-0.1278
```

## APIs Used
- **Google Places API** (Restaurant data)
- **Google Geocoding API** (City coordinates)
- **Unsplash API** (Dish images)

## API Endpoints
### Restaurants & Dishes
- **GET** `/top-items` - Fetch top 5 restaurants with their popular dishes and imagery. Accepts `city` or `latitude` & `longitude` as query parameters.

## Technology Stack

### Backend
- **Node.js** - Backend runtime environment
- **Express.js** - Web framework for handling API requests
- **Axios** - Promise-based HTTP client for making external API requests
- **Dotenv** - Environment variable management
- **Cors** - Cross-origin resource sharing

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Next-generation frontend tooling
- **Chakra UI** - Component library for accessible and customizable UI
- **React Router** - For managing routing in the application
- **Axios** - HTTP client for fetching data from the backend

---
🚀 **Eat Echo is ready for action!** Feel free to contribute or suggest improvements. 🎉
