const express = require('express')
const AddCoordinates = require('./AppChainingCallback')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const viewsPath = path.join(__dirname,"/tamplates/views") //if we did not costomise this statment , the default path for handbars will be /views
//app.com
const hbs = require('hbs')
const partialsPath = path.join(__dirname,"/tamplates/partials")

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//app.get('', (req, res) => {
//    res.send('Hello express!')
//})

console.log(partialsPath)
app.get('', (req, res) => {
    res.render('index', {title:'WeatherApp',name:'Ahmed'})
})
app.get('/', (req, res) => {
    res.render('index', {title:'WeatherApp',name:'Ahmed'})
})
app.get('/index', (req, res) => {
    res.render('index', { title: 'WeatherApp', name: 'Ahmed' })
})
//app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, '/indexc.html'))
//})



app.get('/help', (req, res) => { res.render('help', { title: "Tell us what do you need ", name: "AhmedTh", serviced: "you can contact us withn\n +1232323" }) })
app.get('/about', (req, res) => {
    res.render('about', {title:'About Us',name:'Ahmed'})
})

app.get('/trashjson', (req, res) => {
    res.sendFile(path.join(__dirname, '/trashjson.json'))})

app.get('/weather', (req, res) => {

    if (req.query.address) {
        res.render('weather', AddCoordinates.what(req.query.address ) )
    } else {
            res.render('weather', { error: 'You must provide an address term' })
       }

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    } else { }
    //console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.send('404 , dont use dirbuster on Help path ! <br><p>helping directory not found !</p>')
})
app.get('*', (req, res) => {
    res.render('404', {title:".. Not found xD",name:"AhmedTh"})
})




app.listen(port, () => { console.log('Server is UP on port '+ port) })
