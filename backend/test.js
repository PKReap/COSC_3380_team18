const axios = require("axios");
const fs = require("fs");


const password = "Password123";
const usernames = ["Admin1", "User1", "Artist1"];
const hash = require("crypto")

// sha256 hash the salted password
usernames.forEach(username => {
  const saltedPassword = (password + username).repeat(32);
  const hash = require("crypto").createHash("sha256")
  hash.update(saltedPassword);
  const hashedPassword = hash.digest("hex");
  console.log(username,hashedPassword);
})
// // read the sound.mp3 file
// 
// 
// 
// axios
//   .post("http://uhmusic.xyz/api/validateUser", {
//     username: "User",
//     password: "Password123",
//   })
//   .then(function (response) {
//     const { validation , username, userType } = response.data;
//     console.log(validation , username, userType);
//   });
