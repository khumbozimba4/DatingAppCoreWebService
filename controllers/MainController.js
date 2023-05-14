const request = require('request');


const MainController = {
     getUserLocation:(req,res) =>{
        const ip  = req.connection.remoteAddress;
        const url = `https://ipapi.co/${ip}/json/`;

        return new Promise((resolve, reject) => {
          request.get(url, (error, response, body) => {
            if (error) {
              reject(error);
            } else {
              const location = JSON.parse(body);
              resolve(location);
            }
          });
        });
      }
}

module.exports =  MainController;