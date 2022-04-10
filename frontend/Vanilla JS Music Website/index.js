

const music_data = [
    {
        index: 0,
        id: "625263cea6d213d0d4b8b90c",
        artist: "Manning",
        song_name: "incididunt",
        like: 2173,
        dislike: 257,
        genre: "rap",
        average: 1,
        image: "../mock/images/img1.jpg",
        audio: "../mock/audio/t.mp4"
    },
    {
        index: 1,
        id: "625263ce72d2b818c360b07f",
        artist: "Mills",
        song_name: "anim",
        like: 3286,
        dislike: 697,
        genre: "rock",
        average: 1,
        image: "../mock/images/img2.jpg",
        audio: "../mock/audio/t.mp4"
    },
    {
        index: 2,
        id: "625263cea55972df070c7443",
        artist: "Small",
        song_name: "nostrud",
        like: 3984,
        dislike: 836,
        genre: "jazz",
        average: 1,
        image: "../mock/images/img3.jpg",
        audio: "../mock/audio/t.mp4"
    },
    {
        index: 3,
        id: "625263ceacc51a3edfa21a7e",
        artist: "Wong",
        song_name: "minim",
        like: 850,
        dislike: 944,
        genre: "j-pop",
        average: 1,
        image: "../mock/images/img4.jpg",
        audio: "../mock/audio/t.mp4"
    },
    {
        index: 4,
        id: "625263ceae5990fdc2acc591",
        artist: "Beverley",
        song_name: "in",
        like: 628,
        dislike: 876,
        genre: "j-pop",
        average: 1,
        image: "../mock/images/img5.jpg",
        audio: "../mock/audio/t.mp4"
    },
    {
        index: 5,
        id: "625263ced6f750bad9068326",
        artist: "Lupe",
        song_name: "nulla",
        like: 1537,
        dislike: 678,
        genre: "rap",
        average: 1,
        image: "../mock/images/img4.jpg",
        audio: "../mock/audio/t.mp4"
    },
    {
        index: 6,
        id: "625263ce760ae0f6b946d0d1",
        artist: "Rosario",
        song_name: "incididunt",
        like: 3044,
        dislike: 98,
        genre: "rap",
        average: 1,
        image: "../mock/images/img3.jpg",
        audio: "../mock/audio/t.mp4"
    },
];


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
    // <img class="thumbnail-img" src="../mock/images/img1.jpg" alt="mock image" id="0">
    on: {
        click: (e)=>{
            htmlString = e.clickedSlide.innerHTML
            begin = e.clickedSlide.innerHTML.search('id="')
            index = htmlString.substring(begin+4, htmlString.length-2)
            openMusicModal(getMusicData(index))
        }
    },
});


// Playlist Swiper
var playlistSwiper = new Swiper(".playlistTiles", {
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
    pagination:{
        el: ''
    },

    on:{
        click: (e)=>{
            console.log(e.clickedSlide)
        }
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

});

// Side bar
// Retrieve DOM elements
const body = document.querySelector("body"),
    sidebar = body.querySelector("nav"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    if (isModalOn) {
        modal.style.display = "none";
        playlistModal.style.display = "none"
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
const musicModal = document.querySelector('#modal-music')
const playlistModal = document.querySelector('#modal-playlist')
const modalUploadBtn = document.querySelector("#modal-upload-btn");
const modalPlaylistBtn = document.querySelector("#modal-playlist-btn")
const closeModal = document.querySelector(".close-modal");

var isModalOn = false;

//Events
modalUploadBtn.addEventListener("click", () => {
    modal.style.display = "block";
    toggle.click();
    isModalOn = true;
});


modalPlaylistBtn.addEventListener("click",()=>{
    playlistModal.style.display = "block"
    toggle.click();
    isModalOn = true
})

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    musicModal.style.display = "none";
    playlistModal.style.display = "none"
    isModalOn = false;
});

window.addEventListener("click", (e) => {
    if (e.target == modal || e.target == musicModal || e.target == playlistModal) {
        modal.style.display = "none";
        musicModal.style.display = "none";
        playlistModal.style.display = "none"

        isModalOn = false;
    }
});


// Make dark mode default
modeSwitch.click();


const addToSlider = (obj, data) =>{
    obj.appendSlide(`<div class="swiper-slide"><img class = "thumbnail-img" src = ${data.image} alt = "mock image" id = ${data.index}></div>`)
}


const getMusicData = (index) => {
    return music_data[index]
}

const openMusicModal = (data) => {
    musicModal.style.display = "block";

    var image_node = document.getElementById("image-modal-header")
    var title_node = document.getElementById("image-modal-title")
    var artist_node = document.getElementById("image-modal-artist")
    var audio_node = document.getElementById("image-modal-audio")
    var like_node = document.getElementById("image-modal-like")
    var dislike_node = document.getElementById("image-modal-dislike")

    removeAllChildNodes(image_node)
    removeAllChildNodes(title_node)
    removeAllChildNodes(artist_node)
    removeAllChildNodes(audio_node)
    removeAllChildNodes(like_node)
    removeAllChildNodes(dislike_node)

    image_to_insert = document.createElement("img");
    image_to_insert.src = data.image;
    image_to_insert.setAttribute('class', 'image-modal-header')

    title_to_insert = document.createElement('div');
    title_to_insert.innerHTML = data.song_name;
    title_to_insert.setAttribute('class', 'image-modal-title');

    artist_to_insert = document.createElement('div');
    artist_to_insert.innerHTML = data.artist;
    artist_to_insert.setAttribute('class', 'image-modal-artist')

    audio_to_insert = document.createElement('audio');
    audio_to_insert.controls = "controls";
    audio_to_insert.src = data.audio;
    audio_to_insert.setAttribute('class', 'image-modal-audio')
    
    
    like_to_insert = document.createElement('div');
    like_to_insert.innerHTML = data.like;
    like_to_insert.setAttribute('class', 'image-modal-like')
    
    dislike_to_insert = document.createElement('div');
    dislike_to_insert.innerHTML = data.dislike;
    dislike_to_insert.setAttribute('class', 'image-modal-dislike')

    title_node.appendChild(title_to_insert);
    image_node.appendChild(image_to_insert);
    artist_node.appendChild(artist_to_insert)
    audio_node.appendChild(audio_to_insert);
    like_node.appendChild(like_to_insert)
    dislike_node.appendChild(dislike_to_insert);

    isModalOn = true;
    console.log(data)
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

addToSlider(swiper, music_data[0])
addToSlider(swiper, music_data[1])
addToSlider(swiper, music_data[2])
addToSlider(swiper, music_data[3])
addToSlider(swiper, music_data[4])
addToSlider(swiper, music_data[5])