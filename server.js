import express from "express"
// to deal with __dirname
import path from 'path'
import { fileURLToPath } from 'url'

import ejs from "ejs"
import expressLayouts from "express-ejs-layouts"

const port = 6942

const app = express()

import { router } from './routes/index.js'

app.set('view engine', 'ejs')

//we need to change up how __dirname is used for ES6 purposes
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//now please load my static html and css files for my express app, from my /dist directory
app.use(express.static(path.join(__dirname ,'dist')));
//** app.set('views', __dirname + '/views') **

app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', router)

app.listen(process.env.PORT || port, () => {
    console.log('Web App ready at http://localhost:' + port)
})
