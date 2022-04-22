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
        const { Username, UserType, RegistrationDate } = user;
        const row = createElement("tr", {});
        const userID = createElement("td", {});
        userID.appendChild(
          createElement("input", {
            type: "checkbox",
            value: Username,
          })
        );
        const columns = [
          userID,
          createElement("td", { innerHTML: Username }),
          createElement("td", { innerHTML: UserType }),
          createElement("td", { innerHTML: RegistrationDate }),
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

function removeNodes(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
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
      data: JSON.stringify({ userName: value }),
      success: (data) => {
        const tbody = document.getElementById("UserTable");
        removeNodes(tbody);
        getAllUsers();
      },
      error: (err) => {
        console.log(`Failed: ${operation} ${value}`);
      },
    });
  });
}
let mychart;
function makeBarChart(usersRegistered, title, name) {
  const ctx = document.getElementById(name).getContext("2d");
  const xValues = [];
  for (let i = usersRegistered.length - 1; i >= 2; i--) {
    xValues.push(`${i} Months Ago`);
  }
  xValues.push("Last Month");
  xValues.push("This Month");

  const barColors = usersRegistered.map((value) => "#12E9D5");
  const yValues = usersRegistered;
  if (mychart) mychart.destroy();
  mychart = new Chart(name, {
    type: "bar",

    data: {
      labels: xValues,
      datasets: [
        {
          label: title,
          data: yValues,
          backgroundColor: barColors,
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return value + " Users";
              },
            },
          },
        ],
      },
      title: {
        display: true,
        text: title,
        fontSize: 20,
      },
      hover: {
        display: false,
      },
      yAxes: [
        {
          ticks: {
            max: Math.max(...yValues) + 1,
            beginAtZero: true,
            userCallback: function (label, index, labels) {
              if (Math.floor(label) === label) {
                return label;
              }
            },
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  });
}

function fillChart(months, endpoint, title, name) {
  $.ajax({
    url: host + endpoint,
    type: "POST",
    data: JSON.stringify({ months }),
    success: (data) => {
      makeBarChart(data.months, title, name);
    },
    error: (err) => {
      console.log(err);
    },
  });
}

function genreReport(Genres) {
  const genres = Genres.map((genre) => `${genre.TrackGenre} ${genre.Total}`);
  const ammounts = Genres.map((genre) => genre.Total);
  const getRandomColor = () => {
    return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
  };

  const barColors = genres.map((genre) => {
    return getRandomColor();
  });
  const options = {
    title: {
      display: true,
      text: "Genres",
      fontSize: 20,
    },
    tooltips: {
      enabled: true,
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = ctx.dataset._meta[0].total;
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "#fff",
      },
    },
  };
  new Chart("genre-chart", {
    type: "pie",
    data: {
      labels: genres,
      datasets: [
        {
          backgroundColor: barColors,
          data: ammounts,
        },
      ],
    },
    options: options,
  });
}

function getGenres() {
  $.ajax({
    url: host + "genreReport",
    type: "POST",
    data: JSON.stringify({}),
    success: (data) => {
      genreReport(data.genres);
    },
    error: (err) => {
      console.log(err);
    },
  });
}

function turnOnUsers() {
  const table_wrapper = document.getElementById("table-wrapper");
  const chart_wrapper = document.getElementById("genre-wrapper");
  const tracks_wrapper = document.getElementById("tracks-wrapper");
  table_wrapper.style.display = "block";
  tracks_wrapper.style.display = "none";
  chart_wrapper.style.display = "none";
  fillChart(
    13,
    "usersRegisteredReport",
    "Users Registered",
    "Users-Registered"
  );
}

function turnOnGenre() {
  const table_wrapper = document.getElementById("table-wrapper");
  const chart_wrapper = document.getElementById("genre-wrapper");
  const tracks_wrapper = document.getElementById("tracks-wrapper");

  table_wrapper.style.display = "none";
  chart_wrapper.style.display = "block";
  tracks_wrapper.style.display = "none";

}

function turnOnTracks() {
  const table_wrapper = document.getElementById("table-wrapper");
  const chart_wrapper = document.getElementById("genre-wrapper");
  const tracks_wrapper = document.getElementById("tracks-wrapper");

  table_wrapper.style.display = "none";
  chart_wrapper.style.display = "none";
  tracks_wrapper.style.display = "block";
  fillChart(
    13,
    "TracksAddedReport",
    "Tracks Uploaded Past 12 Months",
    "tracks-uploaded-chart"
  );
}

let artistChart;
function makeArtistChart(uploads, title, name) {
  const ctx = document.getElementById(name).getContext("2d");
  const xValues = [];
  for (let i = uploads.length - 1; i >= 2; i--) {
    xValues.push(`${i} Months Ago`);
  }
  xValues.push("Last Month");
  xValues.push("This Month");

  const barColors = uploads.map((value) => "#12E9D5");
  const yValues = uploads;
  if (artistChart) artistChart.destroy();
  artistChart = new Chart(name, {
    type: "bar",

    data: {
      labels: xValues,
      datasets: [
        {
          label: title,
          data: yValues,
          backgroundColor: barColors,
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return value + " Tracks";
              },
            },
          },
        ],
      },
      title: {
        display: true,
        text: title,
        fontSize: 20,
      },
      hover: {
        display: false,
      },
      yAxes: [
        {
          ticks: {
            max: Math.max(...yValues) + 1,
            beginAtZero: true,
            userCallback: function (label, index, labels) {
              if (Math.floor(label) === label) {
                return label;
              }
            },
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  });
}


function makeArtistUploadsReport(artistName){
  $.ajax({
    url: host + "getUploadsPerMonthForArtist",
    type: "POST",
    data: JSON.stringify({artistName, months: 13}),
    success: (data) => {
      makeArtistChart(data.months, `${artistName} Uploads`, "artist-uploads-chart");
    },
    error: (err) => {
      console.log(err);
    },
  });

}

document.addEventListener("DOMContentLoaded", () => {
  getAllUsers();
  getGenres();
  fillChart(
    13,
    "usersRegisteredReport",
    "Users Registered",
    "Users-Registered"
  );
  fillChart(
    13,
    "TracksAddedReport",
    "Tracks Uploaded Past 12 Months",
    "tracks-uploaded-chart"
  );

  const table_wrapper = document.getElementById("table-wrapper");
  table_wrapper.style.display = "none";

  const tracks_wrapper = document.getElementById("tracks-wrapper");
  tracks_wrapper.style.display = "none";

  const months_number = document.getElementById("months-number");
  months_number.addEventListener("change", (e) => {
    const months = e.target.value;

    if (months > 13) months = 13;
    if (months < 2) months = 2;

    fillChart(
      months,
      "usersRegisteredReport",
      "Users Registered",
      "Users-Registered"
    );
  });

  const artist_name = document.getElementById("artist-name");
  artist_name.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      makeArtistUploadsReport(artist_name.value);
    }
  })
});
