var http = require('http');
var fs = require('fs');

//This class is an assistat service that creates queries array.
class webAssistant{
    //This function gets two dates and return the difference between them in minutes.
    getDifference(from, until){
        let s = new Date(from);
        let t = new Date(until); 
        var diffMs = (t - s); 
        var diffMins = Math.floor((diffMs/1000)/60);
        return diffMins;   
    }
    /*This function gets two dates and create an array of 10 dates, when the first is the begining date (from),
    the last is the end date (until), and in the middle another 8 dates when each one is the one before 
    him + (difference between the begining and the end in minutes  /  10).*/
    getTimesArray(from, until){
        let dif = this.getDifference(from,until);
        let t = []
        while(true){
            t.push(new Date(from));
            from.setMinutes(from.getMinutes() + (dif/10));
            if(+from > +until){
                t.push(new Date(until));
                break;
            }
        }
        return t;
    }
    //This function gets the human properties that the user searched for and creates a humen query.
    createHumanQuery(shirtColor,pantsColor, startTime, endTime){                                                                                 
        var humanQuery = {};                                                                                
        if(shirtColor !== 'any' && pantsColor !== 'any'){humanQuery = {$and:[ {$or: [ {shirtColor1: shirtColor }, { shirtColor2: shirtColor }]},
            {$or: [ {pantsColor1: pantsColor }, { pantsColor2: pantsColor }]}]}} 
        else if(shirtColor !== 'any' ){
            humanQuery = {$or: [ {shirtColor1: shirtColor }, { shirtColor2: shirtColor }]}
        }         
        else if(pantsColor !== 'any'){
            humanQuery = {$or: [ {pantsColor1: pantsColor }, { pantsColor2: pantsColor }]}
        } 
        humanQuery.timestamp = {$gte:startTime, $lte:endTime} 
        return humanQuery;
    }
    //This function gets the car properties that the user searched for and creates a car query.
    createCarQuery(make,model,color,carType, startTime, endTime){
        var carQuery = {};                                                                        
        if(make !== 'any'){carQuery.make = make;}                   
        if(model !== 'any'){carQuery.model = model;}                          
        if(color !== 'any'){carQuery.color = color;}
        if(carType !== 'any'){carQuery.carType = carType;}
        carQuery.timestamp = {$gte:startTime, $lte:endTime} 
        return carQuery;
    }
    /*This function gets all the data from the search of the user and uses the other functions of this class to
    return an array of queries.*/
    createQueriesArray(from,until,make, model, color, carType, shirtColor, pantsColor, searchHuman, searchCar){
        let t = this.getTimesArray(from,until);
        let queries = [[],[]];
        for(let i=0; i<t.length -1;i++){
            if(searchHuman){
                queries[0].push(this.createHumanQuery(shirtColor,pantsColor, t[i], t[i+1]))
            }
            if(searchCar){
                queries[1].push(this.createCarQuery(make,model,color,carType, t[i], t[i+1]));
            }
        }
        return queries; 
    }
}

module.exports = webAssistant;
