require('./db');
const { db } = require('./carsSchema');

class DBsearch{
    DBsearch(){}
    query(humanQueries, carQueries, cameras, searchHuman, searchCar, camNames){
        let counter = 0;
        cameras.forEach(j => {
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
        async function search(query, currentCollection, camName){
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017";
            MongoClient.connect(url, {useUnifiedTopology: true},  async function(err, db) {
                if (err) throw err;
                var dbo = db.db("AS-metaData");//set DB name
                dbo.collection(currentCollection).find(query).toArray( async function(err, result) {  
                    if (err) throw err; 
                    if(result.length > 0){
                        //console.log(currentCollection, ": " ,result.length);
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