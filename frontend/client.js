function validateUser(username, password) {
  const information = document.getElementById("information");
  $.ajax({
    url: "http://uhmusic.xyz/api/validateUser",
    type: "POST",
    data: JSON.stringify({ username, password }),
    success: (data) => {
      const validation = data.validation;
      information.innerHTML = JSON.stringify(validation);
    },
    error: (err) => {
      information.innerHTML = JSON.stringify(err);
    },
  });
  information.innerHTML = "validating...";
}


function createElement(tag, params) {
  const element = document.createElement(tag);
  for(let key in params) {
    element[key] = params[key];
  }
  return element;
}


function getAllUsers(){
  const element = document.getElementById("UserTable");
  $.ajax({
    url: "http://uhmusic.xyz/api/getAllUsers",
    type: "POST",
    data: {},
    success: (data) => {
      const { users } = data;
      element.innerHTML = "Name | ID | Type"
      users.forEach((user) => {
        const { Username, UserID , UserType } = user;
        const userElement = createElement("li", { innerHTML: `${Username} - ${UserID} - ${UserType}` });
        element.appendChild(userElement);
      });
    },
    error: (err) => {
      element.innerHTML = JSON.stringify(err);
    },
  });
}


function addTrackLibrary(TrackName, ArtistID, TrackLength, Rating, AvgRating, Genre, LibraryID){
  $.ajax({
      url: "http://uhmusic.xyz/api/addTrackLibrary",
      type: "POST",
      data: JSON.stringify({ TrackName, ArtistID, TrackLength, Rating, AvgRating, Genre, LibraryID }),
      success: (data) => {
        const { success, error } = data;
        console.log(error ? error : success);
      },
      error: (err) => {
        console.log(err);
      }
    });
}

