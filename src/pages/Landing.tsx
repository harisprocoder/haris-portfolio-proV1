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
// New premium features
import GitHubStats from "@/components/portfolio/GitHubStats";
import PricingCalculator from "@/components/portfolio/PricingCalculator";
import InteractiveTimeline from "@/components/portfolio/InteractiveTimeline";
import CodeShowcase from "@/components/portfolio/CodeShowcase";
import ClientTicker from "@/components/portfolio/ClientTicker";
import CostBreakdown from "@/components/portfolio/CostBreakdown";
import Chatbot from "@/components/portfolio/Chatbot";
import KeyboardShortcuts from "@/components/portfolio/KeyboardShortcuts";
import ProjectStatus from "@/components/portfolio/ProjectStatus";
import EmojiReactions from "@/components/portfolio/EmojiReactions";

export default function Landing() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0a0f" }}>
      <Preloader />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <ClientTicker />
        <About />
        <InteractiveTimeline />
        <Skills />
        <CodeShowcase />
        <Projects />
        <Services />
        <PricingCalculator />
        <div className="py-16" style={{ background: "#0d1117" }}>
          <div className="max-w-[800px] mx-auto px-6">
            <CostBreakdown />
          </div>
        </div>
        <GitHubStats />
        <Testimonials />
        <div className="py-12 flex justify-center" style={{ background: "#0d1117" }}>
          <EmojiReactions />
        </div>
        <div className="py-8 flex justify-center" style={{ background: "#0d1117" }}>
          <ProjectStatus />
        </div>
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Chatbot />
      <KeyboardShortcuts />
    </div>
  );
}
