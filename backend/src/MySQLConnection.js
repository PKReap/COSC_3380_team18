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
    const { UserID, UserType } = result.users;

    const response = {
      validation: result.length > 0,
      UserID,
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
  const { userID } = args;
  const sql = `UPDATE Users SET UserType = ${UserTypes.Artist} WHERE UserID = ${userID}`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error making user an Artist" });
    else callback({ success: "Artist succfully made" });
  });
}

function makeUser(args, callback) {
  const { userID } = args;
  const sql = `UPDATE Users SET UserType = ${UserTypes.User} WHERE UserID = ${userID}`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error updating to User" });
    else callback({ success: "User succfully updated" });
  });
}

function makeAdmin(args, callback) {
  const { userID } = args;
  const sql = `UPDATE Users SET UserType = ${UserTypes.Admin} WHERE UserID = ${userID}`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error updating to Admin" });
    else callback({ success: "Admin succfully updated" });
  });
}

function deleteUser(args, callback) {
  const { userID } = args;
  const sql = `UPDATE Users SET IsDeleted = 1 WHERE UserID = ${userID}`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error deleting user" });
    else callback({ success: "User succfully deleted" });
  });
}

function getAllTracks(args, callback) {
  //  get all from the join of 3 tables Users, Tracks and Libraries
  const sql =
    "SELECT Username,TrackName, Link, TrackID, LibraryName, TrackGenre, AverageRating, Tracks.IsDeleted FROM Users, Tracks, Libraries WHERE Users.UserID = Libraries.ArtistID AND Tracks.LibraryID = Libraries.LibraryID";
  query(sql, (result) => {
    const response = {
      tracks: result.filter((track) => track.IsDeleted === 0),
    };
    callback(response);
  });
}

function updateTrackRating(args, callback) {
  const { userID, trackID, rating } = args;
  const sql = `UPDATE TrackRatings SET Rating = ${rating} WHERE UserID = ${userID} AND TrackID = ${trackID}`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error updating track rating" });
    else callback({ success: "Track rating succfully updated" });
  });
}

function createPlaylist(args, callback) {
  const { userID, playlistName } = args;
  const sql = `INSERT INTO Playlists (UserID, PlaylistName) VALUES (${userID}, '${playlistName}')`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error creating playlist" });
    else callback({ success: "Playlist succfully created" });
  });
}



function insertTrackIntoPlaylist(args, callback) {
  const { userID, playlistName, trackIDs } = args;
  if(trackIDs.length === 0) {
    callback({ error: "No tracks selected" });
    return;
  }
  const checkUserAlreadyHasPlaylist = `SELECT * FROM Playlists WHERE UserID = ${userID} AND PlaylistName = '${playlistName}'`;
  query(checkUserAlreadyHasPlaylist, (result) => {
    if (result.length > 0) {
      callback({ error: "User already has playlist with that name" });
      return;
    }
    const insertPlaylist = `INSERT INTO Playlists (UserID, PlaylistName) VALUES (${userID}, '${playlistName}')`;
    query(insertPlaylist, (error, result) => {
        const getHighestPlaylistID = `SELECT MAX(PlaylistID) AS PlaylistID FROM Playlists WHERE UserID = ${userID}`;
        query(getHighestPlaylistID, (result) => {
          const { PlaylistID } = result[0];
          trackIDs.forEach((trackID) => {
            const getTrackInfo = `SELECT * FROM Tracks WHERE TrackID = ${trackID}`;
            query(getTrackInfo, (result) => {
              const {TrackName, ArtistID, TrackGenre, Link} = result[0];
              const insertTrack = `INSERT INTO Tracks (TrackName, ArtistID, TrackGenre, Link, PlaylistID) VALUES ('${TrackName}', ${ArtistID}, '${TrackGenre}', '${Link}', ${PlaylistID})`;
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
  updateTrackRating,
  createPlaylist,
  insertTrackIntoPlaylist,
};
