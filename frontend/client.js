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

// render navbar

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
  console.log(parent);
  return parent;
}

function createNavbar() {
  const navbar = {
    div: createElement("div", { className: "topnav", id: "navbar" }),
    home: createElement("a", {
      className: "active",
      href: "#home",
      innerHTML: "Home",
    }),
    login: createElement("a", { href: "#login", innerHTML: "Login" }),
    register: createElement("a", { href: "#Register", innerHTML: "Register" }),
  };
  const nav = combine(navbar);
  return nav;
}

const pageView = {
  navbar: createNavbar(),
};

function render(page) {
  const view = combine(page);
  document.body.appendChild(view);
}
