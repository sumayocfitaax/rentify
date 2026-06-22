const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectedDB = require('./config/db')
const userRouter = require('./router/userRouter')
const propertyRouter = require('./router/propertRouter')

dotenv.config()

connectedDB()

const app = express();
app.use(express.json());
app.use(cors())

const port = process.env.PORT || 4000

app.use('/images', express.static('images'))

app.use('/api', userRouter)
app.use('/api', propertyRouter)

app.get('/', (req,res) => {
  res.json('working')
})

app.listen(port, (req,res) => {
  console.log(`server is connected on port ${port}`)
})