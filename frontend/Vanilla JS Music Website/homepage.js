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
      begin = e.clickedSlide.innerHTML.search('id="');
      index = htmlString.substring(begin + 4, htmlString.length - 2);
      openMusicModal(getMusicData(index));
    },
  },
});

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
const playlistModal = document.querySelector('#modal-playlist')
const modalPlaylistBtn = document.querySelector("#modal-playlist-btn")
const create_playlist_button = document.getElementById("create-playlist-btn")

var isModalOn = false;



create_playlist_button.addEventListener("click", () => {
  const playlist_id_element = document.getElementById("new-playlist-id");
  const playlist_name = playlist_id_element.value;
  $.ajax({
    url: "http://uhmusic.xyz/api/createPlaylist",
    type: "POST",
    data: JSON.stringify({
      playlistName: playlist_name,
      username: "User1"
    }),
    success: (data) => {
      playlist_id_element.value = ""; 
      const {message} = data;
      alert(message);
    }
  })
})
 

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  musicModal.style.display = "none";
  playlistModal.style.display = "none"
  isModalOn = false;
});


modalPlaylistBtn.addEventListener("click",()=>{
  playlistModal.style.display = "block"
  toggle.click();
  isModalOn = true
})

window.addEventListener("click", (e) => {
  if (e.target == modal || e.target == musicModal || e.target == playlistModal) {
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
  var average_node = document.getElementById("image-modal-average");
  var genre_node = document.getElementById("image-modal-genre");
  var add_to_playlist_node = document.getElementById(
    "image-model-add-playlist"
  );
  var album_node = document.getElementById("image-modal-album");

  removeAllChildNodes(image_node);
  removeAllChildNodes(title_node);
  removeAllChildNodes(artist_node);
  removeAllChildNodes(audio_node);
  removeAllChildNodes(average_node);
  removeAllChildNodes(genre_node);
  removeAllChildNodes(add_to_playlist_node);
  removeAllChildNodes(album_node);

  average_to_insert = document.createElement("div");
  average_to_insert.innerHTML = "Average Rating: " + data.average;
  average_to_insert.setAttribute("class", "image-modal-average");

  image_to_insert = document.createElement("img");
  image_to_insert.src = data.image;
  image_to_insert.setAttribute("class", "image-modal-header");

  title_to_insert = document.createElement("div");
  title_to_insert.innerHTML = data.song_name;
  title_to_insert.setAttribute("class", "image-modal-title");

  album_to_insert = document.createElement("div");
  album_to_insert.innerHTML = data.album;
  album_to_insert.setAttribute("class", "image-modal-album");

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
        }
      });
    }
  });

  title_node.appendChild(title_to_insert);
  image_node.appendChild(image_to_insert);
  artist_node.appendChild(artist_to_insert);
  audio_node.appendChild(audio_to_insert);
  average_node.appendChild(average_to_insert);
  genre_node.appendChild(genre_to_insert);
  add_to_playlist_node.appendChild(add_to_playlist_to_insert);
  add_to_playlist_node.appendChild(add_to_playlist_btn);
  album_node.appendChild(album_to_insert);

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
    url: "http://uhmusic.xyz/api/getAllTracks",
    type: "POST",
    data: JSON.stringify({}),
    success: (data) => {
      const { tracks } = data;
      let index = 0;
      tracks.forEach((track) => {
        const {
          ArtistName,
          AverageRating,
          Link,
          TrackGenre,
          LibraryName,
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
          average: AverageRating,
          image: IMG,
          audio: Link,
          album: LibraryName,
        });
      });
      music_data.forEach((data) => {
        addToSlider(swiper, data);
      });
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  createTracksSlider();
});
