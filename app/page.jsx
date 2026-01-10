import Footer from "@/components/common/Footer";
import Loader from "@/components/common/Loader";
import Navbar from "@/components/common/Navbar";
import Hero from "@/sections/Hero";




export default function HomePage() {
  return (
    <main>
      {/* <Loader/> */}
      <Navbar/>
      <Hero/>
      {/* <Footer/> */}
    </main>
  );
}
