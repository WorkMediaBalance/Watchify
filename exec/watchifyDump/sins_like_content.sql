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
-- Table structure for table `like_content`
--

DROP TABLE IF EXISTS `like_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_content` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_deleted` bit(1) NOT NULL,
  `like` double DEFAULT NULL,
  `content_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `is_like` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `FKjqeev4umwbta9lw7xes9gh5y9` (`content_id`),
  KEY `FKk6vsxrwt7xjmfqdrifttpbkbd` (`user_id`),
  CONSTRAINT `FKjqeev4umwbta9lw7xes9gh5y9` FOREIGN KEY (`content_id`) REFERENCES `content` (`id`),
  CONSTRAINT `FKk6vsxrwt7xjmfqdrifttpbkbd` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_content`
--

LOCK TABLES `like_content` WRITE;
/*!40000 ALTER TABLE `like_content` DISABLE KEYS */;
INSERT INTO `like_content` VALUES (1,_binary '\0',4.5,3,4,_binary '\0'),(2,_binary '\0',4,13214,1,_binary '\0'),(3,_binary '\0',3.5,21,1,_binary '\0'),(4,_binary '\0',4.5,3,1,_binary '\0'),(5,_binary '\0',3.5,785,8,_binary '\0'),(6,_binary '\0',3,1032,8,_binary '\0'),(7,_binary '\0',4,23664,8,_binary '\0'),(8,_binary '\0',1.5,31192,8,_binary '\0'),(9,_binary '\0',3.5,9455,10,_binary '\0'),(10,_binary '\0',4,28817,10,_binary '\0'),(11,_binary '\0',0.5,29950,10,_binary '\0'),(12,_binary '\0',5,14806,10,_binary '\0'),(13,_binary '\0',5,15037,10,_binary '\0'),(16,_binary '\0',5,15589,10,_binary '\0'),(17,_binary '\0',5,9130,10,_binary '\0'),(18,_binary '\0',5,22403,10,_binary '\0'),(19,_binary '\0',5,21039,10,_binary '\0'),(20,_binary '\0',5,30827,10,_binary '\0'),(21,_binary '\0',0.5,9,3,_binary '\0'),(22,_binary '\0',2.5,47,3,_binary '\0'),(23,_binary '\0',0.5,150,3,_binary '\0'),(24,_binary '\0',4.5,28899,3,_binary '\0'),(26,_binary '\0',4,12772,3,_binary '\0'),(27,_binary '\0',3,12773,3,_binary '\0'),(28,_binary '\0',5,12734,3,_binary '\0'),(29,_binary '\0',5,12735,3,_binary '\0'),(30,_binary '\0',5,10797,3,_binary '\0'),(31,_binary '\0',4.5,10798,3,_binary '\0'),(32,_binary '\0',5,29998,3,_binary '\0'),(33,_binary '\0',5,29631,3,_binary '\0'),(34,_binary '\0',5,10993,3,_binary '\0'),(35,_binary '\0',4,9816,3,_binary '\0'),(36,_binary '\0',3.5,9813,3,_binary '\0'),(37,_binary '\0',4,15582,3,_binary '\0'),(39,_binary '\0',4,12237,3,_binary '\0'),(40,_binary '\0',4.5,9842,3,_binary '\0'),(41,_binary '\0',4.5,15736,3,_binary '\0'),(42,_binary '\0',4,15869,3,_binary '\0'),(43,_binary '\0',1,15870,3,_binary '\0'),(44,_binary '\0',4.5,9821,3,_binary '\0'),(45,_binary '\0',3.5,9479,3,_binary '\0'),(46,_binary '\0',3.5,10799,3,_binary '\0'),(47,_binary '\0',1.5,10048,3,_binary '\0'),(48,_binary '\0',4.5,9899,3,_binary '\0'),(49,_binary '\0',4.5,15462,3,_binary '\0'),(50,_binary '\0',4.5,15463,3,_binary '\0'),(51,_binary '\0',5,15592,3,_binary '\0'),(52,_binary '\0',5,10913,3,_binary '\0'),(53,_binary '\0',0.5,10797,11,_binary '\0'),(54,_binary '\0',4.5,25055,11,_binary '\0'),(55,_binary '\0',4.5,23378,11,_binary '\0'),(56,_binary '\0',4,23639,11,_binary '\0'),(57,_binary '\0',4.5,14944,11,_binary '\0'),(59,_binary '\0',4.5,15005,11,_binary '\0'),(60,_binary '\0',5,23554,11,_binary '\0'),(61,_binary '\0',4,23554,11,_binary '\0'),(62,_binary '\0',5,2607,1,_binary '\0'),(63,_binary '\0',4.5,2707,1,_binary '\0'),(64,_binary '\0',5,13112,11,_binary '\0'),(66,_binary '\0',4,11032,11,_binary '\0'),(68,_binary '\0',5,2569,1,_binary '\0'),(69,_binary '\0',4.5,1025,11,_binary '\0'),(70,_binary '\0',4.5,2463,11,_binary '\0'),(71,_binary '\0',1,14875,1,_binary '\0'),(72,_binary '\0',4,5467,1,_binary '\0'),(73,_binary '\0',3.5,5469,1,_binary '\0'),(74,_binary '\0',5,8977,1,_binary '\0'),(75,_binary '\0',4.5,800,11,_binary '\0'),(76,_binary '\0',4.5,1115,1,_binary '\0'),(77,_binary '\0',4.5,27427,11,_binary '\0'),(78,_binary '\0',4,17509,1,_binary '\0'),(79,_binary '\0',4.5,11134,11,_binary '\0'),(80,_binary '\0',4.5,5886,11,_binary '\0'),(81,_binary '\0',4,27339,11,_binary '\0'),(82,_binary '\0',4.5,14881,11,_binary '\0'),(83,_binary '\0',4.5,5715,11,_binary '\0'),(84,_binary '\0',3.5,4977,11,_binary '\0'),(85,_binary '\0',4.5,27076,11,_binary '\0'),(86,_binary '\0',4,2607,11,_binary '\0'),(87,_binary '\0',4.5,14875,11,_binary '\0'),(88,_binary '\0',5,24625,11,_binary '\0'),(89,_binary '\0',3.5,1115,11,_binary '\0'),(90,_binary '\0',4.5,23068,11,_binary '\0'),(92,_binary '\0',3.5,4639,2,_binary '\0'),(93,_binary '\0',1.5,47,2,_binary '\0'),(94,_binary '\0',5,10913,2,_binary '\0'),(95,_binary '\0',5,28899,2,_binary '\0'),(96,_binary '\0',4.5,28673,2,_binary '\0'),(97,_binary '\0',5,14237,5,_binary '\0'),(98,_binary '\0',3.5,14,5,_binary '\0'),(99,_binary '\0',5,28899,5,_binary '\0'),(100,_binary '\0',4,23554,3,_binary '\0'),(101,_binary '\0',4.5,14237,3,_binary '\0'),(102,_binary '\0',3.5,13112,3,_binary '\0'),(103,_binary '\0',5,28701,3,_binary '\0'),(104,_binary '\0',3.5,436,3,_binary '\0'),(105,_binary '\0',4.5,503,3,_binary '\0'),(106,_binary '\0',3.5,505,3,_binary '\0'),(107,_binary '\0',4.5,517,3,_binary '\0'),(108,_binary '\0',4.5,728,3,_binary '\0'),(109,_binary '\0',4,962,3,_binary '\0'),(110,_binary '\0',4.5,969,3,_binary '\0'),(111,_binary '\0',4,10035,11,_binary '\0'),(112,_binary '\0',3.5,14952,11,_binary '\0'),(113,_binary '\0',5,28931,11,_binary '\0'),(114,_binary '\0',4,11343,11,_binary '\0'),(115,_binary '\0',5,28707,11,_binary '\0'),(116,_binary '\0',4.5,10456,11,_binary '\0'),(117,_binary '\0',4.5,10955,11,_binary '\0'),(118,_binary '\0',4,11268,11,_binary '\0'),(119,_binary '\0',4,11220,11,_binary '\0'),(120,_binary '\0',4.5,11269,11,_binary '\0'),(121,_binary '\0',4.5,956,11,_binary '\0'),(122,_binary '\0',4,10929,11,_binary '\0'),(123,_binary '\0',4.5,22934,11,_binary '\0'),(124,_binary '\0',4,9824,11,_binary '\0'),(125,_binary '\0',4.5,23247,11,_binary '\0'),(126,_binary '\0',4.5,16386,11,_binary '\0'),(127,_binary '\0',4.5,28676,11,_binary '\0'),(128,_binary '\0',0.5,28683,11,_binary '\0'),(130,_binary '\0',5,2453,11,_binary '\0'),(131,_binary '\0',4.5,2454,11,_binary '\0'),(132,_binary '\0',2.5,24438,1,_binary '\0'),(133,_binary '\0',4.5,14857,1,_binary '\0'),(134,_binary '\0',4.5,28673,5,_binary '\0'),(135,_binary '\0',3.5,8977,11,_binary '\0'),(136,_binary '\0',4,511,11,_binary '\0'),(137,_binary '\0',4.5,556,11,_binary '\0'),(138,_binary '\0',4.5,14700,11,_binary '\0'),(139,_binary '\0',5,14694,11,_binary '\0'),(140,_binary '\0',4.5,14746,11,_binary '\0'),(141,_binary '\0',4,5140,11,_binary '\0'),(142,_binary '\0',4.5,15159,11,_binary '\0'),(143,_binary '\0',4,15176,11,_binary '\0'),(144,_binary '\0',3.5,5046,11,_binary '\0'),(145,_binary '\0',4.5,14856,11,_binary '\0'),(146,_binary '\0',3.5,12667,11,_binary '\0'),(147,_binary '\0',3.5,5272,11,_binary '\0'),(148,_binary '\0',4.5,14407,11,_binary '\0'),(149,_binary '\0',4,5150,11,_binary '\0'),(150,_binary '\0',4.5,14654,11,_binary '\0'),(151,_binary '\0',3.5,24458,11,_binary '\0'),(152,_binary '\0',4,14886,11,_binary '\0'),(153,_binary '\0',4.5,24421,11,_binary '\0'),(154,_binary '\0',5,14429,11,_binary '\0'),(155,_binary '\0',4,14516,11,_binary '\0'),(156,_binary '\0',4.5,14558,11,_binary '\0'),(157,_binary '\0',0.5,948,1,_binary '\0'),(158,_binary '\0',4,13112,1,_binary '\0'),(159,_binary '\0',5,3,2,_binary '\0'),(160,_binary '\0',3.5,1115,4,_binary '\0'),(161,_binary '\0',2.5,28899,4,_binary '\0'),(162,_binary '\0',4.5,16523,10,_binary '\0'),(163,_binary '\0',3.5,514,10,_binary '\0'),(164,_binary '\0',3.5,5280,10,_binary '\0'),(165,_binary '\0',4,5860,10,_binary '\0'),(166,_binary '\0',4,5858,10,_binary '\0'),(167,_binary '\0',4,29653,10,_binary '\0'),(168,_binary '\0',5,5235,10,_binary '\0'),(169,_binary '\0',4.5,15439,10,_binary '\0'),(171,_binary '\0',4.5,2490,2,_binary '\0'),(172,_binary '\0',1,20,2,_binary '\0'),(173,_binary '\0',4.5,101,2,_binary '\0');
/*!40000 ALTER TABLE `like_content` ENABLE KEYS */;
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

-- Dump completed on 2023-05-19 10:54:56
