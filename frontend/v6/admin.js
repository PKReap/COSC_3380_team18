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
        const { Username, UserType } = user;
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
      data: JSON.stringify({ userName: value }),
      success: (data) => {
        window.location.reload();
      },
      error: (err) => {
        console.log(`Failed: ${operation} ${value}`);
      },
    });
  });
}

function makeBarChart(usersRegistered, ctx, title) {
  
  const xValues = [];
  for (let i = usersRegistered.length - 1; i >= 2; i--) {
    xValues.push(`${i} Months Ago`);
  }
  xValues.push("Last Month");
  xValues.push("This Month");

  // calc teh average but round it
  const average = Math.round(
    usersRegistered.reduce((a, b) => a + b, 0) / usersRegistered.length
  );
  // lime greee as hex
  const aboveColor = "#53EF29";
  const belowColor = "#FE1818";
  const equalColor = "#12E9D5";

  const asign = (value) => {
    if (value > average) {
      return aboveColor;
    } else if (value < average) {
      return belowColor;
    } else {
      return equalColor;
    }
  };

  const barColors = usersRegistered.map((value) => {
    return asign(value);
  });
  const yValues = usersRegistered;
  // create a bar chart in intervals of integers
  const chart = new Chart(ctx, {
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

      animation: {
        duration: 400,
        onComplete: function () {
          const chartInstance = this.chart,
            ctx = chartInstance.ctx;
          ctx.font = Chart.helpers.fontString(
            16,
            Chart.defaults.global.defaultFontStyle,
            Chart.defaults.global.defaultFontFamily
          );
          ctx.fillStyle = equalColor;

          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(`Average: ${average}`, chartInstance.width * 0.9, 0);
        },
      },
      // add  a title with font size 20
      title: {
        display: true,
        text: title,
        fontSize: 20,
      },

      scales: {
        yAxes: [
          {
            // add numbers on top of the bars
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
      },
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "horizontal",
          scaleID: "y-axis-0",
          value: 5,
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 4,
          label: {
            enabled: false,
            content: "Test label",
          },
        },
      ],
    },
  });
}

function fillChart(months, ctx, endpoint, title) {
  $.ajax({
    url: host + endpoint,
    type: "POST",
    data: JSON.stringify({ months }),
    success: (data) => {
      makeBarChart(data.months, ctx, title);
    },
    error: (err) => {
      console.log(err);
    },
  });
}


function genreReport(Genres, ctx) {
  const genres = Genres.map((genre) => genre.TrackGenre);
  const ammounts = Genres.map((genre) => genre.Total);
  const getRandomColor = () => {
    return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
  };

  const barColors = genres.map((genre) => {
    return getRandomColor();
  });
  console.log(genres);
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
  new Chart("genreChart", {
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

function getGenres(ctx) {
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

document.addEventListener("DOMContentLoaded", () => {
  getAllUsers();
  const genreChart = document.getElementById("genreChart").getContext("2d");
  const barChart2 = document.getElementById("barChar2").getContext("2d");
  const barChar3 = document.getElementById("barChar3").getContext("2d");
  getGenres(genreChart);
  const months_slider = document.getElementById("months-slider");

  months_slider.addEventListener("change", (e) => {
    fillChart(e.target.value, barChart2, "usersRegisteredReport", "Users Registered");
    fillChart(e.target.value, barChar3, "TracksAddedReport", "Tracks Added");
  });
  
  fillChart(6, barChart2, "usersRegisteredReport", "Users Registered");
  fillChart(6, barChar3, "TracksAddedReport", "Tracks Added");
});
