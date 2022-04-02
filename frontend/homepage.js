const host = "http://uhmusic.xyz/api/";

function createElement(tag, params) {
  const element = document.createElement(tag);
  const keys = Object.keys(params);
  for (let key of keys) {
    element[key] = params[key];
  }
  return element;
}

function getAllTracks(){
    const Trackstable = document.getElementById("TracksTable");
    $.ajax({
        url: `${host}getAllTracks`,
        type: "POST",
        data: JSON.stringify({}),
        success: (data) => {
            const { tracks } = data;
            tracks.forEach((track) => {
                const { TrackID, TrackName, Username, LibraryName, TrackGenre, TrackLength, AverageRating, Link } = track;
                const row = createElement("tr", {});
                const trackID = createElement("td", {});
                trackID.appendChild(
                    createElement("input", {
                        type: "checkbox",
                        value: TrackID,
                    })
                );
                const button = createElement("td", {});
                button.appendChild(
                    createElement("button", {
                        type: "button",
                        id: Link, innerHTML: "play",})
                );
                const columns = [
                    trackID,
                    createElement("td", { innerHTML: TrackName }),
                    createElement("td", { innerHTML:  LibraryName }),
                    createElement("td", { innerHTML: Username }),
                    createElement("td", { innerHTML: TrackGenre }),
                    createElement("td", { innerHTML: TrackLength }),
                    createElement("td", { innerHTML: AverageRating }),
                    button,
                ];
                columns.forEach((column) => {
                    row.appendChild(column);
                }
            );
            Trackstable.appendChild(row);

            });
        },
        error: (err) => {
            alert(JSON.stringify(err));
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
  getAllTracks();
});
