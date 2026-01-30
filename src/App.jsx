import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFootprint } from './hooks/useFootprint'
import { useReductionPlan } from './hooks/useReductionPlan'
import Hero from './components/Hero'
import InputForm from './components/InputForm'
import FootprintReport from './components/FootprintReport'
import ReductionRoadmap from './components/ReductionRoadmap'
import TrackingDashboard from './components/TrackingDashboard'
import Nav from './components/Nav'

const VIEWS = ['input', 'report', 'roadmap', 'tracking']

export default function App() {
  const [view, setView] = useState('input')
  const footprint = useFootprint()
  const plan = useReductionPlan(footprint)

  return (
    <div className="min-h-screen pb-16">
      <Nav view={view} setView={setView} />
      <main className="max-w-[1200px] mx-auto px-6 md:px-8">
        <Hero view={view} totalAnnual={footprint.totalAnnual} />
        <AnimatePresence mode="wait">
          {view === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="pt-4 md:pt-8"
            >
              <InputForm footprint={footprint} onDone={() => setView('report')} />
            </motion.div>
          )}
          {view === 'report' && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="pt-4 md:pt-8"
            >
              <FootprintReport footprint={footprint} onSeeRoadmap={() => setView('roadmap')} />
            </motion.div>
          )}
          {view === 'roadmap' && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="pt-4 md:pt-8"
            >
              <ReductionRoadmap plan={plan} footprint={footprint} onTrack={() => setView('tracking')} />
            </motion.div>
          )}
          {view === 'tracking' && (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="pt-4 md:pt-8"
            >
              <TrackingDashboard plan={plan} footprint={footprint} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
