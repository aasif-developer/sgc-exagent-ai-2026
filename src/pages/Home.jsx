import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../sections/HeroSection";
import AboutWorkshop from "../sections/AboutWorkshop";
import SpeakerSection from "../sections/SpeakerSection";
import TimelineSection from "../sections/TimelineSection";
import FAQSection from "../sections/FAQSection";
import ContactSection from "../sections/ContactSection";

/**
 * Home
 * Landing page composed purely of reusable components.
 * No styling or business logic lives here — sections are
 * added here as they're built out.
 */
const Home = () => {
  const location = useLocation();

useEffect(() => {
  if (location.state?.scrollTo) {
    setTimeout(() => {
      const target = document.querySelector(location.state.scrollTo);

      if (target) {
        const navbarHeight = 80;

        window.scrollTo({
          top: target.offsetTop - navbarHeight,
          behavior: "smooth",
        });

        // Clear the state so refresh/back doesn't scroll again
        window.history.replaceState({}, document.title);
      }
    }, 100);
  }
}, [location]);
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutWorkshop />
        <SpeakerSection />
        <TimelineSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;