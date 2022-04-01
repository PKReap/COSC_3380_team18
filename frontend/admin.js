const host = "http://uhmusic.xyz/api/";

function createElement(tag, params) {
  const element = document.createElement(tag);
  const keys = Object.keys(params);
  for (let key of keys) {
    element[key] = params[key];
  }
  return element;
}

function getAllUsers() {
  const element = document.getElementById("UserTable");
  $.ajax({
    url: `${host}getAllUsers`,
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
          createElement("td", { style: "hover: true;", innerHTML: Username }),
          createElement("td", {  style: "hover: true;", innerHTML: UserType }),
        ];
        columns.forEach((column) => {
          row.appendChild(column);
        });
        element.appendChild(row);
      });
    },
    error: (err) => {
      alert(JSON.stringify(err));
    },
  });
}

function performOperation() {
  const element = document.getElementById("UserTable");
  const checkboxes = element.querySelectorAll("input[type=checkbox]");
  const selected = [].filter.call(checkboxes, (checkbox) => checkbox.checked);
  const values = selected.map((checkbox) => checkbox.value);
  const operation = document.getElementById("operation").value;
  values.forEach((value) => {
    $.ajax({
      url: host + operation,
      type: "POST",
      data: JSON.stringify({ userID: parseFloat(value) }),
      success: (data) => {
        window.location.reload();
      },
      error: (err) => {
        console.log(`Failed: ${operation} ${value}`);
      },
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getAllUsers();
});
