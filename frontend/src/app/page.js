import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import CareerPaths from "@/components/CareerPaths";
import PopularCertificationsLogos from "@/components/PopularCertificationsLogos";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import CorporateBanner from "@/components/CorporateBanner";
import UpcomingLiveClasses from "@/components/UpcomingLiveClasses";
import PreFooter from "@/components/PreFooter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        {/* Section 1: Hero */}
        <Hero />
        
        {/* Stats Strip under Hero */}
        <TrustBadges />

        {/* Section 2: Choose Your Career Path */}
        <CareerPaths />

        {/* Section 3: Popular Certifications Vendor Strip */}
        <PopularCertificationsLogos />

        {/* Section 4: Real Stories. Real Success. */}
        <Testimonials />

        {/* Section 5: Why Choose Certification Planner? */}
        <WhyChooseUs />

        {/* Section 6: Corporate Training Solutions */}
        <CorporateBanner />

        {/* Section 7: Upcoming Live Classes */}
        <UpcomingLiveClasses />

        {/* Section 8: Ready to Advance Your Career CTA */}
        <PreFooter />
      </main>
      <Footer />
    </div>
  );
}
