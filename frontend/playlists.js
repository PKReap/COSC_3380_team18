const host = "http://uhmusic.xyz/api/";

let currentUserID;


function createElement(tag, params) {
  const element = document.createElement(tag);
  const keys = Object.keys(params);
  for (let key of keys) {
    element[key] = params[key];
  }
  return element;
}

function getAllTracks() {
  const { UserID } = JSON.parse(localStorage.getItem("user"));
  currentUserID = UserID;
  const element = document.getElementById("TrackTable"); 
}

