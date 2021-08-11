const { db } = require('../db/humanSchema');
const Human = require('../db/humanSchema'); //include for the Human schema
class Humans {
    //This function is a controller that gets humans jsons and saves them into the right collection in the DB.
    async addHuman(JsonFile, coll) {
        let type = "person"
        let timestamp = Object.values(JsonFile)[2]
        let shirtColor1 = JsonFile.object.person.shirtColor1
        let shirtColor2 = JsonFile.object.person.shirtColor2
        let pantsColor1 = JsonFile.object.person.pantsColor1
        let pantsColor2 = JsonFile.object.person.pantsColor2
        let image = JsonFile.object.person.base64Image
        let bbox = JsonFile.object.bbox
        let camera = coll.split('_')[0]

        const newHuman = new Human({
            type,
            timestamp,
            shirtColor1,
            shirtColor2,
            pantsColor1,
            pantsColor2,
            image,
            bbox,
            camera
        });

        await db.collection(coll).insertOne(newHuman); //save to the DB
        return newHuman; //return the JSON object to the router.
    }
}

module.exports = Humans;
