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
//***************************************************************************************************************************************/
//************************************************************Consume section************************************************************/
//This function is a service that gets a list of analytic servers and their cameras, and sets connection to each analytic server's queue.
//Each analytic server has a RabbitMQ channel with a queue, here we connect to the queues and sets the consumers to recive meta-data and
//thumbnails from the analytic servers queues. In this project we work with one analitytic server but we can support multiple servers.
connect();
async function connect() {
    try {
        //-----------------------------------------set connection to queues---------------------------------------------
            camList = require('./cameraMap.json');
            const amqpServer = "amqp://test:test@82.166.178.54:5672"
            const connection = await amqp.connect(amqpServer)
            const channel = await connection.createChannel();
            await channel.assertQueue("deeps");
        //-----------------------------------------set consumer to the queues metadata---------------------------------- 
        //Consumer is a lisener that lisen to the queue.
            channel.consume("deeps", message => {
            let JsonFile = (JSON.parse(message.content))
            coll = camList[JsonFile.object.sourceId][0] + '_' + Object.keys(JsonFile.object)[5]//get from the json the collection that it should be saved in.
            objectType = Object.keys(JsonFile.object)[5]//get from the json the object type.
            if(writing === false){ //in case that there isn't another Json handel in parallel.
                writing = true
                if(waitingBuffer.length != 0){//in case that the waitingBuffer isn't empty.
                    if(waitingBuffer.length === 1){//in case that there is only one json in waitingBuffer.
                        sendToDBservice(objectType,JsonFile, coll);//send the current json to the sendToDBservice function.
                        sendToDBservice(waitingBuffer[0][0],waitingBuffer[0][1], waitingBuffer[0][2]);//send the json from the waitingBuffer to the sendToDBservice function.
                        waitingBuffer.pop(0)  
                    }
                    else{//in case that there is more than one json in waitingBuffer.
                        let temp = [objectType,JsonFile, coll]
                        waitingBuffer.push(temp)//insert the current json into the waitingBuffer.
                        sendToDBservice(waitingBuffer[0][0],waitingBuffer[0][1], waitingBuffer[0][2]);//send the json from the waitingBuffer to the sendToDBservice function.
                        waitingBuffer.pop(0)    
                    }
                    console.log('remove from buffer')
                }
                else{//in case that the waitingBuffer is empty.
                    sendToDBservice(objectType,JsonFile, coll);//send the current json to the sendToDBservice function.
                } 
                writing = false 
            }
            else if(writing === true){//in case that there is another Json handel in parallel.
                let temp = [objectType,JsonFile, coll]
                waitingBuffer.push(temp)//insert the current json into the waitingBuffer.
                writing = false
            }
            channel.ack(message); //Here the consumer lets the RabbitMQ server know that it got the message so the message will be removed from the queue.
        })
        console.log("Waiting for messages...")
    }
    catch (ex){
        console.error(ex)
    }
}
//This function gets three variables: json, object-type and collection, and it sends the json to the right controller
//according to the object-type with the collection that the json should be saved in.
function sendToDBservice(objectType,JsonFile, coll){
    if (objectType === "person"){ DBHumans.addHuman(JsonFile, coll)}
    if (objectType === "vehicle"){DBCars.addCar(JsonFile, coll)}
}
