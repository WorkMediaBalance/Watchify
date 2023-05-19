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
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-05-16 05:03:36.930632'),(2,'auth','0001_initial','2023-05-16 05:03:37.984164'),(3,'admin','0001_initial','2023-05-16 05:03:38.216681'),(4,'admin','0002_logentry_remove_auto_add','2023-05-16 05:03:38.248558'),(5,'admin','0003_logentry_add_action_flag_choices','2023-05-16 05:03:38.268109'),(6,'contenttypes','0002_remove_content_type_name','2023-05-16 05:03:38.414499'),(7,'auth','0002_alter_permission_name_max_length','2023-05-16 05:03:38.520111'),(8,'auth','0003_alter_user_email_max_length','2023-05-16 05:03:38.633255'),(9,'auth','0004_alter_user_username_opts','2023-05-16 05:03:38.672620'),(10,'auth','0005_alter_user_last_login_null','2023-05-16 05:03:38.767567'),(11,'auth','0006_require_contenttypes_0002','2023-05-16 05:03:38.790708'),(12,'auth','0007_alter_validators_add_error_messages','2023-05-16 05:03:38.808429'),(13,'auth','0008_alter_user_username_max_length','2023-05-16 05:03:38.905327'),(14,'auth','0009_alter_user_last_name_max_length','2023-05-16 05:03:39.029002'),(15,'auth','0010_alter_group_name_max_length','2023-05-16 05:03:39.148504'),(16,'auth','0011_update_proxy_permissions','2023-05-16 05:03:39.181579'),(17,'auth','0012_alter_user_first_name_max_length','2023-05-16 05:03:39.284422'),(18,'ml','0001_initial','2023-05-16 05:03:39.312988'),(19,'sessions','0001_initial','2023-05-16 05:03:39.398074'),(20,'ml','0002_authgroup_authgrouppermissions_authpermission_and_more','2023-05-18 01:02:59.394162');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
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

-- Dump completed on 2023-05-19 10:54:57
