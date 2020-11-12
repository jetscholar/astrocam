const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const port = 6942

const app = express()

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)

app.listen(process.env.PORT || port, () => {
    console.log('Web App ready at http://localhost:' + port)
})
