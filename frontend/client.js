const host = "http://uhmusic.xyz/api/";

function validateUser(username, password) {
  const information = document.getElementById("information");
  $.ajax({
    url: `${host}validateUser`,
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

