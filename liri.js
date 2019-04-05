// Grab the package...
const axios = require('axios');
// const inquirer = require('inquirer');
const fs = require('fs');


require('dotenv').config();

 
// Take in the command line arguments and add it together for testing purposes
let view = "";
if (process.argv.length > 2){
  for(let i = 3; i < process.argv.length; i++){
   view += `${process.argv[i]}`
  }
}

// console.log(view)
const searchType = process.argv[2];

if(searchType === `movie-this` && !view){  
  view = "Mr Nobody"
}else if(searchType === `spotify-this-song` && !view) {
 view = "What's My Age Again"
}else{
  view = view
}


// **********************OMDB Movie info****************************
// const omdbKey = '54ed6069'
const queryOmdb = `http://www.omdbapi.com/?t=${view}&apikey=${process.env.OMDBKEY}`

// console.log(queryOmdb)
const movie = function(){
  axios.get(queryOmdb).then(function(response) {

    const title = response.data.Title
    const year = response.data.Year
    const country = response.data.Country
    const actors = response.data.Actors
    const IMDB = response.data.imdbRating
    // need to fix rotten tomatoes
    // const rotten = response.data
    const rotten = response.data.Ratings[1].Value
    const lang = response.data.Language
    const plot = response.data.Plot

    const movieInfo = function(){
      console.log(`Movie Title: ${title}`);
      console.log(`Year: ${year}`);
      console.log(`Country filmed: ${country}`);
      console.log(`Actors: ${actors}`);
      console.log(`IMDB Rating: ${IMDB}`);
      console.log(`Rotten Tomatoes Rating: ${rotten}`);
      console.log(`Language: ${lang}`);
      console.log(`Plot: ${plot}`);
    }

    
    // If the request was successful...
    if (response.status === 200) {    
      movieInfo();
      view = ""
     
    }    
  }); //Edn of axios
}//End of Then function



// ******************************Band Info*******************************
// See information @`http://www.artists.bandsintown.com/bandsintown-api`

const queryBand = `https://rest.bandsintown.com/artists/${view}/events?app_id=${process.env.BANDKEY}`


const band = function(){
  axios.get(queryBand).then(function(response) {

    const vname = response.data[0].venue.name
    const country = response.data[0].venue.country
    const city = response.data[0].venue.city
    const region = response.data[0].venue.region
 


    const bandInfo = function(){
      console.log(`Venue Name: ${vname}`);
      console.log(`Location: ${city}, ${region}, ${country}`);   
    }


    // console.log(queryBand)
    
    // If the request was successful...
    if (response.status === 200) {  
        bandInfo();
        view = "";
    }    
  }); //Edn of axios
}//End of Then function

 // *********************Spotify info*********************
const spot = function (view){
  // Get the node file
  var Spotify = require('node-spotify-api');
    // Password info
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET  
  });
  // console.log (spotify);
  // console.log(view);
   
  spotify.search({ type: 'track', query: `${view}`})
  
   .then(function(response) {
    const artist = response.tracks.items[1].album.artists[0].name
    const song = response.tracks.items[1].album.name
    const link = response.tracks.items[1].album.external_urls.spotify
    const album = response.tracks.items[1].name
    console.log(`Artist: ${artist}`);
    console.log(`Name of Song: ${song}`);
    console.log(`Preview Link: ${link}`);
    console.log(`Album: ${album}`);
    view = "";
  
   
    })
    .catch(function(err){
      console.log(err);
    });
  
  } //End of spot function

  // do what it says area



  // Includes the FS package for reading and writing packages

const doit = function(view){

// get information
fs.readFile('random.txt', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  // Break the string down by comma separation and store the contents into the output array.
  const output = data.split(',');

  // searchType = output[0];
  view = output[1];
  // console.log(view);
  // console.log(searchType);
  spot(view);
  // view = "";

});
}

// write to file
const logInfo = function () {

  // We will add the value to the bank file.
  fs.appendFile('log.txt', `${searchType}`, function(err) {
    if (err) {
      return console.log(err);
    }
  });

  fs.appendFile('log.txt', `, "${view}" ,`, function(err) {
    if (err) {
      return console.log(err);
    }
  });
  // We will then print the value that was added (but we wont print the total).
  // console.log(`Info on log ${searchType} & ${view}.`);
}


// Case switch to identify which API to call


switch(searchType){
  case `movie-this`:
  movie();
  break;
  case 'concert-this':
  band();
  break;
  case 'spotify-this-song':
  spot(view);
  break;
  case 'do-what-it-says':
  doit();
  break;
  default:        
  console.log ("Not Available")
};

logInfo();


