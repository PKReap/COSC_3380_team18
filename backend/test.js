const axios = require("axios");
const fs = require("fs");

// read the sound.mp3 file
const sound = fs.readFileSync("./sound.mp3");
const b64 = Buffer.from(sound).toString("base64");

axios
  .post("http://localhost:3000/api/upload", {
    b64,
    name: "f.mp3",
  })
  .then(function (response) {
    const { success } = response.data;
    console.log(success);
  });
