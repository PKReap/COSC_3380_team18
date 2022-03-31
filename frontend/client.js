function createElement(tag, params) {
  const element = document.createElement(tag);
  const keys = Object.keys(params);
  for (let key of keys) {
    element[key] = params[key];
  }
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
        const userID = createElement("td", {});
        userID.appendChild(
          createElement("input", {
            type: "checkbox",
            value: UserID,
          })
        );
        const columns = [
          userID,
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

  const information = document.getElementById("information");
  information.addEventListener("click", (event) => {
    if (information.innerHTML === "information") {
      information.innerHTML = "clicked";
    } else {
      information.innerHTML = "information";
    }
  });
}

function saveInformation() {
  localStorage.setItem("current", 12313);
}

function getInformation() {
  const element = document.getElementById("UserTable");
  const checkboxes = element.querySelectorAll("input[type=checkbox]");
  const selected = [].filter.call(checkboxes, (checkbox) => checkbox.checked);
  const values = selected.map((checkbox) => checkbox.value);
  console.log(values);
}
