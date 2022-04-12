const host = "http://uhmusic.xyz/api/";
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
    "Image",
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
          data: JSON.stringify({
            playlistID: playlist.PlaylistID,
            username: "User1",
          }),
          success: (data) => {
            const { tracks } = data;
            const table = createTableHeaders();
            const tbody = createElement("tbody", {});
            tracks.forEach((track) => {
              const {
                TrackID,
                TrackName,
                ArtistName,
                LibraryName,
                TrackGenre,
                Link,
                Rating,
                IMG,
              } = track;
              const tr = createElement("tr", {});
              const checkbox = createElement("input", {
                type: "checkbox",
                value: TrackID,
              });
              const audio = createElement("audio", {
                controls: true,
                src: Link,
              });
              const ratingSelection = createElement("select", {
                id: TrackID,
              });
              const options = [0, 1, 2, 3, 4, 5];
              options.forEach((option) => {
                const optionElement = createElement("option", {
                  value: option,
                  innerHTML: option,
                });
                ratingSelection.appendChild(optionElement);
              });

              ratingSelection.addEventListener("change", function () {
                const { value } = this;
                const trackID = TrackID
                $.ajax({}).then(() => {})
              })

              const img = createElement("img", {
                src: IMG,
              });
              const tdCheckbox = createElement("td", {});
              const tdRating = createElement("td", {});
              const tdIMG = createElement("td", {});
              tdIMG.appendChild(img);
              // shrink the image
              img.style.width = "120px";
              img.style.height = "120px";
              tdCheckbox.appendChild(checkbox);
              tdRating.appendChild(ratingSelection);
              const columns = [
                tdCheckbox,
                createElement("td", { innerHTML: TrackName }),
                createElement("td", { innerHTML: LibraryName }),
                createElement("td", { innerHTML: ArtistName }),
                createElement("td", { innerHTML: TrackGenre }),
                tdRating,
                tdIMG,
                audio,
              ];
              columns.forEach((column) => {
                tr.appendChild(column);
              });
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
