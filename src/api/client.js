const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function getReport(reportId) {
  const res = await fetch(`${API_BASE}/api/reports/${reportId}`)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || (res.status === 404 ? 'Report not found' : 'Failed to load report'))
  return data
}

export async function createReport({ inputs, emissions, totalAnnual }) {
  const res = await fetch(`${API_BASE}/api/reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs, emissions, totalAnnual }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Failed to save report')
  return data
}

export async function updateReport(reportId, data) {
  const res = await fetch(`${API_BASE}/api/reports/${reportId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update report')
  return res.json()
}

export async function healthCheck() {
  const res = await fetch(`${API_BASE}/api/health`)
  return res.ok
}
