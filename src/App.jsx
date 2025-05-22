import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvide } from './context/AuthContext';
import { useEffect, useState } from 'react';
import Loading from './components/Loading';
import VantaBackground from './VantaBackground';  // Import Vanta background component

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />; 
  }
  
  return (
    <>
      {/* Vanta background effect */}
      <VantaBackground />
      
      <AuthProvide>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Navbar />
        </div>

        {/* Main content container */}
        <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary' style={{ position: 'relative', zIndex: 20 }}>
          <Outlet />
        </main>

        {/* Footer */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Footer />
        </div>
      </AuthProvide>
    </>
  );
}

export default App;
