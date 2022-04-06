const host = "http://localhost:3000/api/";
function createElement(tag, params) {
  const element = document.createElement(tag);
  const keys = Object.keys(params);
  for (let key of keys) {
    element[key] = params[key];
  }
  return element;
}

function makeCollapsible() {
  const coll = document.getElementsByClassName("collapsible");

  for (const element of coll) {
    element.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}

function createTableHeaders() {
  const table = createElement("table", {});
  const thead = createElement("thead", {});
  const columns = [
    "Selection",
    "Track Name",
    "Album",
    "Artist",
    "Genre",
    "Rating",
    "Play",
  ];
  columns.forEach((column) => {
    const th = createElement("th", { innerHTML: column });
    thead.appendChild(th);
  });
  table.appendChild(thead);
  return table;
}

function getAllLibraries() {
  $.ajax({
    url: `${host}userGetAllPlaylists`,
    type: "POST",
    data: JSON.stringify({ username: "User1" }),
    success: (data) => {
      const { playlists } = data;
      console.log(playlists);
      playlists.forEach((playlist) => {
        const button = createElement("button", {
          innerHTML: playlist.PlaylistName,
          className: "collapsible",
        });
        const div = createElement("div", {
          className: "content",
          id: "table-wrapper",
        });
        $.ajax({
          url: `${host}getAllTracksForPlaylist`,
          type: "POST",
          data: JSON.stringify({ playlistID: playlist.PlaylistID }),
          success: (data) => {
            const { tracks } = data;
            const table = createTableHeaders();
            const tbody = createElement("tbody", {});
            tracks.forEach((track) => {
              const {TrackID, TrackName, ArtistName, LibraryName, TrackGenre, Link, Rating} = track;
              const tr = createElement("tr", {});
              const checkbox = createElement("input", {
                type: "checkbox",
                value: TrackID,
              });
              const audio = createElement("audio", {
                controls: true,
                src: Link,
              });

              const columns = [
                checkbox,
                createElement("td", { innerHTML: TrackName }),
                createElement("td", { innerHTML: LibraryName }),
                createElement("td", { innerHTML: ArtistName }),
                createElement("td", { innerHTML: TrackGenre }),
                createElement("td", { innerHTML: Rating }),
                audio,
              ];
              columns.forEach((column) => {
                tr.appendChild(column);
              }
              );  
              tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            div.appendChild(table);
          },
        });
        document.body.appendChild(button);
        document.body.appendChild(div);
      });
    },
    error: (err) => {
      alert(JSON.stringify(err));
    },
  }).then(() => {
    makeCollapsible();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getAllLibraries();
});
