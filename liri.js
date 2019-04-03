// Grab the package...
const axios = require('axios');
// const inquirer = require('inquirer');

require('dotenv').config();

 
// Take in the command line arguments and add it together for testing purposes
let view = "";
if (process.argv.length > 2){
  for(let i = 3; i < process.argv.length; i++){
   view += `${process.argv[i]}`
  }
}
console.log(view)
const searchType = process.argv[2];



// **********************OMDB Movie info****************************
// const omdbKey = '54ed6069'
const queryOmdb = `http://www.omdbapi.com/?t=${view}&apikey=${process.env.OMDBKEY}`

// *********************Spotify info*********************
const spot = function (){
// Get the node file
var Spotify = require('node-spotify-api');
  // Password info
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET  
});
console.log (spotify);
console.log(view)
 
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

 
  })
  .catch(function(err){
    console.log(err);
  });

} //End of spot function

// GET `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_ID}&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09`

// ******************************Band Info*******************************
// See information @`http://www.artists.bandsintown.com/bandsintown-api`

const queryBand = `https://rest.bandsintown.com/artists/${view}/events?app_id=${process.env.BANDKEY}`

// https://rest.bandsintown.com/artists/jason%20mraz/events?app_id=dsdf&date=4%2F1%2F2019
  
//*******************Variables*********************** 
    let select = "";

    console.log(view)
    console.log(searchType)


// Case switch to identify which API to call


      switch(searchType){
        case `movie-this`:
        select = queryOmdb;
        break;
        case 'concert-this':
        select = queryBand;
        // console.log(queryBand);
        break;
        case 'spotify-this-song':
        spot();
        break;
        case 'do-what-it-says':
        spot();
        break;
        default:        
        console.log ("Not Available")
      };
  
      console.log(select);
     
axios.get(select).then(function(response) {

    const title = response.data.Title
    const year = response.data.Year
    const country = response.data.Country
    const actors = response.data.Actors
    const IMDB = response.data.imdbRating
    // need to fix rotten tomatoes
    const rotten = response.data.Ratings[2].source
    const lang = response.data.Language
    const plot = response.data.Plot

    const movieInfo = function(response){
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
      // Then log the data from the site!
      
      if (select = queryOmdb){
        movieInfo();
      } else {
         console.log(response.data);
      }

      
      // console.log(response.data);
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