const { query } = require("./connection");

const UserTypes = {
  Admin: 1,
  Artist: 2,
  User: 3,
};

function validateUser(args, callback) {
  const { username, password } = args;
  if ((username + password).match(/[^a-zA-Z0-9]/)) {
    // cleaning the username and password against SQL injection
    callback({ error: "Invalid username or password" });
    return;
  }
  const sql = `SELECT * FROM Users WHERE Username = '${username}' AND UserPassword = '${password}'`;
  query(sql, (result) => {
    const { userName, UserType } = result.users;

    const response = {
      validation: result.length > 0,
      userName,
      UserType,
    };

    callback(response);
  });
}

function getAllUsers(args, callback) {
  const sql = "SELECT * FROM Users";
  query(sql, (result) => {
    const response = {
      users: result.filter((user) => user.IsDeleted === 0),
    };
    callback(response);
  });
}

function registerUser(args, callback) {
  const { username, password } = args;
  if ((username + password).match(/[^a-zA-Z0-9]/)) {
    callback({ error: "Invalid username or password" });
    return;
  }
  if (password.length < 8) {
    callback({ error: "Password must be at least 8 characters" });
    return;
  }
  if (!password.match(/[A-Z]/) || !password.match(/[0-9]/)) {
    callback({
      error:
        "Password must contain at least one uppercase letter and one number",
    });
    return;
  }
  const checkUserName = `SELECT * FROM Users WHERE Username = '${username}'`;
  query(checkUserName, (result) => {
    if (result.length > 0) {
      callback({ error: "Username already exists" });
      return;
    }

    const sql = `INSERT INTO Users (Username, UserPassword) VALUES ('${username}', '${password}')`;
    query(sql, (error, result) => {
      if (error) callback({ error: "Error registering user" });
      else callback({ success: "User registered successfully" });
    });
  });
}

function makeArtist(args, callback) {
  const { userName } = args;
  const sql = `UPDATE Users SET UserType = ${UserTypes.Artist} WHERE Username = "${userName}"`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error making user an Artist" });
    else callback({ success: "Artist succfully made" });
  });
}

function makeUser(args, callback) {
  const { userName } = args;
  const sql = `UPDATE Users SET UserType = ${UserTypes.User} WHERE Username = "${userName}"`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error updating to User" });
    else callback({ success: "User succfully updated" });
  });
}

function makeAdmin(args, callback) {
  const { userName } = args;
  const sql = `UPDATE Users SET UserType = ${UserTypes.Admin} WHERE Username = "${userName}"`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error updating to Admin" });
    else callback({ success: "Admin succfully updated" });
  });
}

function deleteUser(args, callback) {
  const { userName } = args;
  const sql = `UPDATE Users SET IsDeleted = 1 WHERE Username = ${userName}`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error deleting user" });
    else callback({ success: "User succfully deleted" });
  });
}

function getAllTracks(args, callback) {
  const sql = "SELECT TrackName, TrackID , Tracks.ArtistName, TrackGenre, AverageRating, LibraryName, Link From Tracks , Libraries WHERE Tracks.LibraryID = Libraries.LibraryID AND Tracks.IsDeleted = 0";
  query(sql, (result) => {
    const response = {
      tracks: result,
    };
    callback(response);
  });
}

function createPlaylist(args, callback) {
  const { username, playlistName } = args;
  const sql = `INSERT INTO Playlists (Username, PlaylistName) VALUES ("${username}", '${playlistName}')`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error creating playlist" });
    else callback({ success: "Playlist succfully created" });
  });
}



function insertTrackIntoPlaylist(args, callback) {
  const { username, playlistName, trackIDs } = args;
  if(trackIDs.length === 0) {
    callback({ error: "No tracks selected" });
    return;
  }
  const checkUserAlreadyHasPlaylist = `SELECT * FROM Playlists WHERE Username = "${username}" AND PlaylistName = '${playlistName}'`;
  query(checkUserAlreadyHasPlaylist, (result) => {
    if (result.length > 0) {
      callback({ error: "User already has playlist with that name" });
      return;
    }
    const insertPlaylist = `INSERT INTO Playlists (Username, PlaylistName) VALUES ("${username}", '${playlistName}')`;
    query(insertPlaylist, (error, result) => {
        const getHighestPlaylistID = `SELECT MAX(PlaylistID) AS PlaylistID FROM Playlists WHERE Username = "${username}"`;
        query(getHighestPlaylistID, (result) => {
          const { PlaylistID } = result[0];
          trackIDs.forEach((trackID) => {
            const getTrackInfo = `SELECT * FROM Tracks WHERE TrackID = ${trackID}`;
            query(getTrackInfo, (result) => {
              const {TrackName, ArtistName, TrackGenre, Link} = result[0];
              const insertTrack = `INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, Link, PlaylistID) VALUES ('${TrackName}', "${ArtistName}", '${TrackGenre}', '${Link}', ${PlaylistID})`;
              query(insertTrack, (error) => {
                if(error) callback({ error: error });
              });
            });
          });
          callback({ success: "Playlist succfully created" });
        });
    });
  });
}


module.exports = {
  validateUser,
  getAllUsers,
  registerUser,
  makeArtist,
  makeUser,
  makeAdmin,
  deleteUser,
  getAllTracks,
  insertTrackIntoPlaylist,
};
