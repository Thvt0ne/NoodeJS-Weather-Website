const { error } = require('console')
const { errorMonitor } = require('events')
const request = require('request')
//url1 = 'https://api.weatherapi.com/v1/forecast.json?key=a51f46736e4b404da4e95109222103&q=Riyadh&days=1&aqi=no&alerts=no'
//url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Riyadh.json?access_token=pk.eyJ1IjoiMThjb20iLCJhIjoiY2wxMHAwM2ZqMmZnajNqbm0wMXFkZzJidSJ9.oMSyO_H2wltJo52kJcrvEA'
//mapboxAPI = 'pk.eyJ1IjoiMThjb20iLCJhIjoiY2wxMHAwM2ZqMmZnajNqbm0wMXFkZzJidSJ9.oMSyO_H2wltJo52kJcrvEA '

// pk.eyJ1IjoiMThjb20iLCJhIjoiY2wxMHAwM2ZqMmZnajNqbm0wMXFkZzJidSJ9.oMSyO_H2wltJo52kJcrvEA      it's for mapbox 
//var city = "Riyadh"
//function getWeatherData(a) {

//    url1 = `https://api.weatherapi.com/v1/forecast.json?key=a51f46736e4b404da4e95109222103&q=${a}&days=1&aqi=no&alerts=no`
//    url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + a + '.json?access_token=pk.eyJ1IjoiMThjb20iLCJhIjoiY2wxMHAwM2ZqMmZnajNqbm0wMXFkZzJidSJ9.oMSyO_H2wltJo52kJcrvEA'
//    mapboxAPI = 'pk.eyJ1IjoiMThjb20iLCJhIjoiY2wxMHAwM2ZqMmZnajNqbm0wMXFkZzJidSJ9.oMSyO_H2wltJo52kJcrvEA '

//    // try catch must be inside the connection not out of the connection if u wan to handle the connection

//        request({ url: url1, json: true }, (error, response) => {
//            try {
//                if (error) {
//                    console.log('Unable to connect to weather service !')
//                } else if ((response.body.location.name & response.body.current.temp_c & response.body.current.precip_mm & response.body.current.humidity) != undefined) {
//                    console.log("currently in " + response.body.location.name + " the temperture is  " + response.body.current.temp_c + " and humidity is : " + response.body.current.precip_mm + " and the chance of rain is " + response.body.current.humidity)

//                }
//                else {
//                    console.log("make sure you wrote a correct city")
//                }
//            } catch (e) {
//                console.log("Something went wrong while processing! 'maybe city name is unknown'")
//            }
//        })


//        request({ url: url2, json: true }, (error, response2) => {
//           try {
//                if (error) {

//                    console.log('Unable to connect to mapping service !')
//                } else if ((response2.body.features[0].place_name & response2.body.features[0].center[0] & response2.body.features[0].center[1]) != undefined) {
//                    console.log("current City:  " + response2.body.features[0].place_name + " and it's longitude:" + response2.body.features[0].center[0] + "," + " latitude " + response2.body.features[0].center[1])

//                }
//                else {
//                    console.log("make sure you wrote a correct city")
//                }
//            } catch (e) {
//                console.log("Something went wrong while processing! 'maybe city name is unknown'")
//            }
//        })


//    }

//setTimeout(() => { getWeatherData(city) }, 2000)



function geocode  (address, callback) { // the callback function its the function which call this geocode method
    const url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiMThjb20iLCJhIjoiY2wxMHAwM2ZqMmZnajNqbm0wMXFkZzJidSJ9.oMSyO_H2wltJo52kJcrvEA`

    request({ url: url2, json: true }, (error, response2) => {
        if (error) {
            callback('Unable to connect to weather service !', undefined)
        } else if (response2.body.features.length === 0) {
            callback('location not found try another search !', undefined)
        }
        else {

            callback(undefined, (response2))
            //callback(undefined, "current City:  " + response2.body.features[0].place_name + " and it's longitude:" + response2.body.features[0].center[0] + "," + " latitude " + response2.body.features[0].center[1])

            }
    })
}




function forecast(address, callback) {

    url1 = `https://api.weatherapi.com/v1/forecast.json?key=a51f46736e4b404da4e95109222103&q=${address}&days=1&aqi=no&alerts=no`

    request({ url: url1, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to mapping service!', undefined)
        } else if (!response.body.location ) {
            callback(response.body.error.message, undefined)
        }
        else {
            //callback("currently in " + response.body.location.name + " the temperture is  " + response.body.current.temp_c + " and humidity is : " + response.body.current.precip_mm + " and the chance of rain is " + response.body.current.humidity)
            callback(response)
        }
    })
}








var geocoderesponseJSONbody
var forecastresponseJSONbody


function what(cityname) {
    geocode(cityname, (error, data) => {
      //  console.log(error ? error : "current City:  " + data.body.features[0].place_name + " and it's longitude:" + data.body.features[0].center[0] + "," + " latitude " + data.body.features[0].center[1])
        geocoderesponseJSONbody = data
        if (typeof (data) == 'object') {

            geocoderesponseJSONbody = data
        }
        else {
            geocoderesponseJSONbody = error

        }
        forecast(typeof (data) == 'object' ? data.body.query : data, (error, data) => {
         //console.log(error ? error : data)//if there is an error pls print it , otherwise gie me the data
            if (typeof (data) == 'object') {

                forecastresponseJSONbody = data
            }
            else {
                forecastresponseJSONbody = error

            }
        })

    })


    
    if (typeof (geocoderesponseJSONbody) == 'object' && typeof (forecastresponseJSONbody) == 'object' ) {
        return {
            "City": geocoderesponseJSONbody.body.query[0],
            "latitude": geocoderesponseJSONbody.body.features[0].center[1],
            "longtitude": geocoderesponseJSONbody.body.features[0].center[0],
            //forecastresponseJSONbody: typeof(forecastresponseJSONbody)
            "Humidity": forecastresponseJSONbody.body.current.humidity,
            "Temperture": forecastresponseJSONbody.body.current.temp_c,
            "Chanceofrain": forecastresponseJSONbody.body.current.precip_mm,
            "name":"AhmedTh"
        } 

    } else {
        return {error:"unknown data please make sure of the city name "}}
    
}

module.exports = { what: what};
