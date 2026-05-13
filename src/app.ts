import express from 'express'
import profissionalRoutes
from './routes/profissionalRoutes.js'

const app = express()

app.use(express.json())

app.use(
  '/pr',
  profissionalRoutes
)

export default app