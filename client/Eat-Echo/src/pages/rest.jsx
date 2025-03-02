import axios from "axios";
import { useEffect, useState } from "react";
import { useCity } from "../contexts/cityContext"; 
import { Star } from 'lucide-react';
import "../styles/rest.css"

function Restaurants() {
  const { city } = useCity(); 
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    axios.get(`http://localhost:5000/top-items?city=${city}`)
    .then((response) => {
      console.log(response.data);
      setRestaurants(response.data);  
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching restaurants:", error);
      setLoading(false);
    });
  }, [city]);
 console.log(city)
  

  return (
    <div className="maindiv">
      <h1>Top 5 food items in near Restauarants {city}</h1>
      {loading ? (
        <p style={{fontSize:"20px"}}>Loading...</p>
      ) : (
        <ul>
          {restaurants.map((item, index) => (
            <div className="restCard" key={index}>
              
              <div>
              <h1>{item.name}</h1>
              <h3><strong>Rating:-</strong> {item.rating}<Star style={{color:"gold", width:"15px", height:"15px" ,fontWeight:"bold",marginTop:"2px"}} /></h3>
              <h3><strong>Address:</strong> <span>{item.address}</span></h3>
            </div>
              
              <div className="foodCard">
                {item.top_items.map((ele,index)=>(
                   <div className="foodimgdiv" >
                       <img src={ele.image} alt={ele.name}/><br />
                       <button>{ele.name}</button>
                   </div>
                ))}
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Restaurants;
