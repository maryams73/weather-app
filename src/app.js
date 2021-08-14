const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'MARYAM'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'MARYAM'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.', 
        name: 'MARYAM'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            'error': 'You must provide an address!'
        })
    }

    geocode.geocode(req.query.address, (error, {latitude, longitude} = {})=>{

        if (error){
            return res.send({error})
        }
        
        forecast.forecast(req.query.address, (errorF, responseForecast)=>{
            if (errorF){
                return res.send({error})
            }
            res.send({
                forecast: responseForecast,
                location: req.query.address, 
                address: req.query.address
            })
            
        })
    })

   
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        type: 'Help page not found!',
        name: 'Maryam'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        type: 'Page not found!',
        name: 'Maryam'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})