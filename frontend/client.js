function validateUser(username, password) {
  const information = document.getElementById("information");
  $.ajax({
    url: "http://localhost:3000/validateUser",
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
