import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Facilities from "../components/landing/Facilities";
import HowItWorks from "../components/landing/HowItWorks";
import Pricing from "../components/landing/Pricing";
import PlatformFeatures from "../components/landing/Features";
import Testimonials from "../components/landing/Testimonials";
import LocationCTA from "../components/landing/CTA_location";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section id="courts">
          <Facilities />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <section id="features">
          <PlatformFeatures />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <LocationCTA />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
