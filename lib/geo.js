//geocoder
const NodeGeocoder = require('node-geocoder');
  
const options = {
  provider: 'mapquest',
  apiKey: 'TeIXhDWAs3u6DTEvQo5KwC7dj1k8joGY', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
  
const geocoder = NodeGeocoder(options); 
//:geocoder

async function connect(adress){
    const res = await geocoder.geocode(adress)
    for(let i = 0; i < res.length; i++){
        if(res[i].city == 'Porto Alegre'){
            return res[i].latitude + ";" + res[i].longitude
        }
    }
}

module.exports = {
    connect: connect
}