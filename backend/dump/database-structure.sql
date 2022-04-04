DROP SCHEMA MusicLibrary;
CREATE SCHEMA IF NOT EXISTS MusicLibrary;

USE MusicLibrary;

CREATE TABLE
    IF NOT EXISTS Users (
        Username VARCHAR(50) NOT NULL UNIQUE,
        UserPassword VARCHAR(50) NOT NULL,
        UserType ENUM("Admin", "Arist", "User") NOT NULL,
        IsDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        PRIMARY KEY (Username)
    );


CREATE TABLE
    IF NOT EXISTS Playlists (
        PlaylistID INT NOT NULL AUTO_INCREMENT,
        Username VARCHAR(50) NOT NULL,
        PlaylistName VARCHAR(50) NOT NULL,
        SizeLimit INT DEFAULT 10,
        IsDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        PRIMARY KEY (PlaylistID),
        FOREIGN KEY (Username) REFERENCES Users(Username)
    );

CREATE TABLE
    IF NOT EXISTS Libraries (
        PRIMARY KEY (LibraryID),
        ArtistName VARCHAR(50) NOT NULL,
        LibraryID INT NOT NULL AUTO_INCREMENT,
        LibraryName VARCHAR(200) NOT NULL,
        IsDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (ArtistName) REFERENCES Users(Username)
    );


CREATE TABLE
    IF NOT EXISTS Tracks (
        PRIMARY KEY (TrackID),
        TrackID INT NOT NULL AUTO_INCREMENT,
        TrackName VARCHAR(200) NOT NULL,
        ArtistName VARCHAR(50) NOT NULL,
        Rating INT DEFAULT 0,
        AverageRating DECIMAL(3,2) DEFAULT 0,
        TrackGenre VARCHAR(50),
        LibraryID INT DEFAULT NULL,
        PlaylistID INT DEFAULT NULL,
        Link VARCHAR(500) NOT NULL,
        IsDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (PlaylistID) REFERENCES Playlists(PlaylistID),
        FOREIGN KEY (LibraryID) REFERENCES Libraries(LibraryID)
    );

CREATE TABLE 
    IF NOT EXISTS TrackRatings (
        PRIMARY KEY (RatingID),
        RatingID INT NOT NULL AUTO_INCREMENT,
        Username  VARCHAR(50)  NOT NULL,
        ArtistName VARCHAR(50) NOT NULL,
        TrackID INT NOT NULL,
        TrackName VARCHAR(200) NOT NULL,
        Rating INT DEFAULT 0,
        IsDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (TrackID) REFERENCES Tracks(TrackID),
        FOREIGN KEY (Username) REFERENCES Users(Username)
    );

INSERT INTO Users (Username, UserPassword, UserType) VALUES ("Arist1", "Password123", "Arist");
INSERT INTO Users (Username, UserPassword, UserType) VALUES ("User1", "Password123", "User");
INSERT INTO Users (Username, UserPassword, UserType) VALUES ("Admin1", "Password123", "Admin");

-- Artist1 makes a library named "Dance Dance Revolution"

INSERT INTO Libraries (LibraryName, ArtistName) VALUES ("Dance Dance Revolution", "Arist1");
INSERT INTO Libraries (LibraryName, ArtistName) VALUES ("Electric Boogaloo", "Arist1");

INSERT INTO Playlists (PlaylistName, Username) VALUES ("Playlist1", "User1");
INSERT INTO Playlists (PlaylistName, Username) VALUES ("Playlist2", "User1");

-- create trigger to calculate average rating
delimiter //
CREATE TRIGGER calc_avg_rating 
    AFTER INSERT ON TrackRatings
    FOR EACH ROW
    BEGIN
        UPDATE Tracks
        SET AverageRating = (SELECT AVG(Rating) FROM TrackRatings WHERE TrackID = NEW.TrackID)
        WHERE TrackID = NEW.TrackID;
    END; //
delimiter ;

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, LibraryID, Link) 
VALUES ("Moonlight Sonata", "Artist1", "Classical", 1, "https://www.proudmusiclibrary.com/en/file/preview_download/?did=SGVXSGR1aVN5QXhCQUdlWGtUVldMQT09");

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, LibraryID, Link)
VALUES("Dubstep", "Artist1", "Electronic", 2, "https://www.bensound.com/bensound-music/bensound-dubstep.mp3");

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, LibraryID, Link)
VALUES("Better Days", "Artist1", "Contry", 1,"https://www.bensound.com/bensound-music/bensound-betterdays.mp3");
 
INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, LibraryID, Link)
VALUES("Funny Song", "Artist1", "Parody", 2,"https://www.bensound.com/bensound-music/bensound-funnysong.mp3");

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, LibraryID, Link)
VALUES("Slow Motion", "Artist1", "Ambiance", 1, "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3");

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, LibraryID, Link)
VALUES("Adventure", "Artist1", "Ambiance", 1, "https://www.bensound.com/bensound-music/bensound-adventure.mp3");

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, LibraryID, Link)
VALUES("Inspire", "Artist1", "Ambiance", 1, "https://www.bensound.com/bensound-music/bensound-inspire.mp3");

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, LibraryID, Link)
VALUES("Evolution", "Artist1", "Ambiance", 1, "https://www.bensound.com/bensound-music/bensound-evolution.mp3");

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, LibraryID, Link)
VALUES("Piano Moment", "Artist1", "Classical", 1,  "https://www.bensound.com/bensound-music/bensound-pianomoment.mp3");

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, LibraryID, Link)
VALUES("Dance", "Artist1", "Pop", 1, "https://www.bensound.com/bensound-music/bensound-dance.mp3");


INSERT INTO TrackRatings (Username, ArtistName, TrackName, Rating, TrackID) VALUES ("User1", "Artist1", "Moonlight Sonata", 5, 1);

SELECT * from Tracks
