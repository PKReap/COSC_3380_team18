const axios = require("axios");
const fs = require("fs");

// read the sound.mp3 file



axios
  .post("http://uhmusic.xyz/api/validateUser", {
    username: "User",
    password: "Password123",
  })
  .then(function (response) {
    const { validation , username, userType } = response.data;
    console.log(validation , username, userType);
  });
