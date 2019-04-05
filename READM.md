
#Project Liri
*(aka Language Speech Interpretation and Recognition Interface)*

Allows users to searh for bands, song titles, and movies using the following commands:

   * `concert-this`
        Finds Venue information
   * `spotify-this-song`
        Provides song detail
   * `movie-this`
        Provides movie information
   * `do-what-it-says`
        Reads information from a txt file called "random.txt"

These functions allow for the selection critera to enter in information.

1. You can start using the features by downloading the following functions that are located in the package.json using "npm i":

   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

   * [DotEnv](https://www.npmjs.com/package/dotenv)
2. Get an key account information from the following sites:



***********************Testing ****************
node liri.js movie-this
node liri.js movie-this "star trek"
node liri.js spotify-this-song "beat it"
node liri.js spotify-this-song
node liri.js concert-this "jason mraz" 
node liri.js do-what-it-says

