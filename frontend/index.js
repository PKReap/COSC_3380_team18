const host = "http://uhmusic.xyz/api/";

function createElement(tag, params) {
  const element = document.createElement(tag);
  const keys = Object.keys(params);
  for (let key of keys) {
    element[key] = params[key];
  }
  return element;
}

function login(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const currentlyActive = document.querySelector(".active");
    
}

document.addEventListener("DOMContentLoaded", () => {
    localStorage.setItem("user", "default");
})


