import mongoose from 'mongoose'

const defaultUri = 'mongodb://localhost:27017/carbon-footprint-sme'

export async function connectDB() {
  const uri = process.env.MONGODB_URI || defaultUri
  await mongoose.connect(uri)
  console.log('MongoDB connected to', uri.replace(/\/\/[^@]+@/, '//***@'))
}

export function isConnected() {
  return mongoose.connection.readyState === 1
}
