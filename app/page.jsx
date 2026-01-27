"use client"
import Footer from "@/components/common/Footer";
import Loader from "@/components/common/Loader";
import Navbar from "@/components/common/Navbar";
import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import PopularServices from "@/sections/PopularServices";
import Platform from "@/sections/Platform";
// import Snowfall from "react-snowfall";




export default function HomePage() {
  return (
    <main>
      {/* <Loader/> */}
      {/* <Snowfall color="green"/> */}
      <Navbar/>
      <Hero/>
      <PopularServices/>
      <HowItWorks />
      <Platform/>
      {/* <Footer/> */}
    </main>
  );
}
