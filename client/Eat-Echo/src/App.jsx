import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Home } from './pages/Home';
import { CityProvider } from './contexts/cityContext';
import Restaurants from "./pages/rest"

function App() {
 

  return (
    <> 
      <Navbar/>
      <CityProvider>
      <Routes>
        <Route path='/Home' element={<Home/>}/>
         <Route path="/rest" element={<Restaurants />} /> 
      </Routes>
     </CityProvider>
      <Footer/>
      </>
  )
}

export default App
