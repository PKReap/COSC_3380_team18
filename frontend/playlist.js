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
      playlists.forEach((playlist) => {
          const button = createElement("button", {
            innerHTML: playlist.PlaylistName,
            className: "collapsible",
          });
            const div = createElement("div", {
                className: "content",
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
