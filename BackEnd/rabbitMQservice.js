//************************************************************Global section***********************************************************/
require('./db/db');
const amqp = require("amqplib");
const Cars = require('./controllers/dbServiceCars');
const Humans = require('./controllers/dbServiceHumans');
//const { db } = require('./db/carsSchema');
var camList = new Map()
var writing = false
var waitingBuffer = []
var DBHumans = new Humans()
var DBCars = new Cars()

//************************************************************Consume section************************************************************/
//This function gets cameras list, and each camera contains fields of guid, isHuman and
//isCar, and sets connection to the analytics servers que. each analytic server has a RabbitMQ channel with a que, 
//here we connect to the que and sets the consumers to recive meta-data and thumbnails.
connect();
async function connect() {
    try {
            camList = require('./cameraMap.json');
            const amqpServer = "amqp://test:test@82.166.178.54:5672"
            const connection = await amqp.connect(amqpServer)
            const channel = await connection.createChannel();
            await channel.assertQueue("deeps");
            channel.consume("deeps", message => {// this line define consumer (like listener) to the humans que of the channel.
            let JsonFile = (JSON.parse(message.content))
            coll = camList[JsonFile.object.sourceId][0] + '_' + Object.keys(JsonFile.object)[5]
            objectType = Object.keys(JsonFile.object)[5]
            if(writing === false){ //in case that there isn't another Json handel in parallel.
                writing = true
                if(waitingBuffer.length != 0){//in case that the waitingBuffer isn't empty.
                    if(waitingBuffer.length === 1){//in case that there is only one json in waitingBuffer.
                        sendToDBservice(objectType,JsonFile, coll);//send the current json to the controller.
                        sendToDBservice(waitingBuffer[0][0],waitingBuffer[0][1], waitingBuffer[0][2]);//send the json from the waitingBuffer to the controller.
                        waitingBuffer.pop(0)  
                    }
                    else{//in case that there is more than one json in waitingBuffer.
                        let temp = [objectType,JsonFile, coll]
                        waitingBuffer.push(temp)
                        sendToDBservice(waitingBuffer[0][0],waitingBuffer[0][1], waitingBuffer[0][2]);//send the json from the waitingBuffer to the controller.
                        waitingBuffer.pop(0)    
                    }
                    console.log('remove from buffer')
                }
                else{//in case that the waitingBuffer is empty.
                    sendToDBservice(objectType,JsonFile, coll);//send the current json to the controller.
                } 
                writing = false 
            }
            else if(writing === true){//in case that there is another Json handel in parallel.
                let temp = [objectType,JsonFile, coll]
                waitingBuffer.push(temp)
                writing = false
            }
            channel.ack(message); //Here the consumer lets the rabbit server that it got the message so the message will be removed from the que.
        })
        console.log("Waiting for messages...")
    }
    catch (ex){
        console.error(ex)
    }
}

function sendToDBservice(objectType,JsonFile, coll){
    if (objectType === "person"){ DBHumans.addHuman(JsonFile, coll)}
    if (objectType === "vehicle"){DBCars.addCar(JsonFile, coll)}
}