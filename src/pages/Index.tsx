
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Features from '../components/Features';
import RitualCalendar from '../components/RitualCalendar';
import Attractions from '../components/Attractions';
import CrowdTracker from '../components/CrowdTracker';
import LiveStream from '../components/LiveStream';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <RitualCalendar />
      <Attractions />
      <CrowdTracker />
      <LiveStream />
    </Layout>
  );
};

export default Index;
