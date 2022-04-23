CREATE DATABASE  IF NOT EXISTS `MusicLibrary` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `MusicLibrary`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: uhmusic.xyz    Database: MusicLibrary
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Libraries`
--

DROP TABLE IF EXISTS `Libraries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Libraries` (
  `ArtistName` varchar(50) NOT NULL,
  `LibraryID` int NOT NULL AUTO_INCREMENT,
  `LibraryName` varchar(200) NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`LibraryID`),
  KEY `ArtistName` (`ArtistName`),
  CONSTRAINT `Libraries_ibfk_1` FOREIGN KEY (`ArtistName`) REFERENCES `Users` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Libraries`
--

LOCK TABLES `Libraries` WRITE;
/*!40000 ALTER TABLE `Libraries` DISABLE KEYS */;
INSERT INTO `Libraries` VALUES ('Artist1',1,'Dance Dance Revolution',0),('Artist1',2,'Electric Boogaloo',0),('Artist1',3,'Wars',0),('Artist1',4,'Hawaiian',0),('Artist1',5,'Mozart',0),('Artist1',6,'okewjoprj',0);
/*!40000 ALTER TABLE `Libraries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Library_Tracks`
--

DROP TABLE IF EXISTS `Library_Tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Library_Tracks` (
  `LTID` int NOT NULL AUTO_INCREMENT,
  `LibraryID` int NOT NULL,
  `TrackID` int NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`LTID`),
  KEY `LibraryID` (`LibraryID`),
  KEY `TrackID` (`TrackID`),
  CONSTRAINT `Library_Tracks_ibfk_1` FOREIGN KEY (`LibraryID`) REFERENCES `Libraries` (`LibraryID`),
  CONSTRAINT `Library_Tracks_ibfk_2` FOREIGN KEY (`TrackID`) REFERENCES `Tracks` (`TrackID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Library_Tracks`
--

LOCK TABLES `Library_Tracks` WRITE;
/*!40000 ALTER TABLE `Library_Tracks` DISABLE KEYS */;
INSERT INTO `Library_Tracks` VALUES (1,1,1,0),(2,2,2,0),(3,2,3,0),(4,2,4,0),(5,1,5,0),(6,1,6,0),(7,1,7,0),(8,2,8,0),(9,2,9,0),(10,3,10,0),(11,4,11,0),(12,5,12,0),(13,6,13,0);
/*!40000 ALTER TABLE `Library_Tracks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `Library_Tracks_View`
--

DROP TABLE IF EXISTS `Library_Tracks_View`;
/*!50001 DROP VIEW IF EXISTS `Library_Tracks_View`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `Library_Tracks_View` AS SELECT 
 1 AS `LibraryID`,
 1 AS `TrackID`,
 1 AS `TrackName`,
 1 AS `ArtistName`,
 1 AS `TrackGenre`,
 1 AS `Link`,
 1 AS `LibraryName`,
 1 AS `AverageRating`,
 1 AS `IMG`,
 1 AS `IsDeleted`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Playlist_Tracks`
--

DROP TABLE IF EXISTS `Playlist_Tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Playlist_Tracks` (
  `PTID` int NOT NULL AUTO_INCREMENT,
  `PlaylistID` int NOT NULL,
  `TrackID` int NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`PTID`),
  KEY `PlaylistID` (`PlaylistID`),
  KEY `TrackID` (`TrackID`),
  CONSTRAINT `Playlist_Tracks_ibfk_1` FOREIGN KEY (`PlaylistID`) REFERENCES `Playlists` (`PlaylistID`),
  CONSTRAINT `Playlist_Tracks_ibfk_2` FOREIGN KEY (`TrackID`) REFERENCES `Tracks` (`TrackID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Playlist_Tracks`
--

LOCK TABLES `Playlist_Tracks` WRITE;
/*!40000 ALTER TABLE `Playlist_Tracks` DISABLE KEYS */;
INSERT INTO `Playlist_Tracks` VALUES (2,1,5,0),(3,2,5,0),(4,3,5,0),(5,3,8,1),(6,1,9,0),(7,1,2,0),(8,1,6,0),(9,1,8,1),(10,10,8,0),(11,10,6,0),(12,10,7,0),(13,10,10,0),(14,10,5,0),(16,10,2,1),(17,10,9,0),(18,10,3,0),(19,10,4,0),(20,10,2,0),(21,14,10,1),(23,4,10,0);
/*!40000 ALTER TABLE `Playlist_Tracks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `Playlist_Tracks_View`
--

DROP TABLE IF EXISTS `Playlist_Tracks_View`;
/*!50001 DROP VIEW IF EXISTS `Playlist_Tracks_View`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `Playlist_Tracks_View` AS SELECT 
 1 AS `PlaylistID`,
 1 AS `TrackID`,
 1 AS `TrackName`,
 1 AS `ArtistName`,
 1 AS `TrackGenre`,
 1 AS `Link`,
 1 AS `LibraryName`,
 1 AS `IMG`,
 1 AS `IsDeleted`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Playlists`
--

DROP TABLE IF EXISTS `Playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Playlists` (
  `PlaylistID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `PlaylistName` varchar(50) NOT NULL,
  `SizeLimit` int DEFAULT '10',
  `IsDeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`PlaylistID`),
  KEY `Username` (`Username`),
  CONSTRAINT `Playlists_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `Users` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Playlists`
--

LOCK TABLES `Playlists` WRITE;
/*!40000 ALTER TABLE `Playlists` DISABLE KEYS */;
INSERT INTO `Playlists` VALUES (1,'User1','Playlist1',10,1),(2,'Artist1','Cool',10,1),(3,'Artist1','Chill',10,1),(4,'User1','Playlist2',10,0),(5,'User1','Playlist3',10,1),(6,'User1','Playlist4',10,1),(7,'User1','playlist5',10,1),(8,'User1','Playlist6',10,1),(9,'User1','Playlsit7',10,1),(10,'Artist1','Chill Music',10,1),(11,'Artist1','Space',10,1),(12,'Artist1','Top 100',10,1),(13,'Artist1','Chill',10,1),(14,'Artist1','Chill',10,1),(15,'User1','Playlist5',10,1),(16,'User1','Playlist6',10,1),(17,'User1','Playlist6',10,1),(18,'User1','Playlist3',10,0),(19,'User1','Playlist4',10,0),(20,'User1','Playlist5',10,0),(21,'User1','Playlist1',10,1),(22,'User1','Playlist1',10,1),(23,'User1','playlsit7',10,0),(24,'Artist1','1',10,1),(25,'Artist1','asd',10,1),(26,'Artist1','qwe',10,1),(27,'Artist1','fs',10,1),(28,'Artist1','gdf',10,1),(29,'Artist1','hgjgh',10,1),(30,'Artist1','nvbn',10,1),(31,'Artist1','1',10,1),(32,'Artist1','2',10,1),(33,'Artist1','3',10,1),(34,'Artist1','4',10,1),(35,'Artist1','5',10,1),(36,'Artist1','6',10,1),(37,'Artist1','7',10,1),(38,'User1','Playlist1',10,1),(39,'Artist1','Chill',10,0),(40,'User1','Playlist7',10,1),(41,'User1','Playlist1',10,0);
/*!40000 ALTER TABLE `Playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TrackRatings`
--

DROP TABLE IF EXISTS `TrackRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TrackRatings` (
  `RatingID` int NOT NULL AUTO_INCREMENT,
  `TrackID` int NOT NULL,
  `Rating` int DEFAULT '0',
  `IsDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `Username` varchar(50) NOT NULL,
  PRIMARY KEY (`RatingID`),
  KEY `TrackID` (`TrackID`),
  KEY `Username` (`Username`),
  CONSTRAINT `TrackRatings_ibfk_1` FOREIGN KEY (`TrackID`) REFERENCES `Tracks` (`TrackID`),
  CONSTRAINT `TrackRatings_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `Users` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TrackRatings`
--

LOCK TABLES `TrackRatings` WRITE;
/*!40000 ALTER TABLE `TrackRatings` DISABLE KEYS */;
INSERT INTO `TrackRatings` VALUES (6,1,1,0,'Admin1'),(7,5,1,0,'Artist1'),(8,8,1,0,'Artist1'),(12,6,1,0,'Artist1'),(13,7,1,0,'Artist1'),(14,10,4,0,'Artist1'),(15,1,1,0,'Artist1'),(16,2,1,0,'Artist1'),(17,9,1,0,'Artist1'),(18,3,1,0,'Artist1'),(19,4,1,0,'Artist1'),(27,10,5,0,'User1'),(28,1,1,0,'User1'),(29,10,1,0,'Admin1'),(30,11,1,0,'User1'),(31,12,5,0,'User1'),(32,4,5,0,'User1'),(33,2,5,0,'User1'),(34,3,5,0,'User1'),(35,9,5,0,'User1');
/*!40000 ALTER TABLE `TrackRatings` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `on_rating_change` AFTER UPDATE ON `TrackRatings` FOR EACH ROW BEGIN
    UPDATE Users
        SET PlaylistLimit = 5 + FLOOR((SELECT COUNT(Username) FROM TrackRatings WHERE Username = NEW.Username AND Rating > 0 AND IsDeleted = False) / 5)
        WHERE Username = NEW.Username;
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `calc_avg_rating_update` AFTER UPDATE ON `TrackRatings` FOR EACH ROW BEGIN
        UPDATE Tracks
        SET AverageRating = (SELECT AVG(Rating) FROM TrackRatings WHERE TrackID = NEW.TrackID AND IsDeleted = FALSE AND Rating != 0)
        WHERE TrackID = NEW.TrackID;
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Tracks`
--

DROP TABLE IF EXISTS `Tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tracks` (
  `TrackID` int NOT NULL AUTO_INCREMENT,
  `TrackName` varchar(200) NOT NULL,
  `ArtistName` varchar(50) NOT NULL,
  `LibraryName` varchar(200) NOT NULL,
  `AverageRating` decimal(3,2) DEFAULT '0.00',
  `TrackGenre` varchar(50) DEFAULT NULL,
  `Link` varchar(500) NOT NULL,
  `IMG` varchar(500) NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `DateAdded` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`TrackID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tracks`
--

LOCK TABLES `Tracks` WRITE;
/*!40000 ALTER TABLE `Tracks` DISABLE KEYS */;
INSERT INTO `Tracks` VALUES (1,'Dubstep','Artist1','Dance Dance Revolution',1.00,'Electronic','https://www.bensound.com/bensound-music/bensound-dubstep.mp3','https://www.bensound.com/bensound-img/dubstep.jpg',0,'2022-04-20 13:47:47'),(2,'Better Days','Artist1','Electric Boogaloo',3.00,'Contry','https://www.bensound.com/bensound-music/bensound-betterdays.mp3','https://www.bensound.com/bensound-img/betterdays.jpg',0,'2022-04-20 13:47:47'),(3,'Funny Song','Artist1','Electric Boogaloo',3.00,'Parody','https://www.bensound.com/bensound-music/bensound-funnysong.mp3','https://www.bensound.com/bensound-img/betterdays.jpg',0,'2022-04-20 13:47:47'),(4,'Slow Motion','Artist1','Electric Boogaloo',3.00,'Ambiance','https://www.bensound.com/bensound-music/bensound-slowmotion.mp3','https://www.bensound.com/bensound-img/sunny.jpg',0,'2022-04-20 13:47:47'),(5,'Adventure','Artist1','Dance Dance Revolution',1.00,'Ambiance','https://www.bensound.com/bensound-music/bensound-adventure.mp3','https://www.bensound.com/bensound-img/energy.jpg',0,'2022-04-20 13:47:47'),(6,'Inspire','Artist1','Dance Dance Revolution',3.00,'Ambiance','https://www.bensound.com/bensound-music/bensound-inspire.mp3','https://www.bensound.com/bensound-img/indiebox.jpg',0,'2022-04-20 13:47:47'),(7,'Evolution','Artist1','Dance Dance Revolution',3.00,'Ambiance','https://www.bensound.com/bensound-music/bensound-evolution.mp3','https://www.bensound.com/bensound-img/slowmotion.jpg',0,'2022-04-20 13:47:47'),(8,'Piano Moment','Artist1','Electric Boogaloo',3.00,'Classical','https://www.bensound.com/bensound-music/bensound-pianomoment.mp3','https://www.bensound.com/bensound-img/clearday.jpg',0,'2022-04-20 13:47:47'),(9,'Dance','Artist1','Electric Boogaloo',3.00,'Pop','https://www.bensound.com/bensound-music/bensound-dance.mp3','https://www.bensound.com/bensound-img/evolution.jpg',0,'2022-04-20 13:47:47'),(10,'Sad ','Artist1','Wars',3.33,'Country','http://uhmusic.xyz/music/Sad .mp3','http://uhmusic.xyz/img/Sad .jpg',0,'2022-04-20 13:47:47'),(11,'Ukelele','Artist1','Hawaiian',1.00,'Rock','http://uhmusic.xyz/music/Ukelele.mp3','http://uhmusic.xyz/img/Ukelele.jpg',0,'2022-04-20 13:47:47'),(12,'Mental Charity','Artist1','Mozart',5.00,'Classical','http://uhmusic.xyz/music/Mental Charity.mp3','http://uhmusic.xyz/img/Mental Charity.jpg',0,'2022-04-20 13:47:47'),(13,'siojdfiosdjfio','Artist1','okewjoprj',0.00,'jsisiodfjiojdfs','http://uhmusic.xyz/music/siojdfiosdjfio.mp3','http://uhmusic.xyz/img/siojdfiosdjfio.jpg',0,'2022-04-20 13:47:47');
/*!40000 ALTER TABLE `Tracks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `Username` varchar(50) NOT NULL,
  `UserPassword` varchar(65) NOT NULL,
  `UserType` enum('Admin','Artist','User') NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `UserLevel` int NOT NULL DEFAULT '0',
  `PlaylistLimit` int NOT NULL DEFAULT '5',
  `RegistrationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Username`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('Admin1','73bf04793aa692c03aff8ef3a15aa2ea349ba06d54ea834fe6c6fa07d5badd67','Admin',0,0,5,'2022-04-20 03:04:18'),('Artist1','817d4e6bf987c77c900bc0dcf2248955081395e88fe85392a69c2e697d6930bc','Artist',0,0,7,'2022-02-26 00:00:00'),('ToBeDeleted','Password123','User',0,0,5,'2022-04-20 03:04:18'),('User1','742ebf46c0773cb3f7299d02839ca3b66f70be91f0576fa24cc800bcc0ca8cc7','User',0,0,6,'2022-03-23 00:00:00');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `Library_Tracks_View`
--

/*!50001 DROP VIEW IF EXISTS `Library_Tracks_View`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`thien`@`73.76.53.2` SQL SECURITY DEFINER */
/*!50001 VIEW `Library_Tracks_View` AS select `Library_Tracks`.`LibraryID` AS `LibraryID`,`Library_Tracks`.`TrackID` AS `TrackID`,`Tracks`.`TrackName` AS `TrackName`,`Tracks`.`ArtistName` AS `ArtistName`,`Tracks`.`TrackGenre` AS `TrackGenre`,`Tracks`.`Link` AS `Link`,`Tracks`.`LibraryName` AS `LibraryName`,`Tracks`.`AverageRating` AS `AverageRating`,`Tracks`.`IMG` AS `IMG`,`Library_Tracks`.`IsDeleted` AS `IsDeleted` from (`Library_Tracks` join `Tracks` on((`Library_Tracks`.`TrackID` = `Tracks`.`TrackID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Playlist_Tracks_View`
--

/*!50001 DROP VIEW IF EXISTS `Playlist_Tracks_View`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`thien`@`73.76.53.2` SQL SECURITY DEFINER */
/*!50001 VIEW `Playlist_Tracks_View` AS select `Playlist_Tracks`.`PlaylistID` AS `PlaylistID`,`Playlist_Tracks`.`TrackID` AS `TrackID`,`Tracks`.`TrackName` AS `TrackName`,`Tracks`.`ArtistName` AS `ArtistName`,`Tracks`.`TrackGenre` AS `TrackGenre`,`Tracks`.`Link` AS `Link`,`Tracks`.`LibraryName` AS `LibraryName`,`Tracks`.`IMG` AS `IMG`,`Playlist_Tracks`.`IsDeleted` AS `IsDeleted` from (`Playlist_Tracks` join `Tracks` on((`Playlist_Tracks`.`TrackID` = `Tracks`.`TrackID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-23  8:08:27
