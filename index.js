require('dotenv').config();
const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser');
const Model = require('objection').Model
const knexInit = require('knex')

const knexConfig = require('./config/knexfile')
const knex = knexInit(knexConfig[process.env.NODE_ENV])

const app = express()

Model.knex(knex)
const category = require('./routes/categories')
const admin = require('./routes/admins')
const session = require('./routes/sessions')
const customer = require('./routes/customers')
const model = require('./routes/models')
const brand = require('./routes/brands')
const product = require('./routes/products')
const order = require('./routes/orders')


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to bStore</h1>`)
})

app.use('/api/categories', category);
app.use('/api/admins', admin)
app.use('/api/sessions', session); // Used For Login , Activation , Deactivation , Forgetting Password if needed
app.use('/api/customers', customer)
app.use('/api/models', model)
app.use('/api/brands', brand)
app.use('/api/products', product)
app.use('/api/orders', order)

const port = process.env.PORT
app.listen(port, (req, res) => {
    console.log(`Server up and running on port ${port}`)
})