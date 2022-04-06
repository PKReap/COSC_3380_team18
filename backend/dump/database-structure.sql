DROP SCHEMA MusicLibrary;
CREATE SCHEMA IF NOT EXISTS MusicLibrary;

USE MusicLibrary;

CREATE TABLE
    IF NOT EXISTS Users (
        Username VARCHAR(50) NOT NULL UNIQUE,
        UserPassword VARCHAR(50) NOT NULL,
        UserType ENUM("Admin", "Arist", "User") NOT NULL,
        IsDeleted BOOLEAN NOT NULL DEFAULT FALSE,
	    UserLevel INT NOT NULL DEFAULT 0,
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
        LibraryName VARCHAR(200) NOT NULL,
        AverageRating DECIMAL(3,2) DEFAULT 0,
        TrackGenre VARCHAR(50),
        Link VARCHAR(500) NOT NULL,
        IsDeleted BOOLEAN NOT NULL DEFAULT FALSE
    );

CREATE TABLE
    IF NOT EXISTS Playlist_Tracks (
        PRIMARY KEY (PTID),
        PTID INT NOT NULL AUTO_INCREMENT,
        PlaylistID INT NOT NULL,
        TrackID INT NOT NULL,
        FOREIGN KEY (PlaylistID) REFERENCES Playlists(PlaylistID),
        FOREIGN KEY (TrackID) REFERENCES Tracks(TrackID)
    );

CREATE TABLE
    IF NOT EXISTS Library_Tracks (
        PRIMARY KEY (LTID),
        LTID INT NOT NULL AUTO_INCREMENT,
        LibraryID INT NOT NULL,
        TrackID INT NOT NULL,
        FOREIGN KEY (LibraryID) REFERENCES Libraries(LibraryID),
		FOREIGN KEY (TrackID) REFERENCES Tracks(TrackID)
    );

CREATE TABLE 
    IF NOT EXISTS TrackRatings (
        PRIMARY KEY (RatingID),
        RatingID INT NOT NULL AUTO_INCREMENT,
        TrackID INT NOT NULL,
        Rating INT DEFAULT 0,
        IsDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        Username VARCHAR(50) NOT NULL,
        FOREIGN KEY (TrackID) REFERENCES Tracks(TrackID),
        FOREIGN KEY (Username) REFERENCES Users(Username)
    );

INSERT INTO Users (Username, UserPassword, UserType) VALUES ("Arist1", "Password123", "Arist");
INSERT INTO Users (Username, UserPassword, UserType) VALUES ("User1", "Password123", "User");
INSERT INTO Users (Username, UserPassword, UserType) VALUES ("Admin1", "Password123", "Admin");


INSERT INTO Libraries (LibraryName, ArtistName) VALUES ("Dance Dance Revolution", "Arist1");
INSERT INTO Libraries (LibraryName, ArtistName) VALUES ("Electric Boogaloo", "Arist1");

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

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, Link, LibraryName) 
VALUES("Dubstep", "Artist1", "Electronic", "https://www.bensound.com/bensound-music/bensound-dubstep.mp3", "Dance Dance Revolution");
-- Insert dubstep into Dance Dance Revolution
INSERT INTO Library_Tracks (LibraryID, TrackID) VALUES (1, 1);

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, Link, LibraryName) 
VALUES("Better Days", "Artist1", "Contry","https://www.bensound.com/bensound-music/bensound-betterdays.mp3", "Electric Boogaloo");
-- Insert Better Days into Electric Boogaloo
INSERT INTO Library_Tracks (LibraryID, TrackID) VALUES (2, 2);
 
INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, Link, LibraryName) 
VALUES("Funny Song", "Artist1", "Parody","https://www.bensound.com/bensound-music/bensound-funnysong.mp3", "Electric Boogaloo");
-- Insert Funny Song into Electric Boogaloo
INSERT INTO Library_Tracks (LibraryID, TrackID) VALUES (2, 3);

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, Link, LibraryName) 
VALUES("Slow Motion", "Artist1", "Ambiance", "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3", "Electric Boogaloo");
-- Insert Slow Motion into Electric Boogaloo
INSERT INTO Library_Tracks (LibraryID, TrackID) VALUES (2, 4);

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, Link, LibraryName) 
VALUES("Adventure", "Artist1", "Ambiance", "https://www.bensound.com/bensound-music/bensound-adventure.mp3", "Dance Dance Revolution");
-- Insert Adventure into Dance Dance Revolution
INSERT INTO Library_Tracks (LibraryID, TrackID) VALUES (1, 5);

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, Link, LibraryName) 
VALUES("Inspire", "Artist1", "Ambiance", "https://www.bensound.com/bensound-music/bensound-inspire.mp3", "Dance Dance Revolution");
-- Insert Inspire into Dance Dance Revolution
INSERT INTO Library_Tracks (LibraryID, TrackID) VALUES (1, 6);  

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, Link, LibraryName) 
VALUES("Evolution", "Artist1", "Ambiance", "https://www.bensound.com/bensound-music/bensound-evolution.mp3", "Dance Dance Revolution");
-- Insert Evolution into Dance Dance Revolution
INSERT INTO Library_Tracks (LibraryID, TrackID) VALUES (1, 7);

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, Link, LibraryName) 
VALUES("Piano Moment", "Artist1", "Classical",  "https://www.bensound.com/bensound-music/bensound-pianomoment.mp3", "Electric Boogaloo");
-- Insert Piano Moment into Electric Boogaloo
INSERT INTO Library_Tracks (LibraryID, TrackID) VALUES (2, 8);

INSERT INTO Tracks (TrackName, ArtistName, TrackGenre, Link, LibraryName) 
VALUES("Dance", "Artist1", "Pop", "https://www.bensound.com/bensound-music/bensound-dance.mp3", "Electric Boogaloo");
-- Insert Dance into Electric Boogaloo
INSERT INTO Library_Tracks (LibraryID, TrackID) VALUES (2, 9);

INSERT INTO Playlists(PlaylistName, Username) VALUES ("Playlist1", "User1");
INSERT INTO Playlists(PlaylistName, Username) VALUES ("Playlist2", "User1");

INSERT INTO Playlist_Tracks (PlaylistID, TrackID) VALUES (1, 1);
INSERT INTO Playlist_Tracks (PlaylistID, TrackID) VALUES (1, 2);
INSERT INTO Playlist_Tracks (PlaylistID, TrackID) VALUES (1, 3);
INSERT INTO TrackRatings (Username, TrackID, Rating) VALUES ("User1", 1, 5);
INSERT INTO TrackRatings (Username, TrackID, Rating) VALUES ("User1", 2, 5);
INSERT INTO TrackRatings (Username, TrackID, Rating) VALUES ("User1", 3, 5);
-- create a view with tracks and playlist ID with the user's rating
CREATE VIEW Playlist_Tracks_View AS
    SELECT Playlist_Tracks.PlaylistID, Playlist_Tracks.TrackID, Tracks.TrackName, Tracks.ArtistName, Tracks.TrackGenre, Tracks.Link, Tracks.LibraryName
    FROM Playlist_Tracks
    INNER JOIN Tracks ON Playlist_Tracks.TrackID = Tracks.TrackID;
    
CREATE VIEW Library_Tracks_View AS
    SELECT Library_Tracks.LibraryID, Library_Tracks.TrackID, Tracks.TrackName, Tracks.ArtistName, Tracks.TrackGenre, Tracks.Link, Tracks.LibraryName
    FROM Library_Tracks
    INNER JOIN Tracks ON Library_Tracks.TrackID = Tracks.TrackID;


-- joio Playlist_Tracks_View with rating views with only those rated by user1
SELECT * FROM Playlist_Tracks_View JOIN TrackRatings ON Playlist_Tracks_View.TrackID = TrackRatings.TrackID WHERE TrackRatings.Username = "User1" AND PlaylistID = ;
