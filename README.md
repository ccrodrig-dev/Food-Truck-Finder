# Food-Truck-Finder

CONTENTS OF THIS FILE
---------------------

 * About this Program
 * Requirements
 * Running Program
 * How to Use


ABOUT THIS PROGRAM
------------------
The San Francisco government’s website has a public data source of food trucks (https://data.sfgov.org/Economy-and-Community/Mobile-Food-Schedule/jjew-r69b). The data can be accessed in a number of forms, including JSON, CSV, and XML. How you access the data is up to you, but you can find some useful information about making an API request to this data source here (https://dev.socrata.com/foundry/data.sfgov.org/jjew-r69b).

This command line program prints out a list of food trucks that are open at the current date and current time, when the program is being run. If the program is run at noon on a Friday, the program will print a list of all the food trucks that are open then.

The program displays 10 trucks per page. That is: if there are more than 10 food trucks open, the program should display the first 10, then wait for input from the user before displaying the next 10 (or fewer if there are fewer than 10 remaining), and so on until there are no more food trucks to display. 

The program displays the name and address of the trucks and sorts the output alphabetically by name.


REQUIREMENTS
------------
This is a Nodejs Script and requires node and npm installation prior to running
Once npm and nodejs are installed, please access directory in which 'FoodTruckFinder.js' 
resides through the terminal. 

you will need to install the 'request' and 'readline' packages

Once within the directory you may simultaniously install the packages and run the script
with the following line:


npm install request && npm install readline &&  node FoodTruckFinder.js 



RUNNING PROGRAM
---------------
Once the packages are installed you may invoke the script with the following line
(must be within directory where FoodTruckFinder.js resides):


node FoodTruckFinder.js 


HOW TO USE
------------
When Script is run, script will make call, and generate first page of trucks
you may proceed to the next page by entering any key followed by the ENTER key
If you wish to end execution you may enter uppercase N followed by ENTER key to 
terminate program