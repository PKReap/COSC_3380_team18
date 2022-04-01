const host = "http://uhmusic.xyz/api/";

function validateUser() {
  const information = document.getElementById("information");
  $.ajax({
    url: `${host}validateUser`,
    type: "POST",
    data: JSON.stringify({ username, password }),
    success: (data) => {
      const { validation, userID } = data;
      if (validation) {
        localStorage.setItem("user", `${userID}`);
        window.location.href = "./playlists.html";
      }
      else{
        information.innerHTML = "Invalid username or password";
      }
    },
    error: (err) => {
      information.innerHTML = JSON.stringify(err);
    },
  });
  information.innerHTML = "validating...";
}


localStorage.setItem("user", "default");



