function createElement(tag, params) {
  const element = document.createElement(tag);
  const keys = Object.keys(params);
  for (let key of keys) {
    element[key] = params[key];
  }
  return element;
}

var width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

var height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

function createSwiper(name) {
  const swiper = new Swiper(name, {
    freeMode: {
      enabled: true,
    },
    slidesPerView: 5,
    spaceBetween: 10,
    speed: 400,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    on: {
      click: (e) => {
        htmlString = e.clickedSlide.innerHTML;
        begin = e.clickedSlide.innerHTML.search('id="');
        index = htmlString.substring(begin + 4, htmlString.length - 2);
        openMusicModal(getMusicData(index));
      },
    },
    style: {
      height: "400px",
    },
  });
  return swiper;
}

function createSwiperDiv(name) {
  const swiperDiv = createElement("div", {
    className: "text",
  });
  const h1 = createElement("h1", {
    innerHTML: name,
  });
  const swiper = createElement("div", {
    className: name,
  });

  const swiper_wrapper = createElement("div", {
    className: "swiper-wrapper",
  });

  swiper.appendChild(swiper_wrapper);

  swiperDiv.appendChild(h1);
  swiperDiv.appendChild(swiper);
  const homeSlider = document.getElementById("home-slider");
  homeSlider.appendChild(swiperDiv);
}

var swiper = createSwiper(".thumbTiles");

const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  if (isModalOn) {
    modal.style.display = "none";
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

// Modal
// Retrieve DOM Elements
const modal = document.querySelector("#modal-base");
const musicModal = document.querySelector("#modal-music");
const closeModal = document.querySelector(".close-modal");
const playlistModal = document.querySelector("#modal-playlist");
const modalPlaylistBtn = document.querySelector("#modal-playlist-btn");
const create_playlist_button = document.getElementById("create-playlist-btn");

var isModalOn = false;

create_playlist_button.addEventListener("click", () => {
  const playlist_id_element = document.getElementById("new-playlist-id");
  const playlist_name = playlist_id_element.value;
  $.ajax({
    url: "http://uhmusic.xyz/api/createPlaylist",
    type: "POST",
    data: JSON.stringify({
      playlistName: playlist_name,
      username: "User1",
    }),
    success: (data) => {
      playlist_id_element.value = "";
      alert("Playlist created successfully");
    },
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  musicModal.style.display = "none";
  playlistModal.style.display = "none";
  isModalOn = false;
});

modalPlaylistBtn.addEventListener("click", () => {
  playlistModal.style.display = "block";
  toggle.click();
  isModalOn = true;
});

window.addEventListener("click", (e) => {
  if (
    e.target == modal ||
    e.target == musicModal ||
    e.target == playlistModal
  ) {
    modal.style.display = "none";
    musicModal.style.display = "none";
    playlistModal.style.display = "none";
    isModalOn = false;
  }
});

// Make dark mode default
modeSwitch.click();

const addToSlider = (obj, data) => {
  const new_slide = createElement("div", {
    className: "swiper-slide",
    innerHTML: data.song_name,
  });
  const image_slide = createElement("img", {
    src: data.image,
    className: "thumbnail-img",
    alt: "mock image",
    id: data.index,
  });
  new_slide.appendChild(image_slide);
  obj.appendSlide(new_slide);
};

const getMusicData = (index) => {
  return music_data[index];
};

const openMusicModal = (data) => {
  musicModal.style.display = "block";

  var image_node = document.getElementById("image-modal-header");
  var title_node = document.getElementById("image-modal-title");
  var artist_node = document.getElementById("image-modal-artist");
  var audio_node = document.getElementById("image-modal-audio");
  var genre_node = document.getElementById("image-modal-genre");
  var add_to_playlist_node = document.getElementById(
    "image-model-add-playlist"
  );

  removeAllChildNodes(image_node);
  removeAllChildNodes(title_node);
  removeAllChildNodes(artist_node);
  removeAllChildNodes(audio_node);
  removeAllChildNodes(genre_node);
  removeAllChildNodes(add_to_playlist_node);



  image_to_insert = document.createElement("img");
  image_to_insert.src = data.image;
  image_to_insert.setAttribute("class", "image-modal-header");

  title_to_insert = document.createElement("div");
  title_to_insert.innerHTML = data.song_name;
  title_to_insert.setAttribute("class", "image-modal-title");

  artist_to_insert = document.createElement("div");
  artist_to_insert.innerHTML = data.artist;
  artist_to_insert.setAttribute("class", "image-modal-artist");

  audio_to_insert = document.createElement("audio");
  audio_to_insert.controls = "controls";
  audio_to_insert.src = data.audio;
  audio_to_insert.setAttribute("class", "image-modal-audio");

  genre_to_insert = document.createElement("div");
  genre_to_insert.innerHTML = "Genre: " + data.genre;
  genre_to_insert.setAttribute("class", "image-modal-genre");

  add_to_playlist_to_insert = document.createElement("input");
  add_to_playlist_to_insert.type = "text";
  add_to_playlist_to_insert.setAttribute("class", "image-modal-add-playlist");
  add_to_playlist_to_insert.placeholder = "Add to playlist";

  const add_to_playlist_btn = document.createElement("button");
  add_to_playlist_btn.innerHTML = "Add";
  add_to_playlist_btn.setAttribute("class", "image-modal-add-playlist-btn");
  add_to_playlist_btn.addEventListener("click", () => {
    if (add_to_playlist_to_insert.value != "") {
      const playlist_name = add_to_playlist_to_insert.value;
      $.ajax({
        type: "POST",
        url: "http://uhmusic.xyz/api/insertTrackIntoPlaylist",
        data: JSON.stringify({
          username: "User1",
          playlistName: playlist_name,
          trackID: data.id,
        }),
        success: (data) => {
          const { message } = data;
          alert(message);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  });

  title_node.appendChild(title_to_insert);
  image_node.appendChild(image_to_insert);
  artist_node.appendChild(artist_to_insert);
  audio_node.appendChild(audio_to_insert);
  genre_node.appendChild(genre_to_insert);
  add_to_playlist_node.appendChild(add_to_playlist_to_insert);
  add_to_playlist_node.appendChild(add_to_playlist_btn);

  isModalOn = true;
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

music_data = [];
function createTracksSlider() {
  $.ajax({
    url: "http://uhmusic.xyz/api/userGetAllPlaylists",
    type: "POST",
    data: JSON.stringify({ username: "User1" }),
    success: (data) => {
      const { playlists } = data;

      playlists.forEach((playlist) => {
        const { PlaylistID, PlaylistName } = playlist;
        createSwiperDiv(PlaylistName);
        const sw = createSwiper(`.${PlaylistName}`);
        $.ajax({
          url: "http://uhmusic.xyz/api/getAllTracksForPlaylist",
          type: "POST",
          data: JSON.stringify({ playlistID: PlaylistID, username: "User1" }),
          success: (data) => {
            const { tracks } = data;
            tracks.forEach((track) => {
              const {
                ArtistName,
                Link,
                TrackGenre,
                TrackName,
                TrackID,
                IMG,
              } = track;
              music_data.push({
                index: music_data.length,
                id: TrackID,
                artist: ArtistName,
                song_name: TrackName,
                like: 0,
                dislike: 0,
                genre: TrackGenre,
                image: IMG,
                audio: Link,
              })
              music_data.forEach((data) => {
                  addToSlider(sw, data);
              })
            });
          },
        });
      });
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  createTracksSlider();
});
