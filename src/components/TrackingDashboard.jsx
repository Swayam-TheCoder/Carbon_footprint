import { useState } from 'react'
import { motion } from 'framer-motion'
import './TrackingDashboard.css'

export default function TrackingDashboard({ plan, footprint }) {
  const [selected, setSelected] = useState({})
  const toggle = (id) => setSelected((s) => ({ ...s, [id]: !s[id] }))
  const completed = Object.values(selected).filter(Boolean).length
  const totalActions = plan.length
  const kgSavedSoFar = plan.filter((a) => selected[a.id]).reduce((s, a) => s + a.kgSavedPerYear, 0)
  const projectedTotal = Math.max(0, footprint.totalAnnual - kgSavedSoFar)

  return (
    <div className="tracking">
      <motion.div
        className="tracking-hero"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="tracking-hero-stat">
          <span className="tracking-hero-value mono">{completed}</span>
          <span className="tracking-hero-label">actions completed</span>
        </div>
        <div className="tracking-hero-stat accent">
          <span className="tracking-hero-value mono">{kgSavedSoFar.toLocaleString()}</span>
          <span className="tracking-hero-label">kg CO₂e saved/year</span>
        </div>
        <div className="tracking-hero-stat">
          <span className="tracking-hero-value mono">{projectedTotal.toLocaleString()}</span>
          <span className="tracking-hero-label">projected footprint</span>
        </div>
      </motion.div>

      <h3 className="tracking-title">Mark actions as done</h3>
      <p className="tracking-sub">Tick when you’ve implemented an action. Your projected footprint updates in real time.</p>

      <ul className="tracking-list">
        {plan.map((action, i) => (
          <motion.li
            key={action.id}
            className={`tracking-item ${selected[action.id] ? 'done' : ''}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <button
              type="button"
              className="tracking-check"
              onClick={() => toggle(action.id)}
              aria-pressed={selected[action.id]}
            >
              {selected[action.id] ? (
                <motion.span
                  className="tracking-check-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  ✓
                </motion.span>
              ) : (
                <span className="tracking-check-empty" />
              )}
            </button>
            <div className="tracking-item-content">
              <h4 className="tracking-item-title">{action.title}</h4>
              <p className="tracking-item-savings mono">
                Saves {action.kgSavedPerYear.toLocaleString()} kg CO₂e/year
              </p>
            </div>
          </motion.li>
        ))}
      </ul>

      <motion.div
        className="tracking-progress-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="tracking-progress-label">
          <span>Roadmap progress</span>
          <span className="mono">{Math.round((completed / totalActions) * 100)}%</span>
        </div>
        <div className="tracking-progress-bar">
          <motion.div
            className="tracking-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${(completed / totalActions) * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </motion.div>
    </div>
  )
}
