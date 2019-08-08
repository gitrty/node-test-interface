/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.5.20-log : Database - daiouni
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`daiouni` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `daiouni`;

/*Table structure for table `shopping` */

DROP TABLE IF EXISTS `shopping`;

CREATE TABLE `shopping` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `wname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wprice` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wimg` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `shopping` */

insert  into `shopping`(`id`,`wname`,`wprice`,`wimg`) values (1,'恋人絮语','655999','1500616780447824288'),(2,'典雅','7115','1507630507958889089'),(3,'爱守护-公主','12280','1500616949483449841'),(4,'玫瑰情事','3889','1507630587747792085'),(5,'简单爱','4226','1500617011079585423'),(6,'百年经典','5305','1500617216838965590'),(7,'经典皇冠','8899','1507621834900057751'),(8,'暖怀','13260','1507626008904752881'),(9,'永恒的爱','1232','1507622712792079328'),(10,'玫瑰之心','32525','1507622832124257383'),(11,'璀璨','32325','1507633670150749152'),(12,'爱的星芒','1212','1507623006415184714'),(13,'浪漫星辰','124124','1507683862981910664'),(14,'璀璨','32532','1507623169593245033'),(15,'爱的星芒','2355','1507625137321616635'),(16,'典雅','23521','1507625253894581590'),(17,'爱守护-公主','5543','1507625307758297245'),(18,'璀璨','2444','1507626536678952341'),(19,'玫瑰情事','12412','1507626588227205108'),(20,'爱守护-公主','12412','1507625531586471361'),(21,'典雅','45745','1507625717305361899'),(22,'璀璨','5477','1507626120997791493'),(23,'恋人絮语','4574','1507626186869808694'),(24,'玫瑰之心','7457','1507626250892221225'),(25,'典雅','3734','1507634133240632309'),(26,'璀璨','347347','1507634195823211283'),(27,'玫瑰之心','34734','1507634241262344959'),(28,'恋人絮语','34774','1507634282586237753'),(29,'璀璨','1111','1507634426085646503'),(30,'浪漫星辰','1212','1507635211511104776'),(31,'玫瑰之心','2415','1507684042002748574'),(32,'爱守护-公主','1251','1507634825496884433'),(33,'浪漫星辰','34634','1507635031885329282'),(34,'玫瑰情事','3734','1507635088672985655'),(35,'恋人絮语','34737','1507635139055710507');

/*Table structure for table `userinfo` */

DROP TABLE IF EXISTS `userinfo`;

CREATE TABLE `userinfo` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `upwd` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ushop` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `userinfo` */

insert  into `userinfo`(`id`,`uname`,`upwd`,`ushop`) values (1,'abc','123','[{\"id\":2,\"wname\":\"典雅\",\"wprice\":\"7115\",\"wimg\":\"1507630507958889089\",\"num\":13},{\"id\":17,\"wname\":\"爱守护-公主\",\"wprice\":\"5543\",\"wimg\":\"1507625307758297245\",\"num\":4}]'),(2,'asd','123','[{\"id\":2,\"wname\":\"典雅\",\"wprice\":\"7115\",\"wimg\":\"1507630507958889089\",\"num\":1}]'),(3,'zxc','123','[{\"id\":6,\"wname\":\"百年经典\",\"wprice\":\"5305\",\"wimg\":\"1500617216838965590\",\"num\":16},{\"id\":7,\"wname\":\"经典皇冠\",\"wprice\":\"8899\",\"wimg\":\"1507621834900057751\",\"num\":2},{\"id\":2,\"wname\":\"典雅\",\"wprice\":\"7115\",\"wimg\":\"1507630507958889089\",\"num\":1}]'),(4,'zxcc','123',NULL),(5,'qwe','123','[{\"id\":23,\"wname\":\"恋人絮语\",\"wprice\":\"4574\",\"wimg\":\"1507626186869808694\",\"num\":3}]'),(6,'qweq','123',NULL),(7,'qweqq','123',NULL),(8,'qweqqq','123',NULL),(9,'qweqqq1','123',NULL),(10,'123','123',NULL),(11,'123123','123',NULL),(12,'abc123','123','[]'),(13,'qw','123',NULL),(14,'userObj.uname','123',NULL),(17,'123123123','123',NULL),(18,'1231231231','123',NULL),(19,'12312312310','123',NULL),(20,'123123123100','123',NULL),(22,'1231231231000','123',NULL),(24,'123123166','123',NULL),(26,'qwe123','123',NULL),(27,'abc12311','123',NULL),(30,'rty','MTIz',NULL),(32,'qweads','MTIzMTIz',NULL),(34,'qweqweqwe','MTIzMTIz',NULL),(36,'qweqweqweq','MTIzMTIz',NULL),(38,'qweadsww','MTIzMTIz',NULL),(57,NULL,NULL,NULL),(58,'qweqwe','MTIzMTIz',NULL),(59,NULL,NULL,NULL),(60,NULL,NULL,NULL),(61,NULL,NULL,NULL),(62,'qweqwe123','MTIzMTIz',NULL),(63,NULL,NULL,NULL),(64,'abc123123','MTIzMTIz',NULL),(65,'toyo1','MTIzMTIz','[]');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
