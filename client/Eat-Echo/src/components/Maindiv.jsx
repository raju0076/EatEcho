import React, { useRef } from 'react';
import "../styles/main.css";
import { X } from 'lucide-react';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useCity } from '../contexts/cityContext';


function Maindiv() {
   const {setCity}=useCity()
    const [history, setHistory] = useState([]); 
    const [isListening, setIsListening] = useState(false);
    const navigate=useNavigate()
   
  
    function startListening() {
      setIsListening(true);

      const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();
  
      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setCity(spokenText);
       
      setHistory((prevHistory) => {
        const newHistory = [spokenText, ...prevHistory]; 
        return newHistory.slice(0, 5);
      });

        
        recognition.stop();
        setTimeout(() => {
          setIsListening(false);
          navigate(`/rest`);
        },1000);
      };
  
      recognition.onerror = (error) => {
        console.error("Speech recognition error:", error);
        setIsListening(false)
      };
    }
   
    

  
  return (
    <>  
    <div className="mainDiv">
      <div className="sideDiv">
        
      </div>
      <div className="topDiv">
        <h1 >New to City? Let us guide you to the must-try restaurants!</h1>
        <p
        style={{color:"grey", marginTop:"10px", textAlign:"center"}}>Click and Say City Name</p>
      </div>
      <div className="micDiv">
        
        <button className="uploadButton" onClick={startListening}>
          
          <img
            src="https://t4.ftcdn.net/jpg/09/98/03/09/360_F_998030996_zSS8g7UKlSVqXesaiyPK8p3Jr0IGCCA0.jpg"
            alt="Upload"
            className={`uploadImage ${isListening ? "fluctuate" : ""}`}
          />
        </button>
        <h1 style={{ position: "absolute", bottom: "10%", color: "white", right: "41%", textAlign:"center" }}>
         {isListening ? "  Listening..." : "Click Me!"}
        </h1>
      </div>
    </div>

    <div className="historyDiv">
        <h3>Recent Searches:</h3>
       
          {history.map((item, index) => (
            <button key={index}><h4>{item}</h4><X /></button>
          ))}
       
      </div>

    </>
  );
}

export default Maindiv;
