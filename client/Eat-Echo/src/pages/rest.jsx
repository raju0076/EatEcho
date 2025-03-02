import {React, useEffect, useState } from "react";
import { useCity } from "../contexts/cityContext"; 

function Restaurants() {
  const { city } = useCity(); 
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    fetch(`http://localhost:5000/top-items?city=${city}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      });
  }, [city]);
 console.log(city)
  return (
    <div>
      <h1>Top Restaurants in {city}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {restaurants.map((restaurant, index) => (
            <li key={index}>{restaurant.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Restaurants; 
