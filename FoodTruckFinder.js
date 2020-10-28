/**
 * Summary. Executable Nodejs file to generate list of available food trucks
 *
 * Description. Script gathers food truck data from API, filters by business hours 
 * and displays in alphabetical order in pages of 10 at a time
 * 
 * @file   FoodTruckFinder.js
 * @author -
 */

const request = require('request');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
* Method generates new date object with current time
* @method getCurrentTime
* @return {Date} timeObj
*/
const getCurrentTime = function(){
    let timeObj = new Date();
    return timeObj;
};

/**
* Method defines condition to filter day of week
* @method filterDayOfWeek
* @return {bool} 
*/
const filterDayOfWeek = function(trucks){
    return trucks.dayorder == this;
}

/**
* Method defines condition to filter Trucks by time of day
* @method filterTimeOfDay
* @param {Object} truck
* @return {bool} 
*/
const filterTimeOfDay = function(trucks){
    let startTime = new Date()
    let endTime = new Date()
    trucks.start24 = trucks.start24.split(":")
    trucks.end24 = trucks.end24.split(":")
    startTime.setHours(trucks.start24[0],trucks.start24[1],0);
    endTime.setHours(trucks.end24[0],trucks.end24[1],0);
    return (this > startTime  && this < endTime)
}

/**
* Method filters List of trucks by day and time returns trucks fitting criteria
* @method getEligibleTrucks
* @param {Array} truckList
* @return {Array} eligibleTrucks
*/
const getEligibleTrucks = function(truckList){
    let currTime = getCurrentTime();
    let eligibleTrucks = truckList.filter(filterDayOfWeek, currTime.getDay());
    eligibleTrucks = eligibleTrucks.filter(filterTimeOfDay, currTime);
    return eligibleTrucks;
}

/**
* Method sorts truck list in ascending alphabetiacal order, returns sorted list
* @method sortTrucks
* @param {Array} trucks
* @return {Array} trucks
*/
const sortTrucks = function(trucks){
    trucks.sort(function(a,b){
        if(a.applicant < b.applicant){return -1}
        if(a.applicant > b.applicant){return 1}
        return 0;
  })
  return trucks;
}

/**
* Method prints one page of truck data to the console, no output
* @method printPage
* @param {Array} trucks
* @return N/A
*/
const printPage = function(trucks){
    let pageLength = 10;
    for(let i = 0; i < pageLength; i++){
        if(trucks.length == 0){
            break;
        }
        console.log(trucks[0].applicant);
        console.log(trucks[0].location);
        console.log();
        trucks.shift();
    }
}

/**
* Recursive method handles user input, based on user input will call to genertate next page
* @method userInput
* @param {Array} sortedList
* @return N/A
*/
const userInput = function(sortedList){
    printPage(sortedList);
    if(sortedList.length != 0){
    console.log("___________________")
    readline.question('Press any key followed by ENTER to proceed to next page (N to discontinue)', userInput => {
        if(userInput == 'N' || sortedList.length < 1){
            console.log("Closing Food Truck List")
            readline.close();
        }else{
            console.log("");
            inputContinue(sortedList);
        }
      });
    }else{
        console.log("End of List")
        readline.close();
    }
}
//userInput method reference created to run method recursivley
let inputContinue = userInput;

/**
* Service call, Initiates execution, 
*/
request('http://data.sfgov.org/resource/bbb8-hzi6.json', function (error, response, body) {
    if(response.statusCode == 200 || response.statusCode == 202){
        body = JSON.parse(body);
        let sortedTrucks =  sortTrucks(getEligibleTrucks(body));
        userInput(sortedTrucks);
    }else{
        console.log("Data retrieval error occured: "+error);
        console.log("code: "+response.statusCode );
    }
});
