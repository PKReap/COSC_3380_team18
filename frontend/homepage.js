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
  const Trackstable = document.getElementById("TracksTable");
  $.ajax({
    url: `${host}getAllTracks`,
    type: "POST",
    data: JSON.stringify({}),
    success: (data) => {
      const { tracks } = data;
      tracks.forEach((track) => {
        const {
          TrackID,
          TrackName,
          Username,
          LibraryName,
          TrackGenre,
          TrackLength,
          AverageRating,
          Link,
        } = track;
        const row = createElement("tr", {});
        const trackID = createElement("td", {});
        trackID.appendChild(
          createElement("input", {
            type: "checkbox",
            value: TrackID,
          })
        );

        const audiotd = createElement("td", {});
        audiotd.appendChild(
          createElement("audio", {
            controls: true,
            src: Link,
          })
        );
        const columns = [
          trackID,
          createElement("td", { innerHTML: TrackName }),
          createElement("td", { innerHTML: LibraryName }),
          createElement("td", { innerHTML: Username }),
          createElement("td", { innerHTML: TrackGenre }),
          createElement("td", { innerHTML: AverageRating }),
          audiotd,
        ];
        columns.forEach((column) => {
          row.appendChild(column);
        });
        Trackstable.appendChild(row);
      });
    },
    error: (err) => {
      alert(JSON.stringify(err));
    },
  });
}

const playlistbutton = document.getElementById("create-playlist-button");

playlistbutton.addEventListener("click", () => {
  const tracksTable = document.getElementById("TracksTable");
  const selectedTracks = tracksTable.querySelectorAll("input:checked");
  const playlistName = document.getElementById("playlist-name").value;
  const userID = 2;
  $.ajax({
    url: `${host}insertTrackIntoPlaylist`,
    type: "POST",
    data: JSON.stringify({
      userID,
      playlistName,
      trackIDs: Array.from(selectedTracks).map((track) => parseInt(track.value)),
    }),
    success: (data) => {
      alert(JSON.stringify(data));
    },
    error: (err) => {
      alert(JSON.stringify(err));
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  getAllTracks();
});
