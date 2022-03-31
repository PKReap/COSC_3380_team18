const host = "http://uhmusic.xyz/api/";

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
  const element = document.getElementById("TrackTable");
  $.ajax({
    url: `${host}getAllTracks`,
    type: "POST",
    data: JSON.stringify({ UserID }),
    success: (data) => {},
    error: (err) => {},
  });
}
