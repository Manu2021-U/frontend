import React, { useEffect, useRef, useState } from 'react';

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !vantaEffect) {
      const loadScripts = async () => {
        try {
          // Check if scripts are already loaded
          if (!window.THREE) {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
          }
          if (!window.VANTA) {
            await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js');
          }

          const effect = window.VANTA.BIRDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0xfefae0,  // Soft cream background
            color1: 0x4361ee,           // Vibrant blue (primary)
            color2: 0x3a0ca3,           // Deep purple (secondary)
            colorMode: "lerp",          // Smooth color transitions
            birdSize: 0.8,              // Optimal size for visibility
            quantity: 4,                // Balanced number of birds
            separation: 40,             // Comfortable spacing
            alignment: 30,             // Natural flocking behavior
            cohesion: 25,               // Group cohesion
            speedLimit: 5,              // Calm movement
            backgroundAlpha: 0.9,       // Slight transparency
            wingSpan: 25,               // Realistic wing span
          });

          setVantaEffect(effect);
        } catch (error) {
          console.error('Error loading Vanta.js:', error);
        }
      };

      const loadScript = (src) => new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

      loadScripts();
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
        // Clean up the global namespace if needed
        if (window.VANTA && Object.keys(window.VANTA.instances).length === 0) {
          delete window.VANTA;
        }
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none"
      style={{
        backgroundColor: '#fefae0', // Fallback color
      }}
    />
  );
};

export default VantaBackground;