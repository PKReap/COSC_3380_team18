const axios = require("axios");
const fs = require("fs");

// read the sound.mp3 file
const sound = fs.readFileSync("./sound.mp3");
const b64Music = Buffer.from(sound).toString("base64");
const IMG = fs.readFileSync("./nessfire.jpg");
const b64IMG = Buffer.from(IMG).toString("base64");


axios
  .post("http://uhmusic.xyz/api/userRatesTrack", {
    username: "User1",
    trackID: 1,
    rating: 5,
  })
  .then(function (response) {
    const { success } = response.data;
    console.log(success);
  });
