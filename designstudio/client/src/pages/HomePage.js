import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
//import { useAuth } from "../context/auth";
//import "./pages.css";

import { useState } from "react";
import Background from "../components/Background/Background";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero"

const HomePage = () => {
  let heroData = [
    { text1: "Transforming Spaces, Inspiring Lives.", text2:  "Your Dream Home Awaits." },
    { text1: "Elevate Your Living Experience with",   text2:  "Timeless Design and Modern Elegance" },
    { text1: "Designing Dreams, Crafting Comfort", text2: " Where Style Meets Serenity." },
    
  ]

  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(()=>{
        const intervalId = setInterval(() => {
    setHeroCount((count)=> { return count===2?0:count+1})
  }, 3000);
  return () => clearInterval(intervalId);
}, []); 
  return (
    <Layout title={"Design Studio"}>
      <Background playStatus={playStatus} heroCount={heroCount} />
      <Navbar />
      <Hero
        setPlayStatus={setPlayStatus}
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        playStatus={playStatus}
      />
    </Layout>
    
  );
};
export default HomePage;
