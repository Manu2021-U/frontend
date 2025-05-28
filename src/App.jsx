import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvide } from './context/AuthContext';
import { useEffect, useState } from 'react';
import Loading from './components/Loading';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      // Load scripts dynamically
      const loadScripts = async () => {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js');
        
        window.VANTA.BIRDS({
          el: "#vanta-container",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0xfefae0,
          color1: 0x4361ee,
          color2: 0x3a0ca3,
          birdSize: 1.5,
          quantity: 3.00,
          //speedLimit: 3.00
           separation: 50,
          alignment: 20,
          cohesion: 10,
          wingSpan: 20,
        });
      };

      loadScripts();
    }
  }, [loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthProvide>
      {/* Wrapped Vanta container */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <div 
          id="vanta-container" 
          className="w-full h-full pointer-events-none"
        ></div>
      </div>
      
      {/* Content container */}
      <div className="min-h-screen flex flex-col relative z-10">
        <header>
          <Navbar />
        </header>

        <main className="flex-1 max-w-screen-2xl mx-auto px-4 py-6 font-primary">
          <Outlet />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </AuthProvide>
  );
}

// Helper function to load scripts
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default App;