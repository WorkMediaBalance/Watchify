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
-- Table structure for table `userott`
--

DROP TABLE IF EXISTS `userott`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userott` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `end` date DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL,
  `is_overed` bit(1) NOT NULL,
  `start` date DEFAULT NULL,
  `ott_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4dt0ldgxu5m5v15ewi0xfbmuc` (`ott_id`),
  KEY `FKp48ka4fye9t745lufsvd55w9u` (`user_id`),
  CONSTRAINT `FK4dt0ldgxu5m5v15ewi0xfbmuc` FOREIGN KEY (`ott_id`) REFERENCES `ott` (`id`),
  CONSTRAINT `FKp48ka4fye9t745lufsvd55w9u` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userott`
--

LOCK TABLES `userott` WRITE;
/*!40000 ALTER TABLE `userott` DISABLE KEYS */;
INSERT INTO `userott` VALUES (25,'2023-05-24',_binary '\0',_binary '\0','2023-05-18',2,1),(26,NULL,_binary '\0',_binary '\0',NULL,3,1),(27,'2023-06-08',_binary '\0',_binary '\0','2023-05-18',4,1),(28,NULL,_binary '\0',_binary '\0',NULL,1,1),(29,'2023-05-16',_binary '\0',_binary '\0','2023-05-16',1,8),(30,'2023-05-16',_binary '\0',_binary '\0','2023-05-16',1,2),(31,NULL,_binary '\0',_binary '\0','2023-05-16',3,2),(32,NULL,_binary '\0',_binary '\0','2023-05-16',2,8),(33,NULL,_binary '\0',_binary '\0',NULL,1,9),(34,NULL,_binary '\0',_binary '\0',NULL,1,4),(35,NULL,_binary '\0',_binary '\0',NULL,3,4),(36,NULL,_binary '\0',_binary '\0',NULL,3,9),(37,NULL,_binary '\0',_binary '\0',NULL,4,9),(38,NULL,_binary '\0',_binary '\0',NULL,2,9),(39,NULL,_binary '\0',_binary '\0',NULL,2,4),(40,NULL,_binary '\0',_binary '\0',NULL,4,4),(41,'2023-06-18',_binary '\0',_binary '\0','2023-05-19',1,3),(42,NULL,_binary '\0',_binary '\0',NULL,2,3),(43,NULL,_binary '\0',_binary '\0',NULL,3,3),(44,NULL,_binary '\0',_binary '\0',NULL,4,3),(45,NULL,_binary '\0',_binary '\0',NULL,1,12),(46,NULL,_binary '\0',_binary '\0',NULL,2,12),(47,NULL,_binary '\0',_binary '\0',NULL,3,12),(48,NULL,_binary '\0',_binary '\0',NULL,4,12),(49,NULL,_binary '\0',_binary '\0',NULL,3,8),(50,'2023-07-28',_binary '\0',_binary '\0','2023-05-16',4,8),(51,NULL,_binary '\0',_binary '\0','2023-05-18',1,15),(52,NULL,_binary '\0',_binary '\0','2023-05-18',2,15),(53,NULL,_binary '\0',_binary '\0',NULL,3,15),(54,NULL,_binary '\0',_binary '\0',NULL,4,15);
/*!40000 ALTER TABLE `userott` ENABLE KEYS */;
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
