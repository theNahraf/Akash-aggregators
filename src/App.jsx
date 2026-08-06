import Navbar from './components/layout/Navbar';
import StockTicker from './components/layout/StockTicker';
import Hero from './components/sections/Hero';
import StatsBar from './components/sections/StatsBar';
import About from './components/sections/About';
import WhyChooseUs from './components/sections/WhyChooseUs';
import Services from './components/sections/Services';
import SIPCalculator from './components/sections/SIPCalculator';
import B2BServices from './components/sections/B2BServices';
import StaffRecruitment from './components/sections/StaffRecruitment';
import MarketOverview from './components/sections/MarketOverview';
import FAQ from './components/sections/FAQ';
import Testimonials from './components/sections/Testimonials';
import ContactSection from './components/sections/ContactSection';
import Newsletter from './components/sections/Newsletter';
import Footer from './components/layout/Footer';
import FloatingActions from './components/chat/FloatingActions';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#05061A' }}>
      <Navbar />
      <StockTicker />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <WhyChooseUs />
        <Services />
        <SIPCalculator />
        <B2BServices />
        <StaffRecruitment />
        <MarketOverview />
        <FAQ />
        <Testimonials />
        <ContactSection />
        <Newsletter />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default App;
