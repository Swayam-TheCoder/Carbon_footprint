import express from 'express'
import Report from '../models/Report.js'
import { isConnected } from '../db.js'

const router = express.Router()

function requireDB(req, res, next) {
  if (!isConnected()) {
    return res.status(503).json({ error: 'Database not connected', code: 'DB_DISCONNECTED' })
  }
  next()
}

router.use(requireDB)

// GET /api/reports/:id - get report by id
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
    if (!report) return res.status(404).json({ error: 'Report not found' })
    res.json(report)
  } catch (err) {
    if (err.name === 'CastError') return res.status(404).json({ error: 'Report not found' })
    res.status(500).json({ error: err.message })
  }
})

// POST /api/reports - create report
router.post('/', async (req, res) => {
  try {
    const { inputs = {}, emissions = {}, totalAnnual = 0 } = req.body
    const report = new Report({
      inputs: { ...inputs },
      emissions: { ...emissions },
      totalAnnual: Number(totalAnnual) || 0,
      completedActions: [],
    })
    await report.save()
    console.log('Report saved:', report._id.toString())
    res.status(201).json({ reportId: report._id.toString(), report })
  } catch (err) {
    console.error('POST /api/reports error:', err)
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/reports/:id - update report (inputs + emissions, or just completedActions)
router.patch('/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    if (!report) return res.status(404).json({ error: 'Report not found' })
    res.json(report)
  } catch (err) {
    if (err.name === 'CastError') return res.status(404).json({ error: 'Report not found' })
    res.status(500).json({ error: err.message })
  }
})

export default router
