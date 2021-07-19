//************************************************************Global section***********************************************************/
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
 
//**********************************************************Query router**********************************************************/
router.post('/query', function(req, res, next) {
    var myAssistant = new assistant();
    var DB = new dbSearcher();
    let queries = myAssistant.createQueriesArray(new Date(req.body.start), new Date(req.body.end), req.body.make, req.body.model, 
                                                    req.body.color, req.body.carType, req.body.shirtColor, req.body.pantsColor, 
                                                    req.body.searchHuman, req.body.searchCar);                                                                                                                                                                                                     
    DB.query(queries[0], queries[1], req.body.cam, req.body.searchHuman, req.body.searchCar, req.body.cam);
    res.send(JSON.stringify((queries[0].length + queries[1].length) * req.body.cam.length));
});

//*******************************************************Send cameras list router******************************************************/
router.get('/getCameras', function(req, res, next) {    //
    var x = new config()                                //
    camList = x.getCamsMap();                           // Here the server get a list of 
    var newList = []                                    // camera names and send it to UI.
    for(i in camList){                                  //
          newList.push(camList[i][0])                               // *the UI call this rout during 
    }                                                   //  it's upload for build it's 
     res.send(newList)                                  //  camers list.
});

router.get('/status', function(req, res, next) {     
    var answer = 'OK'                                                                                
     res.send(answer);                                  
});  

module.exports = router;