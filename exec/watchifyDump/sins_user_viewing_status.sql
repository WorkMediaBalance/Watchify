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
-- Table structure for table `user_viewing_status`
--

DROP TABLE IF EXISTS `user_viewing_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_viewing_status` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_deleted` bit(1) NOT NULL,
  `turn_content_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb7si2rwfhgkmrvmrbofued2v8` (`turn_content_id`),
  KEY `FKd9flqda76laxn6t4pxumy41mr` (`user_id`),
  CONSTRAINT `FKb7si2rwfhgkmrvmrbofued2v8` FOREIGN KEY (`turn_content_id`) REFERENCES `turn_content` (`id`),
  CONSTRAINT `FKd9flqda76laxn6t4pxumy41mr` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_viewing_status`
--

LOCK TABLES `user_viewing_status` WRITE;
/*!40000 ALTER TABLE `user_viewing_status` DISABLE KEYS */;
INSERT INTO `user_viewing_status` VALUES (1,_binary '',156718,2,'2023-05-17'),(2,_binary '\0',156718,2,'2023-05-17'),(3,_binary '\0',155526,2,'2023-05-17'),(4,_binary '\0',155528,2,'2023-05-17'),(5,_binary '\0',155536,2,'2023-05-17'),(6,_binary '\0',1805,8,'2023-05-17'),(7,_binary '\0',1806,8,'2023-05-17'),(8,_binary '\0',1807,8,'2023-05-17'),(9,_binary '\0',55440,4,'2023-05-17'),(10,_binary '\0',55279,4,'2023-05-17'),(11,_binary '\0',44716,4,'2023-05-17'),(12,_binary '\0',37130,4,'2023-05-17'),(13,_binary '\0',47846,2,'2023-05-17'),(14,_binary '\0',47847,2,'2023-05-18'),(15,_binary '',127949,1,'2023-05-18'),(16,_binary '\0',155510,2,'2023-05-18'),(17,_binary '\0',149,2,'2023-05-18'),(18,_binary '\0',155512,2,'2023-05-18'),(19,_binary '\0',143728,2,'2023-05-18'),(20,_binary '\0',143728,2,'2023-05-18'),(21,_binary '\0',155522,2,'2023-05-18'),(22,_binary '\0',155522,2,'2023-05-18'),(23,_binary '\0',155522,2,'2023-05-18'),(24,_binary '\0',155522,2,'2023-05-18'),(25,_binary '\0',155522,2,'2023-05-18'),(26,_binary '\0',155522,2,'2023-05-18'),(27,_binary '\0',155518,2,'2023-05-18'),(28,_binary '\0',80,4,'2023-05-18'),(29,_binary '\0',87,4,'2023-05-18'),(30,_binary '',68956,5,'2023-05-18'),(31,_binary '',37171,5,'2023-05-18'),(32,_binary '',68952,5,'2023-05-18'),(33,_binary '',68952,5,'2023-05-18'),(34,_binary '',68952,5,'2023-05-18'),(35,_binary '\0',68952,5,'2023-05-18'),(36,_binary '',68950,5,'2023-05-18'),(37,_binary '',47846,5,'2023-05-18'),(38,_binary '',62417,1,'2023-05-18'),(39,_binary '\0',24105,15,'2023-05-18'),(40,_binary '\0',63450,15,'2023-05-18'),(41,_binary '\0',72578,15,'2023-05-18'),(42,_binary '\0',156490,15,'2023-05-18'),(43,_binary '\0',38918,15,'2023-05-18'),(44,_binary '\0',143727,15,'2023-05-18'),(45,_binary '\0',143728,15,'2023-05-18'),(46,_binary '\0',143729,15,'2023-05-18'),(47,_binary '\0',143730,15,'2023-05-18'),(48,_binary '\0',143731,15,'2023-05-18'),(49,_binary '\0',143732,15,'2023-05-18'),(50,_binary '\0',143733,15,'2023-05-18'),(51,_binary '\0',59483,4,'2023-05-18'),(52,_binary '\0',59484,4,'2023-05-18'),(53,_binary '\0',59485,4,'2023-05-18'),(54,_binary '',155537,5,'2023-05-19');
/*!40000 ALTER TABLE `user_viewing_status` ENABLE KEYS */;
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

-- Dump completed on 2023-05-19 10:55:02
