import { motion } from 'framer-motion'
import './ReductionRoadmap.css'

const DIFFICULTY = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
const DIFF_COLOR = { easy: 'var(--accent-lime)', medium: 'var(--accent-amber)', hard: 'var(--accent-coral)' }

export default function ReductionRoadmap({ plan, footprint, onTrack }) {
  const totalSavings = plan.reduce((s, a) => s + a.kgSavedPerYear, 0)
  const newTotal = Math.max(0, footprint.totalAnnual - totalSavings)

  return (
    <div className="roadmap">
      <motion.div
        className="roadmap-summary"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="roadmap-summary-row">
          <span>Current footprint</span>
          <span className="mono">{footprint.totalAnnual.toLocaleString()} kg CO₂e/year</span>
        </div>
        <div className="roadmap-summary-row highlight">
          <span>If all actions taken</span>
          <span className="mono">{newTotal.toLocaleString()} kg CO₂e/year</span>
        </div>
        <div className="roadmap-summary-row accent">
          <span>Potential reduction</span>
          <span className="mono">−{totalSavings.toLocaleString()} kg CO₂e/year</span>
        </div>
      </motion.div>

      <h3 className="roadmap-title">Prioritised actions (with ROI)</h3>
      <ul className="roadmap-list">
        {plan.map((action, i) => (
          <motion.li
            key={action.id}
            className="roadmap-item"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
          >
            <div className="roadmap-item-head">
              <span className="roadmap-item-num">{i + 1}</span>
              <div className="roadmap-item-main">
                <h4 className="roadmap-item-title">{action.title}</h4>
                <p className="roadmap-item-desc">{action.description}</p>
              </div>
              <span
                className="roadmap-item-diff"
                style={{ color: DIFF_COLOR[action.difficulty] }}
              >
                {DIFFICULTY[action.difficulty]}
              </span>
            </div>
            <div className="roadmap-item-metrics">
              <div className="roadmap-metric">
                <span className="roadmap-metric-label">Saves</span>
                <span className="roadmap-metric-value mono">{action.kgSavedPerYear.toLocaleString()} kg/year</span>
              </div>
              <div className="roadmap-metric">
                <span className="roadmap-metric-label">Cost</span>
                <span className="roadmap-metric-value mono">
                  {action.cost > 0 ? `£${action.cost.toLocaleString()}` : '£0'}
                </span>
              </div>
              <div className="roadmap-metric">
                <span className="roadmap-metric-label">Payback</span>
                <span className="roadmap-metric-value mono">
                  {action.paybackMonths > 0
                    ? `${action.paybackMonths} mo`
                    : 'Immediate'}
                </span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>

      <motion.div
        className="roadmap-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          type="button"
          className="btn btn-primary"
          onClick={onTrack}
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px var(--glow-cyan)' }}
          whileTap={{ scale: 0.98 }}
        >
          Start tracking progress
        </motion.button>
      </motion.div>
    </div>
  )
}
