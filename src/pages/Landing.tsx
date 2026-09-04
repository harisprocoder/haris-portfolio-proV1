import Preloader from "@/components/portfolio/Preloader";
import CursorGlow from "@/components/portfolio/CursorGlow";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Services from "@/components/portfolio/Services";
import Testimonials from "@/components/portfolio/Testimonials";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import BackToTop from "@/components/portfolio/BackToTop";
import InteractiveTimeline from "@/components/portfolio/InteractiveTimeline";
import CodeShowcase from "@/components/portfolio/CodeShowcase";
import PricingCalculator from "@/components/portfolio/PricingCalculator";
import Chatbot from "@/components/portfolio/Chatbot";
import KeyboardShortcuts from "@/components/portfolio/KeyboardShortcuts";

export default function Landing() {
  return (
    <div className="min-h-screen" style={{ background: "#0A0702" }}>
      <Preloader />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <InteractiveTimeline />
        <Skills />
        <CodeShowcase />
        <Projects />
        <Services />
        <PricingCalculator />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Chatbot />
      <KeyboardShortcuts />
    </div>
  );
}
