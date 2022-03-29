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
        PRIMARY KEY (UserTypeID),
        TypeID INT NOT NULL AUTO_INCREMENT,
        UserID INT NOT NULL,
        UsersType ENUM("Admin", "Arist", "User") NOT NULL,
        FOREIGN KEY (UserID) REFERENCES Users(UserID)        
    );

CREATE TABLE 
    IF NOT EXISTS Playlists (
        PRIMARY KEY (PlaylistID, PlaylistName),
        UserID INT NOT NULL,
        PlaylistID INT NOT NULL AUTO_INCREMENT,
        PlaylistName VARCHAR(20) NOT NULL,
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
        FOREIGN KEY (LibraryID, LibraryName) REFERENCES Libraries(LibraryID, LibraryName),
        FOREIGN KEY (ArtistID) REFERENCES Users(UserID)
    );

INSERT INTO Users (Username, UserPassword) VALUES ("thien", "userpassword");
INSERT INTO UserType (UserID, UsersType) VALUES (1, "Admin");

CREATE TRIGGER IF NOT EXISTS admin_trigger AFTER INSERT ON Users
    FOR EACH ROW
    BEGIN
        IF (NEW.Username LIKE '%Admin%') THEN
            INSERT INTO UserType (UserID, UsersType) VALUES (NEW.UserID, "Admin");
        END IF;
    END;


-- if user tries to create a playlist with the same name as one of their own playlists delete the playlist
CREATE TRIGGER IF NOT EXISTS playlist_trigger BEFORE INSERT ON Playlists
    FOR EACH ROW
    BEGIN
        SELECT COUNT(*) INTO @count FROM Playlists WHERE PlaylistName = NEW.PlaylistName AND UserID = NEW.UserID;
        IF (@count > 0) THEN
            DELETE FROM Playlists WHERE PlaylistName = NEW.PlaylistName AND UserID = NEW.UserID;
        END IF;
    END;

-- if added user has admin in their name remove admin from their name and make that user an admin
CREATE TRIGGER IF NOT EXISTS admin_trigger AFTER INSERT ON Users
    FOR EACH ROW
    BEGIN
        IF (NEW.Username LIKE '%Admin%') THEN
            UPDATE Users SET Username = REPLACE(NEW.Username, "Admin", "") WHERE UserID = NEW.UserID;
            INSERT INTO UserType (UserID, UsersType) VALUES (NEW.UserID, "Admin");
        END IF;
    END;

-- if added user has arist in their name remove arist from their name and make that user an arist but don't insert into user
CREATE TRIGGER IF NOT EXISTS arist_trigger AFTER INSERT ON Users
    FOR EACH ROW
    BEGIN
        IF (NEW.Username LIKE '%Arist%') THEN
            UPDATE Users SET Username = REPLACE(NEW.Username, "Arist", "") WHERE UserID = NEW.UserID;
            INSERT INTO UserType (UserID, UsersType) VALUES (NEW.UserID, "Arist");
        END IF;
    END;
