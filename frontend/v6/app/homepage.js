function createElement(tag, params) {
    const element = document.createElement(tag);
    const keys = Object.keys(params);
    for (let key of keys) {
      element[key] = params[key];
    }
    return element;
  }
  
if (localStorage.getItem('uh-music-username') == null || !localStorage.getItem('uh-music-password') == null || !localStorage.getItem('uh-music-username') == null)
{

    window.location.replace("login.html")
}
else{
    var username = localStorage.getItem("uh-music-username")
    var password = localStorage.getItem("uh-music-password")
    var userType = localStorage.getItem('uh-music-userType')

    // if(userType == 'Admin'){
    //     window.location.replace("") //Admin Page

    // }
    fetch("https://uhmusic.xyz/api/validateUser", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: `{\r\n    \"username\": \"${username}\",\r\n    \"password\": \"${password}\"\r\n}`,
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((data) => {
            data = JSON.parse(data)
            console.log(data)
            if(data.validation != true){
                localStorage.clear();
                window.location.replace("login.html")
            }
        })
        .catch((error) => console.log("error", error));
}




// Modal
// Retrieve DOM Elements
const modal = document.querySelector("#modal-base");
const closeModal = document.querySelector(".close-modal");

const musicModal = document.querySelector("#modal-music");
const playlistModal = document.querySelector("#modal-playlist");
const myPlaylistModal = document.querySelector("#modal-my-playlist");
const myPlaylistSongModal = document.querySelector("#modal-my-playlist-song");
const mySongModal = document.querySelector("#modal-my-song");

const modalUploadBtn = document.querySelector("#modal-upload-btn");
const modalPlaylistBtn = document.querySelector("#modal-playlist-btn");
const modalMyPlaylistBtn = document.querySelector("#modal-my-playlist-btn");
const modalMySongBtn = document.querySelector("#modal-songs-btn");

const heartBtn = document.querySelector(".heart-modal-btn");
const uploadBtn = document.querySelector("#music-form");
var starElements = document.querySelectorAll(".fa-star");

const logoutBtn = document.querySelector(".logout-btn")

const serachInput = document.getElementById("search-input");

serachInput.addEventListener("keyup", (e) => {
    
	if(e.keyCode === 13){    
    const searchContainer = document.getElementById("search-table");
    removeAllChildNodes(searchContainer);
    

        
        const searchSelected = document.getElementById("search-select").value;
        const searchInputValue = document.getElementById("search-input").value;
        let searchUrl;
        let obj;
        if(searchSelected == "Artist"){
            obj = `{\r\n    \"artistName\": \"${searchInputValue}\"\r\n}`
            searchUrl = "https://uhmusic.xyz/api/getAllTracksFromArtist"
        }
        else if(searchSelected == "Album"){
            obj = `{\r\n    \"libraryName\": \"${searchInputValue}\"\r\n}`
            searchUrl = "https://uhmusic.xyz/api/getAllTracksForLibrary"
        }
        else if(searchSelected == "Genre"){
            obj = `{\r\n    \"genre\": \"${searchInputValue}\"\r\n}`
            searchUrl = "https://uhmusic.xyz/api/getAllTracksByGenre"
        }
        fetch(searchUrl, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: obj,
            redirect: "follow",
        })
            .then((response) => response.text())
            .then((data) => {
                const tracks = JSON.parse(data).tracks;
                for(let i = 0; i <  tracks.length;i++){
                    const list_item = createElement("li", {
                        className: "list-item"
                    })
                    const main_con = createElement("div", {
                        className: "r-main-con",
                        id: tracks[i].trackID
                    })
                    const img_con = createElement("div", {
                        className: "r-img-con"
                    })
                    img_con.style.backgroundImage = `url(${tracks[i].IMG.replace(" ", "%20")})`;

                    const track_con = createElement("div", {
                        className: "r-track-con",
                        id: tracks[i].TrackID
                    });
                    const sn_con = createElement("div", {
                        className: "r-sn-con",
                        innerHTML: tracks[i].TrackName
                    })
                    const l_con = createElement("div", {
                        className: "r-l-con",
                        innerHTML: tracks[i].LibraryName
                    });
                    const gr_con = createElement("div", {
                        className: "r-gr-con",
                        innerHTML: tracks[i].TrackGenre
                    });
                    const author_con = createElement("div", {
                        className: "r-author-con",
                        innerHTML: tracks[i].ArtistName
                    });
                    const rating_con = createElement("div", {
                        className: "r-rating-con",
                        innerHTML: tracks[i].AverageRating
                    })

                    main_con.appendChild(img_con);
                    main_con.appendChild(track_con);
                    track_con.appendChild(sn_con);
                    track_con.appendChild(l_con);
                    track_con.appendChild(gr_con);
                    track_con.appendChild(author_con);
                    track_con.appendChild(rating_con);
                    list_item.appendChild(main_con);
                    searchContainer.appendChild(list_item);

                }
            })

        
        
    }
})






logoutBtn.addEventListener("click", () =>{
    localStorage.clear();

})

starElements.forEach((e) => {
    e.addEventListener("mouseenter", (e) => {
        document.getElementById("star-number").textContent =
            6 - e.target.id + ".0";
        console.log(6 - e.target.id);
    });
    e.addEventListener("mouseleave", (e) => {
        document.getElementById("star-number").textContent = "";
    });
    e.addEventListener("click", (e) => {
        track_id = document.getElementById("heart-modal-btn").firstChild.id;
        rating = 6 - e.target.id;
        console.log("Track id" + track_id);
        fetch("https://uhmusic.xyz/api/userRatesTrack", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
            },
            body: `{\r\n    \"username\": \"${username}\",\r\n    \"trackID\": \"${track_id}\",\r\n    \"rating\": \"${rating}\"\r\n}`,
            redirect: "follow",
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
                document.getElementById("rating-container").style.display =
                    "none";
                document.getElementById("average-star").style.display = "block";
            })
            .catch((error) => console.log("error", error));
    });
});
async function fetchData(url = "", data = {}) {
    response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: "{\r\n    \r\n}",
        redirect: "follow",
    });
    return await response.text();
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", async () => {
    var hasGottenTracks = false;
    // var hasValidated = false;
    var hasValidated = true;
    var retryCounter = 0;
    while (!(hasGottenTracks && hasValidated) && retryCounter < 10) {
        if (userType == "User") {
            document.getElementById("upload-music-id").style.display = "none";
            document.getElementById("my-songs-id").style.display = "none";
        }
        await sleep(1000 + 500 * retryCounter);

        if (!hasGottenTracks) {
            fetch("https://uhmusic.xyz/api/getAllTracks", {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: "{\r\n    \r\n}",
                redirect: "follow",
            })
                .then((response) => response.text())
                .then((data) => {
                    data = JSON.parse(data);
                    tracks = [];
                    for (const key in data["tracks"]) {
                        if (Object.hasOwnProperty.call(data["tracks"], key)) {
                            const track = data["tracks"][key];
                            tracks.push(track);
                            if (track.IsDeleted) continue;
                            const img_path = track.IMG.replaceAll(" ", "%20");

                            swiper.appendSlide(
                                `<div class="swiper-slide"><div class = "swiper-slide-name">${track.TrackName}</div><img class = "thumbnail-img" src = ${img_path} alt = "mock image" id = ${track.TrackID}></div>`
                            );
                        }
                    }

                    var containerNode =
                        document.getElementById("top-rated-table");
                    removeAllChildNodes(containerNode);
                    num = tracks.length < 10 ? tracks.length : 10;
                    for (let i = 0; i < num; i++) {
                        containerNode.innerHTML += `
                            <li class="list-item">
                            <div class=r-main-con id = "${tracks[i].TrackID}">
                                <div class="r-num-con">
                                    ${i + 1}
                                </div>
                                <div class="r-img-con" style = "background-image:  url(${tracks[
                                    i
                                ].IMG.replace(" ", "%20")}); 
                                ">
                                </div>
                                <div class=r-track-con id = "${
                                    tracks[i].TrackID
                                }">
                                    <div class="r-sn-con">
                                        ${tracks[i].TrackName}
                                    </div>
                                    <div class="r-l-con">
                                    ${tracks[i].LibraryName}
                                    </div>
                                    <div class="r-gr-con">
                                    ${tracks[i].TrackGenre}
                                    </div>
                                    <div class="r-author-con">
                                    ${tracks[i].ArtistName}
                                    </div>
                                    <div class = "r-rating-con">
                                    ${tracks[i].AverageRating}
                                </div>
                                </div>
                            </div>
                        </li>
                            `;
                    }

                    hasGottenTracks = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        retryCounter = retryCounter + 1;
    }
    if (window.innerWidth < 1200) {
        // document.getElementById("search-container").style.display = "none"
        document.getElementById("top-rated-container").style.width = "100%";
        document.getElementById("search-container").style.width = "100%";
        document.getElementById("rank-container").style.display = "block";
    } else {
        document.getElementById("top-rated-container").style.width = "48%";
        document.getElementById("search-container").style.width = "48%";
        document.getElementById("rank-container").style.display = "flex";
    }
    document.getElementById("loading-container-id").style.display = "none";
    document.getElementById("main-body-id").style.display = "block";

    console.log(hasValidated, hasGottenTracks);
});

window.addEventListener("resize", () => {
    console.log(window.innerWidth);
    if (window.innerWidth < 1200) {
        // document.getElementById("search-container").style.display = "none"
        document.getElementById("top-rated-container").style.width = "100%";
        document.getElementById("search-container").style.width = "100%";
        document.getElementById("rank-container").style.display = "block";
    } else {
        document.getElementById("top-rated-container").style.width = "48%";
        document.getElementById("search-container").style.width = "48%";
        document.getElementById("rank-container").style.display = "flex";
    }
});

var width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

var height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

// Main Swiper
var swiper = new Swiper(".thumbTiles", {
    // Optional parameters
    loop: true,
    freeMode: {
        enabled: true,
    },
    slidesPerView: 5,
    spaceBetween: 10,
    speed: 400,
    autoplay: {
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
        delay: 10000,
    },
    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        450: {
            slidesPerView: 1,
            spaceBetweenSlides: 10,
        },
        600: {
            slidesPerView: 2,
            spaceBetweenSlides: 15,
        },
        800: {
            slidesPerView: 3,
            spaceBetweenSlides: 10,
        },
        1200: {
            slidesPerView: 4,
            spaceBetweenSlides: 10,
        },
        1600: {
            slidesPerView: 5,
            spaceBetweenSlides: 10,
        },
    },

    on: {
        click: (e) => {
            htmlString = e.clickedSlide.innerHTML;
            console.log(htmlString);
            begin = htmlString.search('id="');
            _trackID = htmlString.substring(begin + 4, htmlString.length - 2);

            begin = htmlString.search("images/img");

            console.log("TRACKID: " + _trackID);

            fetch("https://uhmusic.xyz/api/getAllTracks", {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: "{\r\n    \r\n}",
                redirect: "follow",
            })
                .then(async (response) => await response.text())
                .then((data) => {
                    data = JSON.parse(data);
                    for (const key in data["tracks"]) {
                        if (Object.hasOwnProperty.call(data["tracks"], key)) {
                            var track = data["tracks"][key];
                            if (track.TrackID == _trackID) {
                                console.log(track.TrackName);
                                playMusic(track);
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            isModalOn = true;
        },
    },
});

document.addEventListener("click", (e) => {
    if (e.target) {
        if (e.target.className == "bx bx-search icon") {
            explorePlaylist(e);
        } else if (
            e.target.className == "bx bx-play icon" ||
            e.target.className == "a bx bx-play icon"
        ) {
            (e);
        } else if (e.target.className == "bx bx-check icon") {
            addToPlaylist(e);
        } else if (e.target.className == "bx bxs-circle") {
            r = document.getElementById("rating-container");
            htmlreadOnly = window
                .getComputedStyle(r, null)
                .getPropertyValue("display");
            console.log(htmlreadOnly);
            if (htmlreadOnly == "none") {
                r.style.display = "block";
                document.getElementById("average-star").style.display = "none";
            } else {
                r.style.display = "none";
                document.getElementById("average-star").style.display = "block";
            }
        } else if (
            e.target.className == "bx bxs-trash icon" ||
            e.target.className == "a bx bxs-trash icon"
        ) {
            var elementId = e.target.id;
            if (elementId.search("t") == 0) {
                trackId = elementId.substring(
                    elementId.lastIndexOf("-") + 1,
                    elementId.length
                );
                playlistId = elementId.substring(3, elementId.indexOf("-", 3));
                deleteTrackFromPlaylist({
                    trackId: trackId,
                    playlistId: playlistId,
                });
            } else if (elementId.search("p") == 0) {
                id = elementId.substring(
                    elementId.lastIndexOf("-") + 1,
                    elementId.length
                );
                deletePlaylist(id);
            }
        } else if (e.target.className.search("r-") == 0) {
            // console.log(e.target.parentNode)
            console.log(e.target.parentNode.id);
            _trackID = e.target.parentNode.id;
            fetch("https://uhmusic.xyz/api/getAllTracks", {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: "{\r\n    \r\n}",
                redirect: "follow",
            })
                .then(async (response) => await response.text())
                .then((data) => {
                    data = JSON.parse(data);
                    for (const key in data["tracks"]) {
                        if (Object.hasOwnProperty.call(data["tracks"], key)) {
                            var track = data["tracks"][key];
                            if (track.TrackID == _trackID) {
                                console.log(track.TrackName);
                                playMusic(track);
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
});

const deleteTrackFromPlaylist = (e) => {
    fetch("https://uhmusic.xyz/api/deleteTrackFromPlaylist", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: `{\r\n    \"playlistID\": \"${e.playlistId}\",\r\n    \"trackID\": \"${e.trackId}\"\r\n}`,
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            myPlaylistSongModal.style.display = "none";
            isModalOn = false;
        })
        .catch((error) => console.log(error));
};

const deletePlaylist = (e) => {
    fetch("https://uhmusic.xyz/api/userGetAllPlaylists", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: `{\r\n    \"username\": \"${username}\"\r\n}`,
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((data) => {
            data = JSON.parse(data);
            for (const key in data["playlists"]) {
                if (Object.hasOwnProperty.call(data["playlists"], key)) {
                    playlist = data["playlists"][key];
                    if (playlist.PlaylistID == e) {
                        var playlistName = playlist.PlaylistName;
                        console.log("Playlist Name" + playlistName);
                    }
                }
            }
            if (typeof playlistName !== "undefined") {
                return fetch("https://uhmusic.xyz/api/deletePlaylist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain",
                    },
                    body: `{\r\n    \"username\": \"${username}\",\r\n    \"playlistName\": \"${playlistName}\"\r\n}`,
                    redirect: "follow",
                });
            }
        })
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            myPlaylistModal.style.display = "none";
            isModalOn = false;
            document.getElementById("modal-my-playlist-btn").click();
        })
        .catch((err) => console.error(err));
};

// Side bar
// Retrieve DOM elements
const body = document.querySelector("body"),
    sidebar = body.querySelector("nav"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text"),
    createPlaylist = document.querySelector("#new-playlist-id");

toggle.addEventListener("click", () => {
    if (isModalOn) {
        modal.style.display = "none";
        playlistModal.style.display = "none";
        myPlaylistModal.style.display = "none";
        mySongModal.style.display = "none";

        isModalOn = false;
    }
    sidebar.classList.toggle("close");
});

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
    } else {
        modeText.innerText = "Dark mode";
    }
});

createPlaylist.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        fetch("https://uhmusic.xyz/api/createPlaylist", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: `{\r\n    "username": "${username}",\r\n    "playlistName": "${createPlaylist.value}"\r\n}`,
            redirect: "follow",
        })
            .then((response) => response.text())
            .then((result) => {
                alert(result);
                playlistModal.style.display = "none";
                isModalOn = false;
            })
            .catch((error) => console.log("error", error));

        //Console all playlist from user to validate
        // fetch("https://uhmusic.xyz/api/userGetAllPlaylists", {
        //     method: "POST",
        //     headers: { "Content-Type": "text/plain" },
        //     body: `{\r\n    \"username\": \"${username}\"\r\n}`,
        //     redirect: "follow",
        // })
        //     .then((response) => response.text())
        //     .then((result) => console.log(result))
        //     .catch((error) => console.log("error", error));
    }
});

var isModalOn = false;

//Events
modalUploadBtn.addEventListener("click", () => {
    modal.style.display = "block";
    toggle.click();
    isModalOn = true;
});

modalPlaylistBtn.addEventListener("click", () => {
    playlistModal.style.display = "block";
    document.getElementById("new-playlist-id").value = "";
    toggle.click();
    isModalOn = true;
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    musicModal.style.display = "none";
    playlistModal.style.display = "none";
    myPlaylistModal.style.display = "none";
    mySongModal.style.display = "none";

    isModalOn = false;
});

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

uploadBtn.addEventListener("submit", async (e) => {
    e.preventDefault();

    trackName = document.getElementById("track-id").value;
    genre = document.getElementById("genre-id").value;
    library = document.getElementById("library-id").value;
    rawImg = document.getElementById("img-file-id").files[0];
    rawAudio = document.getElementById("audio-file-id").files[0];

    var img64 = await toBase64(rawImg);
    var audio64 = await toBase64(rawAudio);

    img64 = img64.substring(img64.search(",") + 1, img64.length);
    audio64 = audio64.substring(audio64.search(",") + 1, audio64.length);

    fetch("https://uhmusic.xyz/api/getAllTracks", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: "{\r\n    \r\n}",
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("loader-container").style.display = "block";
            document.getElementById("main-body-id").style.pointerEvents =
                "none";
            data = JSON.parse(data);
            var isIn = false;
            for (const key in data["tracks"]) {
                if (Object.hasOwnProperty.call(data["tracks"], key)) {
                    track = data["tracks"][key];
                    if (track.LibraryName == library) {
                        isIn = true;
                        break;
                    }
                }
            }
            if (!isIn) {
                fetch("https://uhmusic.xyz/api/createLibrary", {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain",
                    },
                    body: `{\r\n    \"username\" : \"${username}\",\r\n    \"libraryName\":\"${library}\"\r\n}`,
                    redirect: "follow",
                })
                    .then((response) => response.text())
                    .then((data) => data)
                    .catch((err) => console.log(err));
            }
            return fetch("https://uhmusic.xyz/api/upload", {
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                body: `{\r\n    \"b64Music\": \"${audio64}\",\r\n    \"b64IMG\": \"${img64}\",\r\n    \"name\":\"${trackName}\",\r\n    \"libraryName\":\"${library}\",\r\n    \"trackGenre\":\"${genre}\",\r\n    \"artistName\":\"${username}\"\r\n\r\n}`,
                redirect: "follow",
            });
        })
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("loader-container").style.display = "none";
            document.getElementById("main-body-id").style.pointerEvents =
                "auto";
            console.log(data);
            modal.style.display = "none";
            isModalOn = false;
            location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
});

modalMySongBtn.addEventListener("click", () => {
    fetchData("https://uhmusic.xyz/api/getAllTracks", {})
        .then((data) => {
            var containerNode = document.getElementById("my-songs-table");
            removeAllChildNodes(containerNode);
            data = JSON.parse(data);
            for (const key in data["tracks"]) {
                if (Object.hasOwnProperty.call(data["tracks"], key)) {
                    const track = data["tracks"][key];
                    if (track.ArtistName == username) {
                        console.log(track.TrackName);
                        containerNode.innerHTML += `
                    <li class="list-item">
                                <div class="playlist-item-container playlist-songs-container">
                                    <div class="playlist-songs-artist">
                                        <div class="playlist-songs-img-container">
                                            <img src = "${track.IMG}" class = "playlist-songs-img">
                                        </div>
                                        <div class="playlist-songs-text-info">
                                            <div class="playlist-songs-name">
                                                ${track.TrackName}
                                            </div>
                                            <div class="playlist-songs-subheader">
                                                <div class="playlist-songs-library">
                                                    ${track.LibraryName}
                                                </div>
                                                <div class="playlist-songs-author">
                                                ${track.ArtistName}
                                                </div>
                                                <div class="playlist-songs-genre">
                                                ${track.TrackGenre}
                                                </div>
                                                <div class="playlist-songs-rating">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="playlist-icon-container playlist-songs-icon-container">
                                        <i class="a bx bx-play icon" id = "${track.TrackName}-id-${track.TrackID}"></i>
                                    </div>
                                </div>
                            </li>
                    `;
                        //DeleteIcon placed under <i class="a bx bx-play icon" id = "${track.TrackName}-id-${track.TrackID}"></i>
                        //<i class="a bx bxs-trash icon" id = "mysong-track-${track.TrackName}-id-${track.TrackID}"></i>
                    }
                }
            }
            mySongModal.style.display = "block";
            isModalOn = true;
        })
        .catch((err) => console.log(err));
});

modalMyPlaylistBtn.addEventListener("click", () => {
    let currentPlaylistSize = 0;
    fetch("https://uhmusic.xyz/api/userGetAllPlaylists", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: `{\r\n    \"username\": \"${username}\"\r\n}`,
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((data) => {
            data = JSON.parse(data);
            var containerNode = document.getElementById("playlist-table");
            removeAllChildNodes(containerNode);

            for (const key in data["playlists"]) {
                if (Object.hasOwnProperty.call(data["playlists"], key)) {
                    const playlist = data["playlists"][key];
                    currentPlaylistSize = currentPlaylistSize + 1;
                    var divContainer = document.createElement("div");
                    divContainer.setAttribute(
                        "class",
                        "playlist-item-container"
                    );

                    var divNameNode = document.createElement("div");
                    divNameNode.setAttribute("class", "playlist-name-item");
                    divNameNode.innerHTML = `${currentPlaylistSize}. ${playlist.PlaylistName}`;

                    var divIcon = document.createElement("div");
                    divIcon.setAttribute("class", "playlist-icon-container");

                    var searchIcon = document.createElement("i");
                    searchIcon.setAttribute("class", "bx bx-search icon");
                    searchIcon.id = `${playlist.PlaylistName}-id-${playlist.PlaylistID}`;

                    var deleteIcon = document.createElement("i");
                    deleteIcon.setAttribute("class", "bx bxs-trash icon");
                    deleteIcon.id = `pplaylist-${playlist.PlaylistName}-id-${playlist.PlaylistID}`;

                    divIcon.append(searchIcon);
                    divIcon.append(deleteIcon);

                    divContainer.appendChild(divNameNode);
                    divContainer.appendChild(divIcon);

                    listItemNode = document.createElement("li");
                    listItemNode.setAttribute("class", "list-item");
                    listItemNode.appendChild(divContainer);

                    containerNode.appendChild(listItemNode);
                }
            }

            return fetch("https://uhmusic.xyz/api/getUser", {
                method: "POST",
                headers: {"Content-Type": "text/plain"},
                body: `{\r\n    \"username\": \"${username}\"\r\n}`,
                redirect: "follow",
            });

        })
        .then(response=>response.text())
        .then(data =>{
            data = JSON.parse(data);
            node = document.getElementById('my-playlist-header').textContent= `My Playlist (${currentPlaylistSize}/${data["user"].PlaylistLimit})`
            myPlaylistModal.style.display = "block";
            toggle.click();
            isModalOn = true;

            

        })
        .catch((error) => console.log("error", error));
});

window.addEventListener("click", (e) => {
    if (
        e.target == modal ||
        e.target == musicModal ||
        e.target == playlistModal ||
        e.target == myPlaylistModal ||
        e.target == myPlaylistSongModal ||
        e.target == mySongModal
    ) {
        modal.style.display = "none";
        musicModal.style.display = "none";
        playlistModal.style.display = "none";
        myPlaylistModal.style.display = "none";
        myPlaylistSongModal.style.display = "none";
        mySongModal.style.display = "none";

        isModalOn = false;
    }
});

const explorePlaylist = (e) => {
    myPlaylistModal.style.display = "none";
    elementID = e.target.id;
    playlistName = elementID.substring(0, elementID.search("-id"));
    playlistID = elementID.substring(
        elementID.search("id-") + 3,
        elementID.length
    );
    console.log(playlistID);
    fetch("https://uhmusic.xyz/api/getAllTracksForPlaylist", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: `{\r\n    \"playlistID\":  \"${playlistID}\",\r\n    \"username\": \"${username}\"\r\n}`,
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((data) => {
            var headerNode = document.getElementById("my-playlist-header");
            removeAllChildNodes(headerNode);

            var header_to_insert = document.createElement("div");
            header_to_insert.innerHTML = playlistName;
            headerNode.appendChild(header_to_insert);

            var containerNode = document.getElementById("playlist-table-songs");
            removeAllChildNodes(containerNode);
            data = JSON.parse(data);

            console.log(data);

            for (const key in data["tracks"]) {
                if (Object.hasOwnProperty.call(data["tracks"], key)) {
                    const track = data["tracks"][key];
                    if (track.IsDeleted) continue;
                    containerNode.innerHTML += `
                    <li class="list-item">
                                <div class="playlist-item-container playlist-songs-container">
                                    <div class="playlist-songs-artist">
                                        <div class="playlist-songs-img-container">
                                            <img src = "${track.IMG}" class = "playlist-songs-img">
                                        </div>
                                        <div class="playlist-songs-text-info">
                                            <div class="playlist-songs-name">
                                                ${track.TrackName}
                                            </div>
                                            <div class="playlist-songs-subheader">
                                                <div class="playlist-songs-library">
                                                    ${track.LibraryName}
                                                </div>
                                                <div class="playlist-songs-author">
                                                ${track.ArtistName}
                                                </div>
                                                <div class="playlist-songs-genre">
                                                ${track.TrackGenre}
                                                </div>
                                                <div class="playlist-songs-rating">
                                                Rating: ${track.Rating}.0
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="playlist-icon-container playlist-songs-icon-container">
                                        <i class="a bx bx-play icon" id = "${track.TrackName}-id-${track.TrackID}"></i>
                                        <i class="a bx bxs-trash icon" id = "tp-${playlistID}-track-${track.TrackName}-id-${track.TrackID}"></i>
                                    </div>
                                </div>
                            </li>
                    `;
                }
            }
            myPlaylistSongModal.style.display = "block";
        })
        .catch((error) => console.log("error", error));

    // --Debugging Purposes--
    // myPlaylistModal.style.display = "none";
    // elementID = e.target.id;
    // playlistName = elementID.substring(0, elementID.search("-id"));
    // playlistID = elementID.substring(
    //     elementID.search("id-") + 3,
    //     elementID.length
    // );
    // var headerNode = document.getElementById("my-playlist-header");
    // var header_to_insert = document.createElement("div");
    // header_to_insert.innerHTML = playlistName;
    // headerNode.appendChild(header_to_insert);
    // myPlaylistSongModal.style.display = "block";
};


heartBtn.addEventListener("click", async (e) => {
    console.log(e.target.id);
    _trackID = e.target.id;
    musicModal.style.display = "none";

    fetch("https://uhmusic.xyz/api/userGetAllPlaylists", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: `{\r\n    \"username\": \"${username}\"\r\n}`,
        redirect: "follow",
    })
        .then((response) => response.text())
        .then(async (data) => {
            data = JSON.parse(data);
            allTracksForPlaylist = [];
            for (const key in data["playlists"]) {
                if (Object.hasOwnProperty.call(data["playlists"], key)) {
                    playlist = data["playlists"][key];
                    allTracksForPlaylist.push(
                        await fetch(
                            "https://uhmusic.xyz/api/getAllTracksForPlaylist",
                            {
                                method: "POST",
                                headers: { "Content-Type": "text/plain" },
                                body: `{\r\n    \"playlistID\":  \"${playlist.PlaylistID}\",\r\n    \"username\": \"${username}\"\r\n}`,
                                redirect: "follow",
                            }
                        )
                            .then((response) => response.text())
                            .then((data) => {
                                return JSON.parse(data);
                            })
                    );
                }
            }
            return { tracks: allTracksForPlaylist, playlists: data };
        })
        .then((data) => {
            tracksObj = data.tracks;
            playlistsObj = data.playlists;
            var containerNode = document.getElementById("playlist-table");
            removeAllChildNodes(containerNode);

            for (let i = 0; i < tracksObj.length; i++) {
                isInPlaylist = false;
                tracks = tracksObj[i];
                playlist = playlistsObj["playlists"][i];
                for (const key in tracks["tracks"]) {
                    if (Object.hasOwnProperty.call(tracks["tracks"], key)) {
                        const track = tracks["tracks"][key];
                        if (track.TrackID == _trackID) {
                            isInPlaylist = true;
                            console.log(track.TrackName);
                            break;
                        }
                    }
                }
                if (!isInPlaylist) {
                    console.log("Not in playlist");
                    var divContainer = document.createElement("div");
                    divContainer.setAttribute(
                        "class",
                        "playlist-item-container"
                    );

                    var divNameNode = document.createElement("div");
                    divNameNode.setAttribute("class", "playlist-name-item");
                    divNameNode.innerHTML = playlist.PlaylistName;

                    var divIcon = document.createElement("div");
                    divIcon.setAttribute("class", "playlist-icon-container");

                    var addIcon = document.createElement("i");
                    addIcon.setAttribute("class", "bx bx-check icon");
                    addIcon.id = `${playlist.PlaylistName}-id-${playlist.PlaylistID} track-${_trackID}`;

                    divIcon.append(addIcon);
                    divContainer.appendChild(divNameNode);
                    divContainer.appendChild(divIcon);

                    listItemNode = document.createElement("li");
                    listItemNode.setAttribute("class", "list-item");
                    listItemNode.appendChild(divContainer);
                    containerNode.appendChild(listItemNode);
                }
            }
            myPlaylistModal.style.display = "block";
        })
        .catch((error) => console.log(error));
});

const addToPlaylist = (e) => {
    elementID = e.target.id;
    playlistID = elementID.substring(
        elementID.search("id-") + 3,
        elementID.search("id-") +
            3 +
            elementID
                .substring(elementID.search("id-") + 3, elementID.length)
                .search(" ")
    );
    _trackID = elementID.substring(
        elementID.search("track-") + 6,
        elementID.length
    );

    playlistName = elementID.substring(0, elementID.search("-id"));

    console.log("My track id" + _trackID);
    console.log("My playlist id" + playlistName);
    fetch("https://uhmusic.xyz/api/insertTrackIntoPlaylist", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: `{\r\n    \"username\": \"${username}\",\r\n    \"playlistName\": \"${playlistName}\",\r\n    \"trackID\": \"${_trackID}\"\r\n}`,
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            return fetchData("https://uhmusic.xyz/api/getAllTracks", {});
        })
        .then((data) => {
            data = JSON.parse(data);
            for (const key in data["tracks"]) {
                if (Object.hasOwnProperty.call(data["tracks"], key)) {
                    var track = data["tracks"][key];
                    if (track.TrackID == _trackID) {
                        console.log(track.TrackName);
                        myPlaylistModal.style.display = "none";
                        playMusic(track);
                    }
                }
            }
        })
        .catch((error) => console.log("error", error));
};

// Make dark mode default
modeSwitch.click();

const addToSlider = (obj, data) => {
    obj.appendSlide(
        `<div class="swiper-slide"><img class = "thumbnail-img" src = ${data.image} alt = "mock image" id = ${data.index}></div>`
    );
};

const insertHtmlElement = async (
    elementId,
    elementType,
    attributeType,
    data,
    toRemoveAllChildren = true,
    customID = ""
) => {
    var node = document.getElementById(elementId);
    console.log(node);
    if (toRemoveAllChildren) {
        removeAllChildNodes(node);
    }
    html_to_insert = document.createElement(elementType);
    if (elementType == "img") {
        // const img_path = `${path}img${data}.jpg`;
        const img_path = data;
        html_to_insert.src = img_path;
    } else if (elementType == "div") {
        html_to_insert.innerHTML = data;
    } else if (elementType == "audio") {
        html_to_insert.controls = "controls";
        html_to_insert.src = data;
    }

    html_to_insert.setAttribute(attributeType, elementId);
    if (customID != "") {
        html_to_insert.id = customID;
    }

    node.appendChild(html_to_insert);
};

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

const playMusic = async (track) => {
    document.getElementById("rating-container").style.display = "none";
    document.getElementById("average-star").style.display = "block";

    insertHtmlElement("image-modal-header", "img", "class", track.IMG);
    insertHtmlElement("image-modal-title", "div", "class", track.TrackName);
    insertHtmlElement("image-modal-album", "div", "class", track.LibraryName);
    insertHtmlElement("image-modal-artist", "div", "class", track.ArtistName);
    insertHtmlElement("image-modal-genre", "div", "class", track.TrackGenre);
    insertHtmlElement("image-modal-audio", "audio", "class", track.Link);

    averageRating = document.getElementById("average-star");
    console.log(track.AverageRating);
    if (track.AverageRating % 1 != 0) {
        averageRating.textContent = track.AverageRating;
    } else {
        averageRating.textContent = track.AverageRating + ".0";
    }

    upVoteDiv = document.getElementById("upvote-btn");
    removeAllChildNodes(upVoteDiv);

    var upVoteIcon = document.createElement("i");
    upVoteIcon.setAttribute("class", "bx bxs-circle");
    upVoteDiv.appendChild(upVoteIcon);

    var downVoteIcon = document.createElement("i");
    downVoteIcon.setAttribute("class", "bx bxs-circle");
    downVoteDiv = document.getElementById("downvote-btn");
    removeAllChildNodes(downVoteDiv);
    downVoteDiv.appendChild(downVoteIcon);

    var heartIcon = document.createElement("i");
    heartIcon.setAttribute("class", "bx bx-heart icon");
    heartIcon.id = `${track.TrackID}`;
    heartDiv = document.getElementById("heart-modal-btn");
    removeAllChildNodes(heartDiv);
    heartDiv.appendChild(heartIcon);

    musicModal.style.display = "block";
};
