require('./db');
const { db } = require('./carsSchema');
//This function is a service that in charge of the search in the DB.
class DBsearch{
    DBsearch(){}
    /*This function gets queries array and for each query it create an asynchronous promise that call the search 
    function with it's own query. In this way we create multiple promisses that runs in parallel and each one
    in charge on it's own part of the client's query. */ 
    query(humanQueries, carQueries, cameras, searchHuman, searchCar, camNames){
        let counter = 0;
        cameras.forEach(j => {//Here we create the promisses.
                if(searchHuman){
                    for(let i=0; i<humanQueries.length;i++){
                        (new Promise((resolve, reject) => {
                            if(search(humanQueries[i], j + '_person', camNames[counter]))
                                resolve("works")
                            else
                                reject(new Error("Error"))    
                        }));
                    }
                }
                if(searchCar){
                    for(let i=0; i<carQueries.length;i++){
                        (new Promise((resolve, reject) => {
                            if(search(carQueries[i], j + '_vehicle', camNames[counter]))
                                resolve("works")
                            else
                                reject(new Error("Error"))    
        
                        }));
                    }
                }
            counter++;   
        });
        //Each promise call this function with it's own query. This function connects to the DB and searching by the query for the specific data. 
        async function search(query, currentCollection, camName){
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017";
            MongoClient.connect(url, {useUnifiedTopology: true},  async function(err, db) {
                if (err) throw err;
                var dbo = db.db("AS-metaData");
                dbo.collection(currentCollection).find(query).toArray( async function(err, result) {  
                    if (err) throw err; 
                    if(result.length > 0){
                        let res = {}; 
                        res['camName'] = camName;  
                        res['result'] = result;                                              
                        io.to(id).emit("FromAPI", res);     
                    }else{
                        io.to(id).emit("FromAPI", "no results");
                    }                      
                })
            });
        }
    }
}    
module.exports = DBsearch;
