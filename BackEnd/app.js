//********************************************Global section***********************************************/
require('./db/db');
var createError = require('http-errors');
var path = require('path');
var config = require('./configService');
var indexRouter = require('./routes/api');
var camList = new Map()
const EventEmitter = require('events');
  EventEmitter.defaultMaxListeners = 50;
const express = require('express');
const session = require('express-session');
const { db } = require('./db/carsSchema');
const PORT = 3000;//port initialize.
const app = express();

var cors = require('cors')
app.use(cors())

//-------------------------------------------enable sessions------------------------------------------------
app.use(session({
  secret:"somesecretkey",
  resave: false, // Force save of session for each request
  saveUninitialized: false, // Save a session that is new, but has not been modified
  cookie: {maxAge: 10*60*1000 } // milliseconds!
}));
//----------------------------------------------------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
app.set('view engine', 'ejs'); 
app.use('/', indexRouter);
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

const http = require('http');
const server = http.createServer(app);
 global.io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
//*********************************************************************************************************/

//-------------------------------------------run services---------------------------------------------------
function execute(command) {
  const exec = require('child_process').exec

  exec(command, (err, stdout, stderr) => {
    process.stdout.write(stdout)
  })
}
//----------------------------------------------------------------------------------------------------------

//********************************************Listener to the port*****************************************/
global.id ;

io.on("connection", (socket) => {
  id=socket.id;
  console.log("New client connected",id);
  
   socket.on("disconnect", () => {
     console.log("Client disconnected");
   });
});


//This section sets the cameras list and create DB collections when the server is up.
server.listen(PORT, () => {
  console.log('server is running on port ' + PORT);
  var expire = 60*60*24*7*12; //define for how many any meta data will be stored in the DB.
  var x = new config()
  x.createCamsMap(); 
  camList = x.getCamsMap();
  for(i in camList){
      if(camList[i][1] == 1){ //if isHuman
        db.createCollection(camList[i][0] + '_person', function(err, collection) {});
        db.collection(camList[i][0]+ '_person').createIndex({"timestamp":1}, {expireAfterSeconds: expire})
      }
      if(camList[i][2] == 1){// if isCar
        db.createCollection(camList[i][0] + '_vehicle', function(err, collection) {});
        db.collection(camList[i][0]+ '_vehicle').createIndex({"timestamp":1}, {expireAfterSeconds: expire})
      } 
  }

  execute('npm run consume')
})

var api = require('./routes/api');
api.route

module.exports = server;