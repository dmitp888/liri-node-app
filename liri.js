require("dotenv").config();
var axios = require("axios");
var moment = require('moment');
var fs = require('fs');

var spotify = require('node-spotify-api');
var keys = require("./keys.js");

var spotify = new spotify(keys.spotify);
 
var liricommand= process.argv[2];
var songname = process.argv[3];

if ( liricommand  === "spotify-this-song"&& songname){
spotify.search({ type: 'track', query:songname, limit:4  }, function (err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
console.log("Track name: " + data.tracks.items[1].album.name); 
console.log("Artist name: "+ data.tracks.items[1].album.artists[0].name); 
console.log (data.tracks.items[1].album.external_urls);
});
}else if ( liricommand  === "spotify-this-song" ){
  spotify.search({ type: 'track', query:"the sign  ace of base", limit:4  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  console.log("Track name: " + data.tracks.items[1].album.name); 
  console.log("Artist name: "+ data.tracks.items[1].album.artists[0].name); 
  console.log (data.tracks.items[1].album.external_urls);
  });
  
}

     var artist = process.argv[3];
     var queryurlvenue="https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
     if ( liricommand  === "concert-this"){
  console.log(queryurlvenue);
  axios.get(queryurlvenue)
  .then  ( function (response) {
    //enter artist's name in quotes Celine Dion
    //console.log(response.data);
    console.log("Name of the venue: "+ response.data[0].venue.name);
    console.log("Location: "+response.data[0].venue.city + " "+ response.data[0].venue.region +", "+ response.data[0].venue.country);
    console.log("Date of the Event: "+ moment(response.data[0].datetime).format("MM/DD/YYYY"));
  }
  )};
  var movie = process.argv[3];
  var movieurl= "http://www.omdbapi.com/?t="+movie+"+&y=&plot=short&apikey=trilogy";                
  if ( liricommand  === "movie-this"&& movie     ){
    axios.get(movieurl).then(
  function movie (response){
  console.log("Title of the movie: "+response.data.Title);
  console.log("Year of the movie: "+response.data.Year);
  console.log("IMDB Rating: "+response.data.imdbRating);
  console.log("Rotten Tomatoes Rating: "+response.data.Metascore);
  console.log("Country: "+response.data.Country);
  console.log("Language: "+response.data.Language);
  console.log("Plot: "+response.data.Plot);
  console.log("Actors: "+response.data.Actors);
    } 
    )}else if ( liricommand  === "movie-this" ) {
axios.get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy").then(
  function(response){
  console.log("Title of the movie: "+response.data.Title);
  console.log("Year of the movie: "+response.data.Year);
  console.log("IMDB Rating: "+response.data.imdbRating);
  console.log("Rotten Tomatoes Rating: "+response.data.Metascore);
  console.log("Country: "+response.data.Country);
  console.log("Language: "+response.data.Language);
  console.log("Plot: "+response.data.Plot);
  console.log("Actors: "+response.data.Actors);
    })
    };
    if( liricommand  ==='do-what-it-says'){
      fs.readFile("random.txt","utf8", function(error,data){
        if (error) {
          return console.log(error);
        } var data = data.split(",");
        console.log(data);
        //spotify
          if (data[0] === "spotify-this-song") {
             songname=data[1];
             //console.log(songname);
             spotify.search({ type: 'track', query:songname, limit:4  }, function (err, data) {
              if (err) {
                return console.log('Error occurred: ' + err);
              }
            console.log("Track name: " + data.tracks.items[1].album.name); 
            console.log("Artist name: "+ data.tracks.items[1].album.artists[0].name); 
            console.log (data.tracks.items[1].album.external_urls);
            });};
      
            //movies
            if (data[2] === "movie-this") {
              movie=data[3];
              //console.log(movie);
             }
             var movieurl= "http://www.omdbapi.com/?t="+movie+"+&y=&plot=short&apikey=trilogy";                
             axios.get(movieurl).then(
              function movie (response){
              console.log("Title of the movie: "+response.data.Title);
              console.log("Year of the movie: "+response.data.Year);
              console.log("IMDB Rating: "+response.data.imdbRating);
              console.log("Rotten Tomatoes Rating: "+response.data.Metascore);
              console.log("Country: "+response.data.Country);
              console.log("Language: "+response.data.Language);
              console.log("Plot: "+response.data.Plot);
              console.log("Actors: "+response.data.Actors);
                } 
                )
          
            })}






    