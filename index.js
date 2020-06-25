const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const { connect } = require('./lib/geo')
const { getDistanceFromLatLonInKm } = require('./lib/calcDistancia')
const app = express()
const port = process.env.PORT || 3000

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res)=>{
    res.render('home')
})

app.post('/geolocaliza', (req, res)=>{
    const frete = req.body.frete
    const viaOrigem = req.body.viaOrigem
    const logradouroOrigem = req.body.logradouroOrigem
    const numeroOrigem = req.body.numeroOrigem
    const bairroOrigem = req.body.bairroOrigem
    const cidadeOrigem = req.body.cidadeOrigem
    const paisOrigem = req.body.paisOrigem
    const viaDestino = req.body.viaDestino
    const logradouroDestino = req.body.logradouroDestino
    const numeroDestino = req.body.numeroDestino
    const bairroDestino = req.body.bairroDestino
    const cidadeDestino = req.body.cidadeDestino
    const paisDestino = req.body.paisDestino
    const adressOrigem = `${viaOrigem} ${logradouroOrigem} ${numeroOrigem} ${bairroOrigem} ${cidadeOrigem} ${paisOrigem} `
    const adressDestino = `${viaDestino} ${logradouroDestino} ${numeroDestino} ${bairroDestino} ${cidadeDestino} ${paisDestino} `

    console.log(adressOrigem)
    console.log(adressDestino)

    connect(adressOrigem).then(adressOrigem => {
        const latLong = adressOrigem.split(';')
        const latOrigem = latLong[0]
        const longOrigem = latLong[1]
        connect(adressDestino).then(adressDestino => {
            const latLong = adressDestino.split(';')
            const latDestino = latLong[0]
            const longDestino = latLong[1]
        let distancia = (getDistanceFromLatLonInKm(
        {lat: latOrigem, lng: longOrigem},
        {lat: latDestino, lng: longDestino}
        ))
        let valor = (distancia/1000) * frete
        const enviaValor = {
            valor: `R$ ${valor}`
        }
        res.render('geolocaliza', {enviaValor: enviaValor})
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })

})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}/`)
  })
  