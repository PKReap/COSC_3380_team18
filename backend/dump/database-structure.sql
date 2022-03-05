CREATE SCHEMA IF NOT EXISTS MusicLibrary;

USE MusicLibrary;

CREATE TABLE
    Admins (
        PRIMARY KEY (AdminID),
        AdminID INT NOT NULL AUTO_INCREMENT,
        AdminName VARCHAR(20) NOT NULL UNIQUE
    );

CREATE TABLE
    Users (
        PRIMARY KEY (UserID),
        UserID INT NOT NULL AUTO_INCREMENT UNIQUE,
        UserName VARCHAR(20) NOT NULL
    );

CREATE TABLE
    Artists (
        PRIMARY KEY (ArtistID, ArtistName),
        ArtistID INT NOT NULL AUTO_INCREMENT,
        ArtistName VARCHAR(20) NOT NULL UNIQUE
    );

CREATE TABLE
    Playlists (
        PRIMARY KEY (PlaylistID, PlaylistName),
        UserID INT NOT NULL,
        PlaylistID INT NOT NULL AUTO_INCREMENT,
        PlaylistName VARCHAR(20) NOT NULL,
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );

CREATE TABLE
    Libraries (
        PRIMARY KEY (LibraryID, LibraryName),
        LibraryID INT NOT NULL AUTO_INCREMENT,
        LibraryName VARCHAR(20) NOT NULL,
        ArtistID INT NOT NULL,
        ArtistName VARCHAR(20) NOT NULL,
        FOREIGN KEY (ArtistID, ArtistName) REFERENCES Artists(ArtistID, ArtistName)
    );

CREATE TABLE
    Tracks (
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
        FOREIGN KEY (LibraryID, LibraryName) REFERENCES Libraries(LibraryID, LibraryName),
        FOREIGN KEY (ArtistID, ArtistName) REFERENCES Artists(ArtistID, ArtistName)
    );
