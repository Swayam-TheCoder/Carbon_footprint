import { useState, useEffect, useCallback } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/CarbonIQ/Navbar';
import Cursor from './components/CarbonIQ/Cursor';
import Hero from './components/CarbonIQ/Hero';
import Calculator from './components/CarbonIQ/Calculator';
import Roadmap from './components/CarbonIQ/Roadmap';
import Planning from './components/CarbonIQ/Planning';
import Tracker from './components/CarbonIQ/Tracker';
import Profile from './components/CarbonIQ/Profile';

function CarbonIQApp() {
  const { theme, setActiveSection } = useApp();
  const [roadmapData, setRoadmapData] = useState({
    saveElec: 0,
    roiElec: '--',
    saveFuel: 0,
    roiFuel: '--',
    saveTravel: 0,
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const sections = ['home', 'calculator', 'roadmap', 'planning', 'tracking', 'profile'];
      const viewportMid = window.innerHeight / 2;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= viewportMid) {
          setActiveSection(sections[i]);
          break;
        }
      }
      document.querySelectorAll('.reveal').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [setActiveSection]);

  const handleRoadmapUpdate = useCallback((data) => {
    if (!data) return;
    const { elec = 0, fuel = 0, travel = 0, COST_ELEC = 0.12, COST_FUEL = 1 } = data;
    const saveElecVal = (elec * COST_ELEC) * 0.15;
    const investElec = data.currSymbol === '₹' ? 40000 : 500;
    const roiElec = saveElecVal > 0 ? (investElec / saveElecVal).toFixed(1) : '--';
    const saveFuelVal = (fuel * COST_FUEL) * 0.2;
    const roiFuel = saveFuelVal > 0 ? '2.1' : '--';
    setRoadmapData({
      saveElec: saveElecVal,
      roiElec,
      saveFuel: saveFuelVal,
      roiFuel,
      saveTravel: 0,
    });
  }, []);

  return (
    <>
      <div className="ambient-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Calculator onRoadmapUpdate={handleRoadmapUpdate} />
        <Roadmap roadmapData={roadmapData} />
        <Planning />
        <Tracker theme={theme} />
        <Profile />
      </main>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <CarbonIQApp />
    </AppProvider>
  );
}
