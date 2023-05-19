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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `age` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` bit(1) NOT NULL,
  `img_name` varchar(255) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `is_content_alarm` bit(1) NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  `is_ott_alarm` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `fcm_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,0,'dduckhand@naver.com',_binary '\0','userimages/8c51667b-0007-4b2f-b3ca-63c73070847a환경병진.png','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/8c51667b-0007-4b2f-b3ca-63c73070847a%ED%99%98%EA%B2%BD%EB%B3%91%EC%A7%84.png',_binary '\0',_binary '\0',_binary '\0','손민혁 Son','고병진의 왼팔','KAKAO','dILFy0FJxOO8FIPLSYJ65x:APA91bExv97IU32vG_Jz-SWAUWnJl4p5kQiQtHxtQDeuRN4RAcWLZO_qrI4t5eH2ah-zvXFFHACjTGdex29lj2Holsj5DEUWz5ykxpRuDCUCwdx284ELqRmbBYy8Z5-uumOOhI_lCtCA'),(2,0,'jh8671@naver.com',_binary '\0','userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG',_binary '',_binary '\0',_binary '','깃기','깃기일텐데','KAKAO','e-yI-_ou1D_D6wl-hLGlb5:APA91bGIFngIYPnuwqyLPCjOwZSpVXPApt8iwa0IoNWYIup7N6FWkwNBikjeuYV2nYiQSKdCgl8xUIDNBLa3N-A1tLRc0XS8glhQ_W-BwnNhDKkTcy5WSORpZstlxIq754-iLyf-YitS'),(3,0,'tjddms7973@naver.com',_binary '\0','userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG',_binary '',_binary '\0',_binary '','김성은','춤추는 고라니','KAKAO','e90VT9S50_XoU4yWqP6oB6:APA91bEXfJG8zzIX4iWMh83NsCAJlFt3j8Sd2VlJWtlvHgMv1FKxmcm6okV_S5KknPftPBJmqaeNw5u9rcSao_w9pWSoNq1Y_dAg0C_P95kw4Lnw6t-jVd1MHWN16m1N45U1_hqvkIPf'),(4,0,'zerg758@naver.com',_binary '\0','userimages/21cf1c65-9bef-450c-b1bb-955e659d4e68화면 캡처 2023-05-19 091033.jpg','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/21cf1c65-9bef-450c-b1bb-955e659d4e68%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202023-05-19%20091033.jpg',_binary '\0',_binary '\0',_binary '\0','고병진','고병진보리밥','KAKAO','fa2AKLPvacbenImLSk9jox:APA91bESEy8vBW3PvNsOHXckjrlPtXrTd9guld9Qdv4OoK3XkuxairYhQledxb6DHfI_Wpn5KtVe1GlsuwaLRfIZ2Nv4SjcOuPaYzKm_crYSXC4oXBUg8RRYx6gzvPaBJF1TWrj3RFKt'),(5,0,'sdc00035@naver.com',_binary '\0','userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG',_binary '',_binary '\0',_binary '\0','박용찬','박용찬','KAKAO','ejoN018ZsPq25xe1a0UITV:APA91bFxRBbiL0oBSrJjg78mhAypgcjZMhdvFcPktJ6-0hePPWxdgLajzxU47qdI-ohNxBUeu6jTNITKjYRuzveFisNLI3FWNDdVORMvE-YqQproDYBFMzmTUhO9xuLsbKl0pY67sut3'),(6,0,'bljh1008@naver.com',_binary '\0','userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG',_binary '\0',_binary '\0',_binary '\0','김혜림','김혜림','KAKAO',NULL),(7,0,'gotommao@gmail.com',_binary '\0','userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG',_binary '\0',_binary '\0',_binary '\0','고병진','고병진','GOOGLE',NULL),(8,0,'zxzx9404@naver.com',_binary '\0','userimages/216fe6cd-57eb-4755-a2cf-f8bc7707796cScreenshot_20230412_231540_KakaoTalk.jpg','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/216fe6cd-57eb-4755-a2cf-f8bc7707796cScreenshot_20230412_231540_KakaoTalk.jpg',_binary '\0',_binary '\0',_binary '\0','최은성','은성은성은성은성','KAKAO','cqeADoXJfWR6FckMrmc6GN:APA91bFxSMQTQM1NuasNsSriWwomfuzc759z1CD-Tq-DfuM8o4XYqEZLk1f5J3yL3IKF2aJM--tbz9jCHFc1UIij8-_mYlvceSUTDtaEyVCPWsH66PVwvBGWwEviD-V-CYmn1d8x602_'),(9,0,'mh.blosson@gmail.com',_binary '\0','userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG',_binary '\0',_binary '\0',_binary '\0','Minhyeok Son','Minhyeok Son','GOOGLE',NULL),(10,0,'zxzx9404@gmail.com',_binary '\0','userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG',_binary '\0',_binary '\0',_binary '\0','은성','은성','GOOGLE','cqeADoXJfWR6FckMrmc6GN:APA91bFxSMQTQM1NuasNsSriWwomfuzc759z1CD-Tq-DfuM8o4XYqEZLk1f5J3yL3IKF2aJM--tbz9jCHFc1UIij8-_mYlvceSUTDtaEyVCPWsH66PVwvBGWwEviD-V-CYmn1d8x602_'),(11,0,'tjddms7973@gmail.com',_binary '\0','userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG',_binary '\0',_binary '\0',_binary '\0','김성은','김성은','GOOGLE','e90VT9S50_XoU4yWqP6oB6:APA91bEXfJG8zzIX4iWMh83NsCAJlFt3j8Sd2VlJWtlvHgMv1FKxmcm6okV_S5KknPftPBJmqaeNw5u9rcSao_w9pWSoNq1Y_dAg0C_P95kw4Lnw6t-jVd1MHWN16m1N45U1_hqvkIPf'),(12,0,'sonyujin596@gmail.com',_binary '\0','userimages/95c38767-85b5-4234-b117-3d8842d38e58안유진.jpg','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/95c38767-85b5-4234-b117-3d8842d38e58%EC%95%88%EC%9C%A0%EC%A7%84.jpg',_binary '',_binary '\0',_binary '','손유진','안유진','GOOGLE','dqTScZZO87xRQ1YmVRRt9J:APA91bEhWZcdNGHvtwsEsHtwZ8jMqj8xIwaQnMtoTT02XGCmAemaRHNb4CKx0v5cDcnNYv2wSwWW5_eLIqrV3fq-UhELRmqdU__NGHchs4ajIhmjalmbFQ3y_eV4qo-4J2mcVGGFFMGA'),(13,0,'11395945@naver.com',_binary '\0','userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG',_binary '\0',_binary '\0',_binary '\0','임민수','임민수','KAKAO',NULL),(14,0,NULL,_binary '\0','userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG',_binary '\0',_binary '\0',_binary '\0','함정빈','코코코코콩','KAKAO','fxILoUgwr6PYKH3mU4Wdpd:APA91bHIsvNlbEFaftnDi2vovNGXcPg34ErCUJUaQkcSn84D9ELEyipUwxqHoAKQ7CTn9WXox3l9bEADnaPSRTo2qj6YIMJv-XKytNqaSCqryzVC0eUUWW3o63hKYzOjKor9rwBo63Fb'),(15,0,'a207testwatchify@gmail.com',_binary '\0','userimages/42f100da-eb02-42c1-9b62-56f03230708c찰옥수수.jpg','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/42f100da-eb02-42c1-9b62-56f03230708c%EC%B0%B0%EC%98%A5%EC%88%98%EC%88%98.jpg',_binary '\0',_binary '\0',_binary '\0','홍길동','찰옥수수','GOOGLE','dVk4sZFiFg68lJ_aVpJICs:APA91bG9ruYG2lbxQTLc9NSGOGH1P4YluUg6HkIdUgxtgZXNzIa0X8KykajcZDAad-RtYQsmCWBDqh0UVC7dtRjuRd6iK6gvUUsT3ux07D1xtn_uVXv0Nt2SmiKLVx5u_qbhsCyq2tWR'),(16,0,'bana11@naver.com',_binary '\0','userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/d7232718-e900-4425-a8e5-47090b98d1aftestUser.PNG',_binary '\0',_binary '\0',_binary '\0','바다 ليلى Bada','바다 ليلى Bada','KAKAO','fK0eA3cd4C8anEh202V5Uo:APA91bGK4Id9rXzOF37FA0_HXodNxtwLjMgHnwNUTLxIpgU_0Dha0Mc5qZD3JoS1Ftm4tAgwvHSGFYQg8fWP1gmaNFUVXzJOU77l5o0Y_vJc4Ob9cjfg9IKzPk3mKI-k4FDit8-P0KZs'),(17,0,'gittgi768@gmail.com',_binary '\0','userimages/dd9a408d-5569-41b2-b0ad-e29f411da4051680836818447.jpg','https://watchify.s3.ap-northeast-2.amazonaws.com/userimages/dd9a408d-5569-41b2-b0ad-e29f411da4051680836818447.jpg',_binary '\0',_binary '\0',_binary '\0','gittgi','gittgi','GOOGLE','dVk4sZFiFg68lJ_aVpJICs:APA91bG9ruYG2lbxQTLc9NSGOGH1P4YluUg6HkIdUgxtgZXNzIa0X8KykajcZDAad-RtYQsmCWBDqh0UVC7dtRjuRd6iK6gvUUsT3ux07D1xtn_uVXv0Nt2SmiKLVx5u_qbhsCyq2tWR');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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

-- Dump completed on 2023-05-19 10:54:58
