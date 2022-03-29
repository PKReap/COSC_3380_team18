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
        PlaylistLength DECIMAL(5,2) NOT NULL,
        PRIMARY KEY (PlaylistID),
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );

CREATE TABLE
    IF NOT EXISTS Libraries (
        PRIMARY KEY (LibraryID),
        ArtistID INT NOT NULL,
        LibraryID INT NOT NULL AUTO_INCREMENT,
        LibraryName VARCHAR(200) NOT NULL,
        LibraryLength DECIMAL(5,2),
        FOREIGN KEY (ArtistID) REFERENCES Users(UserID)
    );


CREATE TABLE
    IF NOT EXISTS Tracks (
        PRIMARY KEY (TrackID, TrackName),
        TrackID INT NOT NULL AUTO_INCREMENT,
        TrackName VARCHAR(50) NOT NULL UNIQUE,
        ArtistID INT NOT NULL,
        ArtistName VARCHAR(50) NOT NULL,
        TrackLength DECIMAL(5,2) NOT NULL,
        Likes INT,
        Dislikes INT,
        AverageRating INT,
        TrackGenre VARCHAR(50),
        LibraryID INT,
        Link VARCHAR(500) NOT NULL,
        PlaylistID INT,
        FOREIGN KEY (PlaylistID) REFERENCES Playlists(PlaylistID),
        FOREIGN KEY (LibraryID) REFERENCES Libraries(LibraryID),
        FOREIGN KEY (ArtistID) REFERENCES Users(UserID)
        
    );

INSERT INTO Users (Username, UserPassword, UserType) VALUES ("Arist1", "Password123", "Arist");
INSERT INTO Users (Username, UserPassword, UserType) VALUES ("User1", "Password123", "User");
INSERT INTO Users (Username, UserPassword, UserType) VALUES ("Admin1", "Password123", "Admin");

-- Artist1 makes a library named "Dance Dance Revolution"

INSERT INTO Libraries (LibraryName, ArtistID) VALUES ("Dance Dance Revolution", 1);
INSERT INTO Libraries (LibraryName, ArtistID) VALUES ("Electric Boogaloo", 1);


-- User1 adds a track to his library
delimiter //
CREATE TRIGGER calc_avg_rating
    AFTER INSERT ON Tracks
    FOR EACH ROW
    BEGIN
        UPDATE Tracks
        SET AverageRating = Likes / (Likes + Dislikes) * 100
        WHERE TrackID = NEW.TrackID;
    END; //

delimiter ;

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

