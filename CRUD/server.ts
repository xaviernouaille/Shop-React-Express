import express, {Application} from 'express'
import router from './routes/index'
import 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use('/', router)

mongoose.connect(
  `${process.env.MONGODB_URI}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log('Connected to DB success')
  }
)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))

export default app
