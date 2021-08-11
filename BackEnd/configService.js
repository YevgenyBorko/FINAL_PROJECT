var http = require('http');
var fs = require('fs');
var myCams = new Map()
//This class is a service that creates a map of data from the configuration json file.
class Config{
    createCamsMap(){
        var list = require('./camList.json'); 
        var l = []
        for(let i in list){
            for(let j in list[i].cameras){
                l.push(list[i].cameras[j].name)
                l.push(list[i].cameras[j].isHuman)
                l.push(list[i].cameras[j].isCar)
                myCams[list[i].cameras[j].guid] = l;
                l = []
            }
        }
        const data = JSON.stringify(myCams);
        try {
            fs.writeFileSync('cameraMap.json', data);
            console.log("JSON data is saved.");
        } catch (error) {
            console.error(err);
        }
    }
    getCamsMap(){
        return myCams;
    }
}

module.exports = Config;
