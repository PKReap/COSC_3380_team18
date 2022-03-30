DROP SCHEMA MusicLibrary;
CREATE SCHEMA IF NOT EXISTS MusicLibrary;

USE MusicLibrary;

CREATE TABLE
    IF NOT EXISTS Users (
        UserID INT NOT NULL AUTO_INCREMENT,
        Username VARCHAR(50) NOT NULL UNIQUE,
        UserPassword VARCHAR(50) NOT NULL,
        UserType ENUM("Admin", "Arist", "User") NOT NULL,
        PRIMARY KEY (UserID)
    );


CREATE TABLE
    IF NOT EXISTS Playlists (
        PlaylistID INT NOT NULL AUTO_INCREMENT,
        UserID INT NOT NULL,
        PlaylistName VARCHAR(50) NOT NULL,
        PlaylistLength TIME,
        PRIMARY KEY (PlaylistID),
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );

CREATE TABLE
    IF NOT EXISTS Libraries (
        PRIMARY KEY (LibraryID),
        ArtistID INT NOT NULL,
        LibraryID INT NOT NULL AUTO_INCREMENT,
        LibraryName VARCHAR(200) NOT NULL,
        LibraryLength TIME,
        FOREIGN KEY (ArtistID) REFERENCES Users(UserID)
    );


CREATE TABLE
    IF NOT EXISTS Tracks (
        PRIMARY KEY (TrackID),
        TrackID INT NOT NULL AUTO_INCREMENT,
        TrackName VARCHAR(50) NOT NULL UNIQUE,
        ArtistID INT NOT NULL,
        TrackLength TIME,
        Likes INT,
        AverageRating DECIMAL(3,2),
        TrackGenre VARCHAR(50),
        LibraryID INT,
        PlaylistID INT,
        Link VARCHAR(500) NOT NULL,
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
        Rating INT,
        FOREIGN KEY (UserID) REFERENCES Users(UserID),
        FOREIGN KEY (TrackID) REFERENCES Tracks(TrackID)
    );

INSERT INTO Users (Username, UserPassword, UserType) VALUES ("Arist1", "Password123", "Arist");
INSERT INTO Users (Username, UserPassword, UserType) VALUES ("User1", "Password123", "User");
INSERT INTO Users (Username, UserPassword, UserType) VALUES ("Admin1", "Password123", "Admin");

-- Artist1 makes a library named "Dance Dance Revolution"

INSERT INTO Libraries (LibraryName, ArtistID, LibraryLength ) VALUES ("Dance Dance Revolution", 1, 0);
INSERT INTO Libraries (LibraryName, ArtistID, LibraryLength) VALUES ("Electric Boogaloo", 1, 0);


-- trigger to add rating to track

delimiter //
CREATE TRIGGER update_avg_insert
    AFTER INSERT ON TrackRatings
    FOR EACH ROW
    BEGIN
        UPDATE Tracks
        SET AverageRating = (SELECT AVG(Rating) FROM TrackRatings WHERE TrackID = NEW.TrackID)
        WHERE TrackID = NEW.TrackID;
        UPDATE Tracks
        SET Likes = (SELECT COUNT(Rating) FROM TrackRatings WHERE TrackID = NEW.TrackID AND Rating = 1) 
        WHERE TrackID = NEW.TrackID;
    END //


delimiter //
CREATE TRIGGER update_avg_update
    AFTER UPDATE ON TrackRatings
    FOR EACH ROW
    BEGIN
        UPDATE Tracks
        SET AverageRating = (SELECT AVG(Rating) FROM TrackRatings WHERE TrackID = NEW.TrackID)
        WHERE TrackID = NEW.TrackID;
        UPDATE Tracks
        SET Likes = (SELECT COUNT(Rating) FROM TrackRatings WHERE TrackID = NEW.TrackID AND Rating = 1) 
        WHERE TrackID = NEW.TrackID;
    END //


delimiter //
CREATE TRIGGER update_playlist_length
    AFTER INSERT ON Tracks
    FOR EACH ROW
    BEGIN
        UPDATE Playlists
        SET PlaylistLength = PlaylistLength + NEW.TrackLength
        WHERE PlaylistID = NEW.PlaylistID;
        UPDATE Libraries
        SET LibraryLength = LibraryLength + NEW.TrackLength
        WHERE LibraryID = NEW.LibraryID;
    END; //

delimiter ;

--  "https://www.proudmusiclibrary.com/en/file/preview_download/?did=SGVXSGR1aVN5QXhCQUdlWGtUVldMQT09"
INSERT INTO Tracks (TrackName, ArtistID, TrackLength, Likes, AverageRating, TrackGenre, LibraryID, PlaylistID, Link) 
VALUES ("Moonlight Sonata", 1,  "00:05:02", 0, 0, "Classical", 1, NULL, "https://www.proudmusiclibrary.com/en/file/preview_download/?did=SGVXSGR1aVN5QXhCQUdlWGtUVldMQT09");


-- Add a rating to a track
INSERT INTO TrackRatings (UserID, TrackID, Rating) VALUES (1, 1, 1);
INSERT INTO TrackRatings (UserID, TrackID, Rating) VALUES (2, 1, 0);
UPDATE TrackRatings SET Rating = 1 WHERE UserID = 2 AND TrackID = 1;
SELECT * from Tracks