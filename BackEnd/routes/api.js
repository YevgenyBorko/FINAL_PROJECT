//************************************************************Global section**********************************************************/
require('../db/db');
var config = require('../configService');
var assistant = require('../webAssistant');
var dbSearcher = require('../db/dbSearchService');
let express = require('express');
const { db } = require('../db/carsSchema');
let router = express.Router();
var camList = new Map()
var bodyParser = require('body-parser');
const { Socket } = require('socket.io');
const { response } = require('express');
const { isValidObjectId } = require('mongoose');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//***********************************************************************************************************************************/

//***********************************************************Query router************************************************************/
router.post('/query', function(req, res, next) {
    var myAssistant = new assistant();
    var DB = new dbSearcher();
    //Here we use the assistent service to create queries array.
    let queries = myAssistant.createQueriesArray(new Date(req.body.start), new Date(req.body.end), req.body.make, req.body.model, 
                                                    req.body.color, req.body.carType, req.body.shirtColor, req.body.pantsColor, 
                                                    req.body.searchHuman, req.body.searchCar);                                                                                                                                                                                                     
    DB.query(queries[0], queries[1], req.body.cam, req.body.searchHuman, req.body.searchCar, req.body.cam);//call DBsearch service to search in the DB.
    res.send(JSON.stringify((queries[0].length + queries[1].length) * req.body.cam.length));//send to the user the number of the results that he should wait
});
//***********************************************************************************************************************************/

//*******************************************************Send cameras list router****************************************************/
//The client call this route during it's upload for build it's camers list.
router.get('/getCameras', function(req, res, next) {    
    var x = new config()                                
    camList = x.getCamsMap();// Here the server get a map of cameras information. Then it create a list of cameras names. 
    var newList = []                                    
    for(i in camList){                                  
          newList.push(camList[i][0])                               
    }                                                   
     res.send(newList) //send the list of cameras names to the client.                               
});
//***********************************************************************************************************************************/

//**********************************************************KeepAlive router**********************************************************/
router.get('/status', function(req, res, next) {     
    var answer = 'OK'                                                                                
     res.send(answer);                                  
});  
//***********************************************************************************************************************************/

module.exports = router;
