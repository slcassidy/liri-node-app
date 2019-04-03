// Grab the package...
const axios = require('axios');
const inquirer = require('inquirer');
var Spotify = require('node-spotify-api');
require('dotenv').config();

 
// Take in the command line arguments and add it together for testing purposes
let view = "";
if (process.argv.length > 2){
  for(let i = 2; i < process.argv.length; i++){
   view += `${process.argv[i]}+`
  }
}
console.log(view)
const search = process.argv[2];

// // OMDB Movie info
// const omdbKey = '54ed6069'
// const queryOmdb = `http://www.omdbapi.com/?t=${view}&apikey=${omdbKey}`




// spot();


// Questions to the user

// TURN BACK ON TOP HERE

inquirer
  .prompt([
    // Ask them from a list what they want to search for
    {
      type: 'list',
      message: 'What search category would you like to choose?',
      choices: [`Songs`, `Bands`, `Movies`],
      name: 'type'
    },
    // Here we ask the user to confirm.
    {
      type: 'confirm',
      message: 'Are you sure:',
      name: 'confirm',
      default: true
    },
        // Here we create a basic text prompt.
        {
          type: 'input',
          message: 'What would you like to search for today?',
          name: 'search'
        }   


  ])
  .then(function(inquirerResponse) {

// **********************OMDB Movie info****************************
const omdbKey = '54ed6069'
const queryOmdb = `http://www.omdbapi.com/?t=${inquirerResponse.search}&apikey=${omdbKey}`

// *********************Spotify info*********************
var spotify = new Spotify({
  id: `d8fcfd25d62f4c4ca3229309b1eadfa0`,
  secret: `00957c2529fa4503a98fbb8157033187`
});
 
const spot = function (){spotify.search({ type: 'artist', query: inquirerResponse.search}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  } 
  console.log(data); 
});}

// ******************************Band Info*******************************
// See information @`http://www.artists.bandsintown.com/bandsintown-api`
// const bandKey = `a82fff4c825d9e10fbbf493b27f5c643`
// const queryBand = ``https://rest.bandsintown.com/artists/${inquirerResponse.search}?app_id=${bandKey}`
// 

  
//*******************Variables*********************** 
    let select = "";
    // view = inquirerResponse.search
    console.log(inquirerResponse.search)
    console.log(inquirerResponse.type)


// Case switch to identify which API to call


      switch(inquirerResponse.type){
        case `Movies`:
        select = queryOmdb;
        break;
//         case 'Bands':
//         select = queryBand;
//         break;
          case 'Songs':
          spot();
          break;
        default:
        console.log ("Not Available")
      };

     
  axios.get(select).then(function(response) {
    // If the request was successful...
    if (response.status === 200) {    
      // Then log the data from the site!
      console.log(response.data);
    }    
  }); //Edn of axios

 //End of Then function

// TURN BACK ON BOTTOM





// // Run the get method for the OMDB to identify Movies
// axios.get(queryOmdb).then(function(response) {

//   // If the request was successful...
//   if (response.status === 200) {

//     // Then log the data from the site!
//     console.log(response.data);
//   }

});