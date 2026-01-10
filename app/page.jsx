import Footer from "@/components/common/Footer";
import Loader from "@/components/common/Loader";
import Navbar from "@/components/common/Navbar";
import Hero from "@/sections/Hero";
import PopularServices from "@/sections/PopularServices";




export default function HomePage() {
  return (
    <main>
      {/* <Loader/> */}
      <Navbar/>
      <Hero/>
      <PopularServices/>
      {/* <Footer/> */}
    </main>
  );
}
