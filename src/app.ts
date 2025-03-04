import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
const app:Application = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Welcome to the campers shop!')
})

export default app;