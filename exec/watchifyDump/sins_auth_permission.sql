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
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add calender',1,'add_calender'),(2,'Can change calender',1,'change_calender'),(3,'Can delete calender',1,'delete_calender'),(4,'Can view calender',1,'view_calender'),(5,'Can add content',2,'add_content'),(6,'Can change content',2,'change_content'),(7,'Can delete content',2,'delete_content'),(8,'Can view content',2,'view_content'),(9,'Can add content genre',3,'add_contentgenre'),(10,'Can change content genre',3,'change_contentgenre'),(11,'Can delete content genre',3,'delete_contentgenre'),(12,'Can view content genre',3,'view_contentgenre'),(13,'Can add contentott',4,'add_contentott'),(14,'Can change contentott',4,'change_contentott'),(15,'Can delete contentott',4,'delete_contentott'),(16,'Can view contentott',4,'view_contentott'),(17,'Can add day',5,'add_day'),(18,'Can change day',5,'change_day'),(19,'Can delete day',5,'delete_day'),(20,'Can view day',5,'view_day'),(21,'Can add genre',6,'add_genre'),(22,'Can change genre',6,'change_genre'),(23,'Can delete genre',6,'delete_genre'),(24,'Can view genre',6,'view_genre'),(25,'Can add like content',7,'add_likecontent'),(26,'Can change like content',7,'change_likecontent'),(27,'Can delete like content',7,'delete_likecontent'),(28,'Can view like content',7,'view_likecontent'),(29,'Can add ott',8,'add_ott'),(30,'Can change ott',8,'change_ott'),(31,'Can delete ott',8,'delete_ott'),(32,'Can view ott',8,'view_ott'),(33,'Can add ranking content',9,'add_rankingcontent'),(34,'Can change ranking content',9,'change_rankingcontent'),(35,'Can delete ranking content',9,'delete_rankingcontent'),(36,'Can view ranking content',9,'view_rankingcontent'),(37,'Can add schedule share',10,'add_scheduleshare'),(38,'Can change schedule share',10,'change_scheduleshare'),(39,'Can delete schedule share',10,'delete_scheduleshare'),(40,'Can view schedule share',10,'view_scheduleshare'),(41,'Can add turn content',11,'add_turncontent'),(42,'Can change turn content',11,'change_turncontent'),(43,'Can delete turn content',11,'delete_turncontent'),(44,'Can view turn content',11,'view_turncontent'),(45,'Can add user',12,'add_user'),(46,'Can change user',12,'change_user'),(47,'Can delete user',12,'delete_user'),(48,'Can view user',12,'view_user'),(49,'Can add user day',13,'add_userday'),(50,'Can change user day',13,'change_userday'),(51,'Can delete user day',13,'delete_userday'),(52,'Can view user day',13,'view_userday'),(53,'Can add userott',14,'add_userott'),(54,'Can change userott',14,'change_userott'),(55,'Can delete userott',14,'delete_userott'),(56,'Can view userott',14,'view_userott'),(57,'Can add user viewing status',15,'add_userviewingstatus'),(58,'Can change user viewing status',15,'change_userviewingstatus'),(59,'Can delete user viewing status',15,'delete_userviewingstatus'),(60,'Can view user viewing status',15,'view_userviewingstatus'),(61,'Can add wish content',16,'add_wishcontent'),(62,'Can change wish content',16,'change_wishcontent'),(63,'Can delete wish content',16,'delete_wishcontent'),(64,'Can view wish content',16,'view_wishcontent'),(65,'Can add log entry',17,'add_logentry'),(66,'Can change log entry',17,'change_logentry'),(67,'Can delete log entry',17,'delete_logentry'),(68,'Can view log entry',17,'view_logentry'),(69,'Can add permission',18,'add_permission'),(70,'Can change permission',18,'change_permission'),(71,'Can delete permission',18,'delete_permission'),(72,'Can view permission',18,'view_permission'),(73,'Can add group',19,'add_group'),(74,'Can change group',19,'change_group'),(75,'Can delete group',19,'delete_group'),(76,'Can view group',19,'view_group'),(77,'Can add user',20,'add_user'),(78,'Can change user',20,'change_user'),(79,'Can delete user',20,'delete_user'),(80,'Can view user',20,'view_user'),(81,'Can add content type',21,'add_contenttype'),(82,'Can change content type',21,'change_contenttype'),(83,'Can delete content type',21,'delete_contenttype'),(84,'Can view content type',21,'view_contenttype'),(85,'Can add session',22,'add_session'),(86,'Can change session',22,'change_session'),(87,'Can delete session',22,'delete_session'),(88,'Can view session',22,'view_session'),(89,'Can add auth group',23,'add_authgroup'),(90,'Can change auth group',23,'change_authgroup'),(91,'Can delete auth group',23,'delete_authgroup'),(92,'Can view auth group',23,'view_authgroup'),(93,'Can add auth group permissions',24,'add_authgrouppermissions'),(94,'Can change auth group permissions',24,'change_authgrouppermissions'),(95,'Can delete auth group permissions',24,'delete_authgrouppermissions'),(96,'Can view auth group permissions',24,'view_authgrouppermissions'),(97,'Can add auth permission',25,'add_authpermission'),(98,'Can change auth permission',25,'change_authpermission'),(99,'Can delete auth permission',25,'delete_authpermission'),(100,'Can view auth permission',25,'view_authpermission'),(101,'Can add auth user',26,'add_authuser'),(102,'Can change auth user',26,'change_authuser'),(103,'Can delete auth user',26,'delete_authuser'),(104,'Can view auth user',26,'view_authuser'),(105,'Can add auth user groups',27,'add_authusergroups'),(106,'Can change auth user groups',27,'change_authusergroups'),(107,'Can delete auth user groups',27,'delete_authusergroups'),(108,'Can view auth user groups',27,'view_authusergroups'),(109,'Can add auth user user permissions',28,'add_authuseruserpermissions'),(110,'Can change auth user user permissions',28,'change_authuseruserpermissions'),(111,'Can delete auth user user permissions',28,'delete_authuseruserpermissions'),(112,'Can view auth user user permissions',28,'view_authuseruserpermissions'),(113,'Can add django admin log',29,'add_djangoadminlog'),(114,'Can change django admin log',29,'change_djangoadminlog'),(115,'Can delete django admin log',29,'delete_djangoadminlog'),(116,'Can view django admin log',29,'view_djangoadminlog'),(117,'Can add django content type',30,'add_djangocontenttype'),(118,'Can change django content type',30,'change_djangocontenttype'),(119,'Can delete django content type',30,'delete_djangocontenttype'),(120,'Can view django content type',30,'view_djangocontenttype'),(121,'Can add django migrations',31,'add_djangomigrations'),(122,'Can change django migrations',31,'change_djangomigrations'),(123,'Can delete django migrations',31,'delete_djangomigrations'),(124,'Can view django migrations',31,'view_djangomigrations'),(125,'Can add django session',32,'add_djangosession'),(126,'Can change django session',32,'change_djangosession'),(127,'Can delete django session',32,'delete_djangosession'),(128,'Can view django session',32,'view_djangosession');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
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
