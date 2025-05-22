import React, { useEffect, useRef, useState } from 'react';

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !vantaEffect) {
      const loadScripts = async () => {
        const loadScript = (src) =>
          new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            document.body.appendChild(script);
          });

        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        window.THREE = window.THREE || window.THREE;

        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js');

        const vanta = window.VANTA.BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0xfefae0,  // Light pastel background (cream)
          color1: 0x4361ee,           // Primary bird color (deep blue)
          color2: 0x3a0ca3,           // Accent bird color (purple)
          birdSize: 1.5,              // Slightly smaller birds
          quantity: 3,                // Fewer birds for elegance
          separation: 50,
          alignment: 20,
          cohesion: 10,
          wingSpan: 20,
        });

        setVantaEffect(vanta);
      };

      loadScripts();
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default VantaBackground;
