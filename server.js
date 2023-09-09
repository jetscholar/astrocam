if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    dotenv.config()
}

const port = 6942
const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()

// Set and Use things
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.set('views', __dirname + '/views')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

// Routes
const indexRouter = require('./routes/index')

app.use('/', indexRouter)

// Start the server
app.listen(process.env.PORT || port, () => {
    console.log('Web App ready at http://localhost:' + port)
})
