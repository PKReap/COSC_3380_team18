function validateUser(username, password) {
  const information = document.getElementById("information");
  $.ajax({
    url: "http://uhmusic.xyz/api/validateUser",
    type: "POST",
    data: JSON.stringify({ username, password }),
    success: (data) => {
      const validation = data.validation;
      information.innerHTML = JSON.stringify(validation);
    },
    error: (err) => {
      information.innerHTML = JSON.stringify(err);
    },
  });
  information.innerHTML = "validating...";
}

function createElement(tag, params) {
  const element = document.createElement(tag);
  const keys = Object.keys(params);

  keys.forEach((key) => {
    element[key] = params[key];
  });
  return element;
}

function combine(elements) {
  const Objects = Object.values(elements);
  const parent = Objects[0];
  for (let i = 1; i < Objects.length; i++) {
    parent.appendChild(Objects[i]);
  }
  return parent;
}

function createBlock(block) {
  const result = {};
  for (let key in block) {
    result[key] = createElement(block[key].tag, block[key].params);
  }
  return combine(result);
}

const pageView = {
  navbar: {
    div: { tag: "div", params: { className: "topnav", id: "navbar" } },
    home: {tag: "a", params: { className: "active", href: "#home", innerHTML: "Home" }},
    login: { tag: "a", params: { href: "#login", innerHTML: "Login" } },
    register: { tag: "a", params: { href: "#Register", innerHTML: "Register" } },
  },
};

function renderPage() {
  localStorage.setItem("home", JSON.stringify(pageView));
  const currentView = JSON.parse(localStorage.getItem("home"));
  const view = {};
  for (let key in currentView) {
    view[key] = createBlock(currentView[key]);
  }
  for(let key in view){
    document.body.appendChild(view[key]);
  }
}
