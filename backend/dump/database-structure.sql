DROP SCHEMA MusicLibrary;
CREATE SCHEMA IF NOT EXISTS MusicLibrary;

USE MusicLibrary;

CREATE TABLE
    IF NOT EXISTS Users (
        UserID INT NOT NULL AUTO_INCREMENT,
        Username VARCHAR(50) NOT NULL UNIQUE,
        UserPassword VARCHAR(50) NOT NULL,
        UserType ENUM("Admin", "Arist", "User") NOT NULL,
        IsDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        PRIMARY KEY (UserID)
    );


CREATE TABLE
    IF NOT EXISTS Playlists (
        PlaylistID INT NOT NULL AUTO_INCREMENT,
        UserID INT NOT NULL,
        PlaylistName VARCHAR(50) NOT NULL,
        SizeLimit INT DEFAULT 10,
        IsDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        PRIMARY KEY (PlaylistID),
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );

CREATE TABLE
    IF NOT EXISTS Libraries (
        PRIMARY KEY (LibraryID),
        ArtistID INT NOT NULL,
        LibraryID INT NOT NULL AUTO_INCREMENT,
        LibraryName VARCHAR(200) NOT NULL,
        IsDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (ArtistID) REFERENCES Users(UserID)
    );


CREATE TABLE
    IF NOT EXISTS Tracks (
        PRIMARY KEY (TrackID),
        TrackID INT NOT NULL AUTO_INCREMENT,
        TrackName VARCHAR(50) NOT NULL,
        ArtistID INT NOT NULL,
        Rating INT DEFAULT 0,
        AverageRating DECIMAL(3,2) DEFAULT 0,
        TrackGenre VARCHAR(50),
        LibraryID INT DEFAULT NULL,
        PlaylistID INT DEFAULT NULL,
        Link VARCHAR(500) NOT NULL,
        IsDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (PlaylistID) REFERENCES Playlists(PlaylistID),
        FOREIGN KEY (LibraryID) REFERENCES Libraries(LibraryID),
        FOREIGN KEY (ArtistID) REFERENCES Users(UserID)
        
    );

CREATE TABLE 
    IF NOT EXISTS TrackRatings (
        PRIMARY KEY (RatingID),
        RatingID INT NOT NULL AUTO_INCREMENT,
        UserID INT NOT NULL,
        TrackID INT NOT NULL,
        Rating INT DEFAULT 0,
        IsDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (UserID) REFERENCES Users(UserID),
        FOREIGN KEY (TrackID) REFERENCES Tracks(TrackID)
    );

INSERT INTO Users (Username, UserPassword, UserType) VALUES ("Arist1", "Password123", "Arist");
INSERT INTO Users (Username, UserPassword, UserType) VALUES ("User1", "Password123", "User");
INSERT INTO Users (Username, UserPassword, UserType) VALUES ("Admin1", "Password123", "Admin");

-- Artist1 makes a library named "Dance Dance Revolution"

INSERT INTO Libraries (LibraryName, ArtistID) VALUES ("Dance Dance Revolution", 1);
INSERT INTO Libraries (LibraryName, ArtistID) VALUES ("Electric Boogaloo", 1);

INSERT INTO Playlists (PlaylistName, UserID) VALUES ("Playlist1", 1);
INSERT INTO Playlists (PlaylistName, UserID) VALUES ("Playlist2", 1);




delimiter //
CREATE TRIGGER update_avg_insert
    AFTER INSERT ON TrackRatings
    FOR EACH ROW
    BEGIN
        UPDATE Tracks
        SET AverageRating = (SELECT AVG(Rating) FROM TrackRatings WHERE TrackID = NEW.TrackID AND IsDeleted = 0)
        WHERE TrackID = NEW.TrackID;
        UPDATE Tracks
        SET Rating = (SELECT COUNT(Rating) FROM TrackRatings WHERE TrackID = NEW.TrackID AND Rating > 0 AND IsDeleted = 0) 
        WHERE TrackID = NEW.TrackID;
    END //


delimiter //
CREATE TRIGGER update_avg_update
    AFTER UPDATE ON TrackRatings
    FOR EACH ROW
    BEGIN
        UPDATE Tracks
        SET AverageRating = (SELECT AVG(Rating) FROM TrackRatings WHERE TrackID = NEW.TrackID AND IsDeleted = 0)
        WHERE TrackID = NEW.TrackID;
        UPDATE Tracks
        SET Rating = (SELECT COUNT(Rating) FROM TrackRatings WHERE TrackID = NEW.TrackID AND Rating > 0 AND IsDeleted = 0) 
        WHERE TrackID = NEW.TrackID;
    END //


delimiter //
CREATE TRIGGER insert_playlist_limit
    AFTER INSERT ON TrackRatings
    FOR EACH ROW
    BEGIN
        UPDATE Playlists
        SET SizeLimit = 10 + (SELECT COUNT(RatingID) FROM TrackRatings WHERE UserID = NEW.UserID AND IsDeleted = 0  AND Rating > 0)
        WHERE UserID = NEW.UserID AND IsDeleted = 0;
    END; //
delimiter ;

delimiter //
CREATE TRIGGER update_playlist_limit
    AFTER UPDATE ON TrackRatings
    FOR EACH ROW
    BEGIN
        UPDATE Playlists
        SET SizeLimit = 10 + (SELECT COUNT(RatingID) FROM TrackRatings WHERE UserID = NEW.UserID AND IsDeleted = 0 AND Rating > 0)
        WHERE UserID = NEW.UserID AND IsDeleted = 0;
    END; //
delimiter ;



--  "https://www.proudmusiclibrary.com/en/file/preview_download/?did=SGVXSGR1aVN5QXhCQUdlWGtUVldMQT09"
INSERT INTO Tracks (TrackName, ArtistID, TrackGenre, LibraryID, Link) 
VALUES ("Moonlight Sonata", 1, "Classical", 1, "https://www.proudmusiclibrary.com/en/file/preview_download/?did=SGVXSGR1aVN5QXhCQUdlWGtUVldMQT09");

INSERT INTO Tracks (TrackName, ArtistID, TrackGenre, LibraryID, Link)
VALUES("Dubstep", 1, "Electronic", 2, "https://www.bensound.com/bensound-music/bensound-dubstep.mp3");

INSERT INTO Tracks (TrackName, ArtistID, TrackGenre, LibraryID, Link)
VALUES("Better Days", 1, "Contry", 1,"https://www.bensound.com/bensound-music/bensound-betterdays.mp3");
 
INSERT INTO Tracks (TrackName, ArtistID, TrackGenre, LibraryID, Link)
VALUES("Funny Song", 1, "Parody", 2,"https://www.bensound.com/bensound-music/bensound-funnysong.mp3");

INSERT INTO Tracks (TrackName, ArtistID, TrackGenre, LibraryID, Link)
VALUES("Slow Motion", 1, "Ambiance", 1, "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3");

INSERT INTO Tracks (TrackName, ArtistID, TrackGenre, LibraryID, Link)
VALUES("Adventure", 1, "Ambiance", 1, "https://www.bensound.com/bensound-music/bensound-adventure.mp3");

INSERT INTO Tracks (TrackName, ArtistID, TrackGenre, LibraryID, Link)
VALUES("Inspire", 1, "Ambiance", 1,  "https://www.bensound.com/bensound-music/bensound-inspire.mp3");

INSERT INTO Tracks (TrackName, ArtistID, TrackGenre, LibraryID, Link)
VALUES("Evolution", 1, "Ambiance", 1, "https://www.bensound.com/bensound-music/bensound-evolution.mp3");

INSERT INTO Tracks (TrackName, ArtistID, TrackGenre, LibraryID, Link)
VALUES("Piano Moment", 1, "Classical", 1, "https://www.bensound.com/bensound-music/bensound-pianomoment.mp3");

INSERT INTO Tracks (TrackName, ArtistID, TrackGenre, LibraryID, Link)
VALUES("Dance", 1, "Pop", 1, "https://www.bensound.com/bensound-music/bensound-dance.mp3");


-- Add a rating to a track
INSERT INTO TrackRatings (UserID, TrackID, Rating) VALUES (1, 1, 1);
UPDATE TrackRatings SET Rating = 0 WHERE RatingID = 1;
SELECT * from Tracks