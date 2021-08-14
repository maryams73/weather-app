const request = require ('request')

exports.forecast= (address, callback)=>{

    const url = 'http://api.weatherapi.com/v1/current.json?key=b4c45b25465e4ddabf044713210908&q=' + encodeURIComponent(address) + '&aqi=yes'

    request({url, json: true}, (error, { body })=> {
        if (error){
            callback('Unable to connect to weather services!', undefined)
        }else if (body.error){
            callback('Something went wrong with getting information! check url!', undefined)
        }else{
            callback(undefined, {
                temperature: body.current.temp_c
            } )
        }
    })
}