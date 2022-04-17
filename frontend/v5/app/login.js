const form = document.getElementById("login-form");

homepagePath = "";

if (
    localStorage.getItem("uh-music-username") != null &&
    localStorage.getItem("uh-music-password") != null &&
    localStorage.getItem("uh-music-userType") != null
) {
    var username = localStorage.getItem("uh-music-username");
    var password = localStorage.getItem("uh-music-password");
    var userType = localStorage.getItem("uh-music-userType");

    console.log(username);

    fetch("https://uhmusic.xyz/api/validateUser", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: `{\r\n    \"username\": \"${username}\",\r\n    \"password\": \"${password}\"\r\n}`,
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((data) => {
            data = JSON.parse(data);
            console.log(data);
            if (data.validation == true) {
                document.location = "index.html";
            }
        })
        .catch((error) => console.log("error", error));
    console.log("Hello");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    username = document.getElementById("username");
    password = document.getElementById("password");
    fetch("https://uhmusic.xyz/api/validateUser", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: `{\r\n    \"username\": \"${username.value}\",\r\n    \"password\": \"${password.value}\"\r\n}`,
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((data) => {
            // {"validation":true,"message":"User logged in successfully","username":"Artist1","userType":"Artist"}
            data = JSON.parse(data);
            console.log(data);
            if (data.validation == true) {
                localStorage.setItem("uh-music-username", username.value);
                localStorage.setItem("uh-music-userType", data.userType);
                localStorage.setItem("uh-music-password", password.value);

                if (data.userType == "Admin") {
                    document.location = ''  //<--- Admin page
                } else {
                    document.location = "homepage.html";
                }
            } else {
                username.value = "";
                password.value = "";
            }
        })
        .catch((error) => console.log("error", error));
});
