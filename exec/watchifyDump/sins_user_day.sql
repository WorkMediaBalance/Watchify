-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: watchifydb.cph3uafcff1h.ap-northeast-2.rds.amazonaws.com    Database: sins
-- ------------------------------------------------------
-- Server version	8.0.32

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `user_day`
--

DROP TABLE IF EXISTS `user_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_day` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `time` int NOT NULL,
  `day_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1dwnbvj689y8w1oaoetfjsr6p` (`day_id`),
  KEY `FK3x5ylh51aypgxl16yqq0u8u30` (`user_id`),
  CONSTRAINT `FK1dwnbvj689y8w1oaoetfjsr6p` FOREIGN KEY (`day_id`) REFERENCES `day` (`id`),
  CONSTRAINT `FK3x5ylh51aypgxl16yqq0u8u30` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_day`
--

LOCK TABLES `user_day` WRITE;
/*!40000 ALTER TABLE `user_day` DISABLE KEYS */;
INSERT INTO `user_day` VALUES (1,5,1,1),(2,2,2,1),(3,2,3,1),(4,3,4,1),(5,0,5,1),(6,3,6,1),(7,3,7,1),(8,1,1,2),(9,1,2,2),(10,1,3,2),(11,1,4,2),(12,3,5,2),(13,3,6,2),(14,4,7,2),(15,0,1,3),(16,1,2,3),(17,1,3,3),(18,4,4,3),(19,4,5,3),(20,2,6,3),(21,0,7,3),(22,2,1,4),(23,2,2,4),(24,2,3,4),(25,2,4,4),(26,2,5,4),(27,2,6,4),(28,2,7,4),(29,4,1,5),(30,3,2,5),(31,3,3,5),(32,6,4,5),(33,3,5,5),(34,2,6,5),(35,2,7,5),(36,1,1,6),(37,1,2,6),(38,1,3,6),(39,1,4,6),(40,1,5,6),(41,1,6,6),(42,1,7,6),(43,1,1,7),(44,1,2,7),(45,1,3,7),(46,1,4,7),(47,1,5,7),(48,1,6,7),(49,1,7,7),(50,1,1,8),(51,1,2,8),(52,1,3,8),(53,1,4,8),(54,1,5,8),(55,2,6,8),(56,2,7,8),(57,1,1,9),(58,1,2,9),(59,1,3,9),(60,1,4,9),(61,1,5,9),(62,1,6,9),(63,1,7,9),(64,1,1,10),(65,1,2,10),(66,1,3,10),(67,1,4,10),(68,1,5,10),(69,1,6,10),(70,1,7,10),(71,1,1,11),(72,1,2,11),(73,1,3,11),(74,2,4,11),(75,2,5,11),(76,2,6,11),(77,1,7,11),(78,1,1,12),(79,1,2,12),(80,1,3,12),(81,1,4,12),(82,1,5,12),(83,1,6,12),(84,1,7,12),(85,1,1,13),(86,1,2,13),(87,1,3,13),(88,1,4,13),(89,1,5,13),(90,1,6,13),(91,1,7,13),(92,0,1,14),(93,0,2,14),(94,0,3,14),(95,0,4,14),(96,0,5,14),(97,1,6,14),(98,0,7,14),(99,2,1,15),(100,3,2,15),(101,0,3,15),(102,1,4,15),(103,1,5,15),(104,2,6,15),(105,6,7,15),(106,1,1,16),(107,1,2,16),(108,1,3,16),(109,1,4,16),(110,1,5,16),(111,1,6,16),(112,1,7,16),(113,2,1,17),(114,2,2,17),(115,2,3,17),(116,2,4,17),(117,2,5,17),(118,2,6,17),(119,2,7,17);
/*!40000 ALTER TABLE `user_day` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19 10:55:01
