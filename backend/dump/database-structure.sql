CREATE SCHEMA IF NOT EXISTS MusicLibrary;

USE MusicLibrary;

CREATE TABLE
    IF NOT EXISTS Users (
        UserID INT NOT NULL AUTO_INCREMENT,
        Username VARCHAR(50) NOT NULL UNIQUE,
        UserPassword VARCHAR(50) NOT NULL,
        PRIMARY KEY (UserID)
    );


CREATE TABLE
    IF NOT EXISTS UserType (
        PRIMARY KEY (TypeID),
        TypeID INT NOT NULL,
        UsersType ENUM("Admin", "Arist", "User") NOT NULL,
        FOREIGN KEY (UserID) REFERENCES Users(UserID)        
    );

CREATE TABLE
    IF NOT EXISTS Playlist (
        PlaylistID INT NOT NULL AUTO_INCREMENT,
        UserID INT NOT NULL,
        PlaylistName VARCHAR(50) NOT NULL,
        PRIMARY KEY (PlaylistID),
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );

CREATE TABLE
    IF NOT EXISTS Libraries (
        PRIMARY KEY (LibraryID, LibraryName),
        ArtistID INT NOT NULL,
        LibraryID INT NOT NULL AUTO_INCREMENT,
        LibraryName VARCHAR(20) NOT NULL,
        FOREIGN KEY (ArtistID) REFERENCES Users(UserID)
    );


CREATE TABLE
    IF NOT EXISTS Tracks (
        PRIMARY KEY (TrackID, TrackName),
        TrackID INT NOT NULL AUTO_INCREMENT,
        TrackName VARCHAR(20) NOT NULL UNIQUE,
        ArtistID INT NOT NULL,
        ArtistName VARCHAR(20) NOT NULL,
        TrackLength INT NOT NULL,
        NumRatings INT,
        AverageRating INT,
        TrackGenre VARCHAR(20),
        LibraryID INT NOT NULL,
        LibraryName VARCHAR(20) NOT NULL,
        Link VARCHAR(500) NOT NULL,
        PlaylistID INT NOT NULL,
        FOREIGN KEY (PlaylistID) REFERENCES Playlists(PlaylistID),
        FOREIGN KEY (LibraryID, LibraryName) REFERENCES Libraries(LibraryID, LibraryName),
        FOREIGN KEY (ArtistID) REFERENCES Users(UserID)
        
    );




CREATE TRIGGER IF NOT EXISTS user_trigger AFTER INSERT ON Users
    FOR EACH ROW
    BEGIN
        IF (NEW.Username LIKE '%Admin%') THEN
            UPDATE Users SET Username = REPLACE(NEW.Username, "Admin", "") WHERE UserID = NEW.UserID;
            INSERT INTO UserType (TypeID, UsersType) VALUES (NEW.UserID, "Admin");
        END IF;
        IF (NEW.Username LIKE '%Arist%') THEN
            UPDATE Users SET Username = REPLACE(NEW.Username, "Arist", "") WHERE UserID = NEW.UserID;
            INSERT INTO UserType (TypeID, UsersType) VALUES (NEW.UserID, "Arist");
        END IF;
        IF (NEW.Username LIKE '%User%') THEN
            UPDATE Users SET Username = REPLACE(NEW.Username, "User", "") WHERE UserID = NEW.UserID;
            INSERT INTO UserType (TypeID, UsersType) VALUES (NEW.UserID, "User");
        END IF;
    END;
