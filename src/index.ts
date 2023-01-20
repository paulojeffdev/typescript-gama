import express, { NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

//call middlewares - Middlewares: Camada intermediária
app.use(express.json())
app.use(cors())
app.use(helmet())

app.use("/", routes)

app.listen(process.env.PORT || 5000, () => {
    console.log('Server started')
})

export default app