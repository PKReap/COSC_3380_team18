
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


  function saveInformation(){
    localStorage.setItem("currentUser", 15);
  }

  function getInformation(){
    const currentUser = localStorage.getItem("currentUser");
    console.log(currentUser);
  }