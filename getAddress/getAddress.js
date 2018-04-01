const request = require("request")


var gettingAddress = (address,callback) => {
    var encodedAddress = encodeURIComponent(address)
    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json:true
    },(error,response,body) => {
        if(error){
           callback(`The following error is occured: ${error}`);
        }else if(body.status == 'ZERO_RESULTS'){
            callback("Unable tp find the adress please input valid address");
        }else if(body.status == 'OK'){
            callback(undefined,{
                Address:body.results[0].formatted_address,
                Latitude:body.results[0].geometry.location.lat,
                Longitutde:body.results[0].geometry.location.lng,
                
            });
        }else{
             callback("Meko bhi ni pta kya error hai");
        }
    });
}
module.exports = {
    gettingAddress
}