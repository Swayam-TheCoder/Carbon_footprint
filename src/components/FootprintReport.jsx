import { motion } from 'framer-motion'
import './FootprintReport.css'

const BREAKDOWN = [
  { key: 'electricity', label: 'Electricity', color: 'var(--accent-amber)' },
  { key: 'gas', label: 'Gas', color: 'var(--accent-coral)' },
  { key: 'travel', label: 'Travel', color: 'var(--accent-cyan)' },
  { key: 'logistics', label: 'Logistics', color: 'var(--accent-lime)' },
]

export default function FootprintReport({ footprint, onSeeRoadmap }) {
  const { emissions, totalAnnual } = footprint
  const maxVal = Math.max(totalAnnual, 1)

  return (
    <div className="report">
      <motion.div
        className="report-total-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      >
        <div className="report-total-label">Total annual footprint</div>
        <div className="report-total-value mono">
          {totalAnnual.toLocaleString()} <span className="report-unit">kg CO₂e</span>
        </div>
        <div className="report-total-equivalent">
          ≈ {(totalAnnual / 1000).toFixed(1)} tonnes CO₂e / year
        </div>
      </motion.div>

      <motion.div
        className="report-breakdown"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h3 className="report-breakdown-title">Breakdown by category</h3>
        <div className="report-bars">
          {BREAKDOWN.map((item, i) => {
            const val = emissions[item.key] || 0
            const pct = (val / maxVal) * 100
            return (
              <motion.div
                key={item.key}
                className="report-bar-row"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <div className="report-bar-label">
                  <span className="report-bar-dot" style={{ background: item.color }} />
                  {item.label}
                </div>
                <div className="report-bar-track">
                  <motion.div
                    className="report-bar-fill"
                    style={{ background: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
                  />
                </div>
                <div className="report-bar-value mono">{val.toLocaleString()} kg</div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        className="report-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          type="button"
          className="btn btn-primary"
          onClick={onSeeRoadmap}
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px var(--glow-cyan)' }}
          whileTap={{ scale: 0.98 }}
        >
          Get reduction roadmap with ROI
        </motion.button>
      </motion.div>
    </div>
  )
}
