import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema(
  {
    inputs: {
      electricityKwh: { type: Number, default: 0 },
      gasKwh: { type: Number, default: 0 },
      carKm: { type: Number, default: 0 },
      carType: { type: String, default: 'carPetrol' },
      vanKm: { type: Number, default: 0 },
      flightKm: { type: Number, default: 0 },
      flightType: { type: String, default: 'flightShort' },
      trainKm: { type: Number, default: 0 },
      freightTonneKm: { type: Number, default: 0 },
      freightMode: { type: String, default: 'freightRoad' },
    },
    emissions: {
      electricity: { type: Number, default: 0 },
      gas: { type: Number, default: 0 },
      travel: { type: Number, default: 0 },
      logistics: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    totalAnnual: { type: Number, default: 0 },
    completedActions: [{ type: String }],
  },
  { timestamps: true }
)

export default mongoose.model('Report', reportSchema)
