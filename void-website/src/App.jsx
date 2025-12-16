import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TechStack from './components/TechStack';
import AgentMode from './components/AgentMode';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TechStack />
        <AgentMode />
      </main>
      <Footer />
    </div>
  );
}

export default App;
