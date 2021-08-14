const request = require ('request')

exports.geocode= (address, callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FmYWVpNzNtIiwiYSI6ImNrczRnNXYwMTJuOXIycXM3czN3anI3bTQifQ.nKLnDEy-z_EV9OPyxyfQtw'

    request({url, json: true}, (error, {body})=> {
        if (error){
            callback('Unable to connect to location services!', undefined)
        }else if (body.error){
            callback('Something went wrong with getting information! check url!', undefined)
        }else{
            const latitude = body.features[0].geometry.coordinates[1];
            const longitude = body.features[0].geometry.coordinates[0];
            callback(undefined, {
                latitude,
                longitude
            } )
        }
    })
}