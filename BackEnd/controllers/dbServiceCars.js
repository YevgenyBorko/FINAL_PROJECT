const { Timestamp } = require('bson');
const { db } = require('../db/carsSchema');
const Car = require('../db/carsSchema'); //include for the Car schema

//This function is a controller that gets cars jsons and saves them into the right collection in the DB.
class Cars {
    async addCar(JsonFile, coll) {
        let type = "vehicle"
        let timestamp = Object.values(JsonFile)[2]
        let make = JsonFile.object.vehicle.make
        let model = JsonFile.object.vehicle.model
        let color = JsonFile.object.vehicle.color
        let carType = JsonFile.object.vehicle.type
        let image = JsonFile.object.vehicle.base64Image
        let bbox = JsonFile.object.bbox
        let camera = coll.split('_')[0]

        const newCar = new Car({
            type,
            timestamp,
            make,
            model,
            color,
            carType,
            image,
            bbox,
            camera
        });
        await db.collection(coll).insertOne(newCar); //save to the DB.
        return newCar; //return the JSON object to the router.
    }
}

module.exports = Cars;
