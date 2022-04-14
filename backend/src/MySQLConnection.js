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
    if (result.length > 0) {
      const { Username, UserType } = result[0];
      callback({
        validation: "User logged in successfully",
        username: Username,
        userType: UserType,
      });
    } else {
      callback({ validation: "Invalid username or password" });
    }

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
  const sql = "SELECT * FROM Library_Tracks_View ORDER BY AverageRating * (SELECT COUNT(TrackID) FROM TrackRatings WHERE TrackID = Library_Tracks_View.TrackID AND Rating > 0) DESC";
  query(sql, (result) => {
    const response = {
      tracks: result,
    };
    callback(response);
  });
}

function createPlaylist(args, callback) {
  const { username, playlistName } = args;
  const getPlaylistLimit = `SELECT * FROM Users WHERE Username = "${username}"`;
  query(getPlaylistLimit, (result) => {
    const playlistLimit = result[0].PlaylistLimit;
    const checkHowManyPlaylists = `SELECT * FROM Playlists WHERE Username = "${username}"`;
    query(checkHowManyPlaylists, (result) => {
      if (result.length >= playlistLimit) {
        callback({ message: "You have reached your playlist limit" });
        return;
      }
      const sql = `INSERT INTO Playlists (Username, PlaylistName) VALUES ("${username}", '${playlistName}')`;
      const checkIfPlaylistExists = `SELECT * FROM Playlists WHERE Username = "${username}" AND PlaylistName = '${playlistName}'`;
      query(checkIfPlaylistExists, (result) => {
        if (result.length > 0) {
          callback({ message: "Playlist already exists" });
          return;
        } else {
          query(sql, (error, result) => {
            callback({ message: "Playlist created successfully" });
          });
        }
      });
    });
  });
}

function insertTrackIntoPlaylist(args, callback) {
  const { username, playlistName, trackID } = args;
  const checkUserAlreadyHasPlaylist = `SELECT * FROM Playlists WHERE Username = "${username}" AND PlaylistName = '${playlistName}'`;
  query(checkUserAlreadyHasPlaylist, (result) => {
    if (result.length === 0) {
      callback({ message: "User does not have playlist" });
    } else {
      const getPlaylistID = `SELECT PlaylistID FROM Playlists WHERE Username = "${username}" AND PlaylistName = '${playlistName}'`;
      query(getPlaylistID, (result) => {
        const playlistID = result[0].PlaylistID;
        const sql = `INSERT INTO Playlist_Tracks (PlaylistID, TrackID) VALUES (${playlistID}, ${trackID})`;
        query(sql, (result) => {
          const checkIfRatingExists = `SELECT * FROM TrackRatings WHERE TrackID = ${trackID} AND Username = "${username}"`;
          query(checkIfRatingExists, (result) => {
            if (result.length === 0) {
              const sql = `INSERT INTO TrackRatings (TrackID, Username, Rating) VALUES (${trackID}, "${username}", 0)`;
              query(sql, (result) => {
                callback({ message: "Track succfully added to playlist" });
              });
            } else {
              callback({ message: "Track succfully added to playlist" });
            }
          });
        });
      });
    }
  });
}

function userGetAllPlaylists(args, callback) {
  const { username } = args;
  const getAllPlaylistIDs = `SELECT PlaylistID FROM Playlists WHERE Username = "${username}" AND IsDeleted = False`;
  query(getAllPlaylistIDs, (result) => {
    const getAllUsersTracks = `SELECT * FROM Playlists WHERE Username = "${username}" AND IsDeleted = False`;
    query(getAllUsersTracks, (result) => {
      const response = {
        playlists: result.filter((playlist) => playlist.IsDeleted === 0),
      };
      callback(response);
    });
  });
}

function getAllTracksForPlaylist(args, callback) {
  const { playlistID, username } = args;
  const sql = `SELECT * FROM Playlist_Tracks_View JOIN TrackRatings ON Playlist_Tracks_View.TrackID = TrackRatings.TrackID WHERE TrackRatings.Username = '${username}' AND PlaylistID = ${playlistID} AND TrackRatings.IsDeleted = False`;
  query(sql, (result) => {
    const response = {
      tracks: result.filter((track) => track.IsDeleted === 0),
    };
    callback(response);
  });
}

function upload(args, callback) {
  const { b64Music, b64IMG, name, libraryName, trackGenre, artistName } = args;
  const fs = require("fs");
  const decodedMusic = Buffer.from(b64Music, "base64");
  const decodedIMG = Buffer.from(b64IMG, "base64");
  const musicpath = "../frontend/music/";
  const imgpath = "../frontend/img/";
  const host = "http://uhmusic.xyz/";
  const musicFileLink = `${host}music/${name}.mp3`;
  const imgFileLink = `${host}img/${name}.jpg`;
  fs.writeFile(musicpath + name + ".mp3", decodedMusic, "binary", (err) => {
    if (err) callback({ error: "Error uploading file" });
    fs.writeFile(imgpath + name + ".jpg", decodedIMG, "binary", (err) => {
      if (err) callback({ error: "Error uploading file" });
      const insertTrack = `INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, Link, LibraryName, IMG) VALUES ('${name}', '${artistName}', '${trackGenre}', '${musicFileLink}', '${libraryName}', '${imgFileLink}')`;
      query(insertTrack, (result) => {
        const getNewTrackID = `SELECT TrackID FROM Tracks WHERE TrackName = '${name}' AND ArtistName = '${artistName}' AND LibraryName = '${libraryName}'`;
        query(getNewTrackID, (result) => {
          const trackID = result[0].TrackID;
          const getLibraryID = `SELECT LibraryID FROM Libraries WHERE LibraryName = '${libraryName}' AND ArtistName = '${artistName}'`;
          query(getLibraryID, (result) => {
            const libraryID = result[0].LibraryID;
            const insertTrackIntoLibrary = `INSERT INTO Library_Tracks (LibraryID, TrackID) VALUES (${libraryID}, ${trackID})`;
            query(insertTrackIntoLibrary, (result) => {
              callback({ success: "Track succfully uploaded" });
            });
          });
        });
      });
    });
  });
}

function userRatesTrack(args, callback) {
  const { username, trackID, rating } = args;
  const sql = `UPDATE TrackRatings SET Rating = ${rating} WHERE TrackID = ${trackID} AND Username = '${username}' AND IsDeleted = False`;
  query(sql, (result) => {
    callback({ success: "Track succfully rated" });
  });
}
function createLibrary(args, callback) {
  const { username, libraryName } = args;
  const sql = `INSERT INTO Libraries (LibraryName, ArtistName) VALUES ('${libraryName}', '${username}')`;
  query(sql, (result) => {
    callback({ success: "Library succfully created" });
  })
}

function deleteLibrary(args, callback) {
  const { username, libraryName } = args;
  const sql = `UPDATE Libraries SET IsDeleted = True WHERE LibraryName = '${libraryName}' AND ArtistName = '${username}'`;
  query(sql, (result) => {
    callback({ success: `${libraryName} successfully deleted` });
  })
}

function deletePlaylist(args, callback) {
  const { username, playlistName } = args;
  const sql = `UPDATE Playlists SET IsDeleted = True WHERE PlaylistName = '${playlistName}' AND Username = '${username}'`;
  query(sql, (result) => {
    callback({ success: `${playlistName} successfully deleted` });
  })
}


function deleteTrack(args, callback) {
  const { trackID } = args;
  const sql = `UPDATE Tracks SET IsDeleted = True WHERE TrackID = ${trackID}`;
  query(sql, (result) => {
    callback({ success: "Track succfully deleted" });
  })
}

function getTrackByID(args, callback) {
  const { trackID } = args;
  const sql = `SELECT * FROM Library_Tracks_View WHERE TrackID = ${trackID}`;
  query(sql, (result) => {
    callback({ track: result[0] });
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
  userGetAllPlaylists,
  getAllTracksForPlaylist,
  createPlaylist,
  upload,
  userRatesTrack,
  createLibrary,
  deleteLibrary,
  deletePlaylist,
  deleteTrack,
  getTrackByID
};
