function createElement(tag, params) {
  const element = document.createElement(tag);
  const keys = Object.keys(params);
  keys.forEach((key) => {
    element[key] = params[key];
  });
  return element;
}

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

function getAllUsers() {
  const element = document.getElementById("UserTable");
  $.ajax({
    url: "http://uhmusic.xyz/api/getAllUsers",
    type: "POST",
    data: JSON.stringify({}),
    success: (data) => {
      const { users } = data;
      users.forEach((user) => {
        const { Username, UserID, UserType } = user;
        const row = createElement("tr", {});
        const columns = [
          createElement("td", { innerHTML: UserID }),
          createElement("td", { innerHTML: Username }),
          createElement("td", { innerHTML: UserType }),
        ];
        columns.forEach((column) => {
          row.appendChild(column);
        });
        element.appendChild(row);
      });
    },
    error: (err) => {
      element.innerHTML = JSON.stringify(err);
    },
  });
}
