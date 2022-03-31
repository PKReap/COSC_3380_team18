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

function getAllUsers(){
  const element = document.getElementById("UserTable");
  $.ajax({
    url: "http://uhmusic.xyz/api/getAllUsers",
    type: "POST",
    data: JSON.stringify({}),
    success: (data) => {
      const { users } = data;
      element.innerHTML = "Name | ID | Type"
      users.forEach((user) => {
        const { Username, UserID , UserType } = user;
        const userElement = createElement("li", { innerHTML: `${Username} - ${UserID} - ${UserType}` });
        element.appendChild(userElement);
      });
    },
    error: (err) => {
      element.innerHTML = JSON.stringify(err);
    },
  });
  element.innerHTML = "getting users...";
}