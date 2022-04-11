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

var isModalOn = false;

//Even

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  musicModal.style.display = "none";
  isModalOn = false;
});

window.addEventListener("click", (e) => {
  if (
    e.target == modal ||
    e.target == musicModal
  ) {
    modal.style.display = "none";
    musicModal.style.display = "none";

    isModalOn = false;
  }
});

// Make dark mode default
modeSwitch.click();

const addToSlider = (obj, data) => {
  obj.appendSlide(
    `<div class="swiper-slide"><img class = "thumbnail-img" src = ${data.image} alt = "mock image" id = ${data.index}></div>`
  );
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

  removeAllChildNodes(image_node);
  removeAllChildNodes(title_node);
  removeAllChildNodes(artist_node);
  removeAllChildNodes(audio_node);
  removeAllChildNodes(average_node);
  removeAllChildNodes(genre_node);
  


  average_to_insert = document.createElement("div");
  average_to_insert.innerHTML = "Average Rating: " + data.average;
  average_to_insert.setAttribute("class", "image-modal-average");

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

  title_node.appendChild(title_to_insert);
  image_node.appendChild(image_to_insert);
  artist_node.appendChild(artist_to_insert);
  audio_node.appendChild(audio_to_insert);
  average_node.appendChild(average_to_insert);
  genre_node.appendChild(genre_to_insert);

  isModalOn = true;
  console.log(data);
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
          TrackName,
          TrackID,
          IMG
        } = track;
        console.log(IMG);
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
          });
      });
        music_data.forEach((data) => {
            addToSlider(swiper, data);
        })
    },
    
  });
}

document.addEventListener("DOMContentLoaded", function () {
  createTracksSlider();
});

// addToSlider(swiper, music_data[0]);
// addToSlider(swiper, music_data[1]);
// addToSlider(swiper, music_data[2]);
// addToSlider(swiper, music_data[3]);
// addToSlider(swiper, music_data[4]);
// addToSlider(swiper, music_data[5]);
