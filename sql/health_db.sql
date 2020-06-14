/*
Navicat MySQL Data Transfer

Source Server         : rds
Source Server Version : 80016
Source Host           : rm-bp1booh30eg441m31fo.mysql.rds.aliyuncs.com:3306
Source Database       : health_db

Target Server Type    : MYSQL
Target Server Version : 80016
File Encoding         : 65001

Date: 2020-06-14 21:20:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `card`
-- ----------------------------
DROP TABLE IF EXISTS `card`;
CREATE TABLE `card` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户编号',
  `date` varchar(20) NOT NULL COMMENT '打卡日期',
  `temp` decimal(3,1) NOT NULL COMMENT '体温',
  `blodpres_shrink` int(11) DEFAULT NULL COMMENT '收缩压',
  `blodpres_relax` int(11) DEFAULT NULL COMMENT '舒张压',
  `heartrat` int(11) DEFAULT NULL COMMENT '心率',
  `status` varchar(20) NOT NULL COMMENT '1 正常；0 低烧；2 高烧；3 心率过高；4：低血压; 5 高血压',
  `score` int(11) NOT NULL COMMENT '健康指数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of card
-- ----------------------------
INSERT INTO `card` VALUES ('10', '59', '2020/05/13', '36.4', null, null, '74', '1|6', '100');
INSERT INTO `card` VALUES ('11', '59', '2020/05/14', '35.8', null, null, null, '1|6', '100');
INSERT INTO `card` VALUES ('12', '59', '2020/05/15', '36.2', '104', '68', '84', '1|6', '100');
INSERT INTO `card` VALUES ('13', '59', '2020/05/16', '36.6', null, null, null, '1|6', '100');
INSERT INTO `card` VALUES ('14', '59', '2020/05/17', '36.5', null, null, null, '1|6', '100');
INSERT INTO `card` VALUES ('15', '59', '2020/05/18', '36.9', null, null, null, '1|6', '100');
INSERT INTO `card` VALUES ('16', '59', '2020/05/19', '36.7', '109', '70', '78', '1|6', '100');
INSERT INTO `card` VALUES ('17', '59', '2020/05/20', '36.4', null, null, '69', '1|6', '100');
INSERT INTO `card` VALUES ('18', '59', '2020/05/21', '36.5', '110', '65', '85', '1|6', '100');
INSERT INTO `card` VALUES ('19', '59', '2020/05/22', '36.6', null, null, null, '1|6', '100');
INSERT INTO `card` VALUES ('20', '59', '2020/05/23', '37.0', '114', '67', '76', '1|6', '100');
INSERT INTO `card` VALUES ('28', '59', '2020/05/25', '37.8', '111', '80', '79', '2|6', '70');
INSERT INTO `card` VALUES ('35', '59', '2020/05/31', '36.3', '110', '78', '87', '1|6', '100');
INSERT INTO `card` VALUES ('36', '59', '2020/06/01', '36.8', null, null, null, '1|6', '100');
INSERT INTO `card` VALUES ('38', '59', '2020/06/03', '36.9', null, null, null, '1|6', '100');
INSERT INTO `card` VALUES ('39', '59', '2020/06/06', '36.4', '108', '76', '95', '1|6', '100');
INSERT INTO `card` VALUES ('43', '55', '2020/06/07', '37.8', '110', '78', '78', '2|6', '65');
INSERT INTO `card` VALUES ('44', '59', '2020/06/07', '36.8', null, null, null, '1|6', '100');
INSERT INTO `card` VALUES ('45', '59', '2020/06/08', '40.0', null, null, null, '2|6', '65');
INSERT INTO `card` VALUES ('46', '59', '2020/06/09', '36.7', null, null, null, '1|6', '100');
INSERT INTO `card` VALUES ('47', '55', '2020/06/10', '37.5', '78', '91', '78', '2|6', '65');
INSERT INTO `card` VALUES ('48', '59', '2020/06/10', '36.5', null, null, null, '1|6', '100');
INSERT INTO `card` VALUES ('49', '59', '2020/06/11', '36.7', null, null, null, '1|6', '100');
INSERT INTO `card` VALUES ('50', '63', '2020/06/12', '45.0', '141', '91', '300', '2|3|5', '55');
INSERT INTO `card` VALUES ('51', '59', '2020/06/14', '36.5', null, null, null, '1|6', '100');

-- ----------------------------
-- Table structure for `foods`
-- ----------------------------
DROP TABLE IF EXISTS `foods`;
CREATE TABLE `foods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `type` tinyint(1) NOT NULL COMMENT '(0:主食 1:肉蛋奶 2:蔬菜)',
  `unit` varchar(10) NOT NULL COMMENT '单位',
  `calorie` int(11) NOT NULL COMMENT '千焦',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of foods
-- ----------------------------
INSERT INTO `foods` VALUES ('1', '豆沙包', '0', '个', '144');
INSERT INTO `foods` VALUES ('2', '肉包', '0', '个', '140');
INSERT INTO `foods` VALUES ('3', '粗粮馒头', '0', '个', '112');
INSERT INTO `foods` VALUES ('4', '小米粥', '0', '碗', '100');
INSERT INTO `foods` VALUES ('5', '糙米饭', '0', '碗', '120');
INSERT INTO `foods` VALUES ('6', '米饭', '0', '碗', '119');
INSERT INTO `foods` VALUES ('7', '南瓜粥', '0', '碗', '83');
INSERT INTO `foods` VALUES ('8', '全麦面包', '0', '片', '142');
INSERT INTO `foods` VALUES ('9', '挂面', '0', '份', '80');
INSERT INTO `foods` VALUES ('10', '玉米', '0', '根', '202');
INSERT INTO `foods` VALUES ('11', '马铃薯', '0', '个', '100');
INSERT INTO `foods` VALUES ('12', '紫薯', '0', '小团', '50');
INSERT INTO `foods` VALUES ('13', '红薯', '0', '个', '100');
INSERT INTO `foods` VALUES ('14', '瘦猪肉', '1', '份 ', '100');
INSERT INTO `foods` VALUES ('15', '豆浆', '1', '杯', '78');
INSERT INTO `foods` VALUES ('16', '鸭肝', '1', '份', '76');
INSERT INTO `foods` VALUES ('17', '鱿鱼圈', '1', '份', '76');
INSERT INTO `foods` VALUES ('18', '豆腐丝', '1', '份', '90');
INSERT INTO `foods` VALUES ('19', '猪小排', '1', '块', '37');
INSERT INTO `foods` VALUES ('20', '鱼肉', '1', '份', '75');
INSERT INTO `foods` VALUES ('21', '腐竹', '1', '份', '100');
INSERT INTO `foods` VALUES ('22', '酸奶', '1', '碗', '180');
INSERT INTO `foods` VALUES ('23', '牛奶', '1', '杯', '150');
INSERT INTO `foods` VALUES ('24', '去皮鸡腿', '1', '个', '119');
INSERT INTO `foods` VALUES ('25', '瘦羊肉', '1', '份', '100');
INSERT INTO `foods` VALUES ('26', '虾仁', '1', '份', '100');
INSERT INTO `foods` VALUES ('27', '瘦牛肉', '1', '份', '100');
INSERT INTO `foods` VALUES ('28', '豆腐干', '1', '块', '35');
INSERT INTO `foods` VALUES ('29', '豆腐', '1', '份', '100');
INSERT INTO `foods` VALUES ('30', '鸡胸肉', '1', '份', '100');
INSERT INTO `foods` VALUES ('31', '鸡蛋', '1', '个', '62');
INSERT INTO `foods` VALUES ('32', '山竹', '2', '份', '60');
INSERT INTO `foods` VALUES ('33', '红提', '2', '份', '60');
INSERT INTO `foods` VALUES ('34', '南瓜', '2', '份', '25');
INSERT INTO `foods` VALUES ('35', '西红柿', '2', '个', '28');
INSERT INTO `foods` VALUES ('36', '黄瓜', '2', '根', '30');
INSERT INTO `foods` VALUES ('37', '球生菜', '2', '份', '26');
INSERT INTO `foods` VALUES ('38', '空心菜', '2', '份', '25');
INSERT INTO `foods` VALUES ('39', '芥蓝', '2', '份', '25');
INSERT INTO `foods` VALUES ('40', '花菜', '2', '份', '25');
INSERT INTO `foods` VALUES ('41', '大白菜', '2', '份', '25');
INSERT INTO `foods` VALUES ('42', '豆芽', '2', '份', '25');
INSERT INTO `foods` VALUES ('43', '秋葵', '2', '份', '25');
INSERT INTO `foods` VALUES ('44', '扁豆', '2', '份', '25');
INSERT INTO `foods` VALUES ('45', '豇豆', '2', '份', '25');
INSERT INTO `foods` VALUES ('46', '茄子', '2', '份', '58');
INSERT INTO `foods` VALUES ('47', '菠菜', '2', '份', '56');
INSERT INTO `foods` VALUES ('48', '牛油果', '2', '份', '60');
INSERT INTO `foods` VALUES ('49', '丝瓜', '2', '份', '53');
INSERT INTO `foods` VALUES ('50', '生菜', '2', '份', '28');

-- ----------------------------
-- Table structure for `goods`
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '商品名',
  `stock` int(11) NOT NULL COMMENT '库存',
  `price` decimal(6,2) NOT NULL,
  `sale` tinyint(1) NOT NULL COMMENT '(1:特价 0:非特价)',
  `url` varchar(255) NOT NULL,
  `unit` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `type` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '豆沙包', '0', '1.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/bean_bun.jpg', '个', '0');
INSERT INTO `goods` VALUES ('2', '肉包', '0', '1.50', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/meat_bun.jpg', '个', '0');
INSERT INTO `goods` VALUES ('3', '粗粮馒头', '0', '1.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/bun.jpg', '个', '0');
INSERT INTO `goods` VALUES ('4', '小米粥', '0', '5.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/millet.jpeg', '碗', '0');
INSERT INTO `goods` VALUES ('5', '糙米饭', '0', '2.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/brown.jpg', '碗', '0');
INSERT INTO `goods` VALUES ('6', '米饭', '0', '1.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/rice.jpg', '碗', '0');
INSERT INTO `goods` VALUES ('7', '南瓜粥', '0', '5.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/pumpkin_prg.jpeg', '碗', '0');
INSERT INTO `goods` VALUES ('8', '全麦面包', '0', '3.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/whole-wheat.jpeg', '片', '0');
INSERT INTO `goods` VALUES ('9', '挂面', '0', '6.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/fine_dried.jpeg', '份', '0');
INSERT INTO `goods` VALUES ('10', '玉米', '0', '6.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/corn.jpeg', '根', '0');
INSERT INTO `goods` VALUES ('11', '马铃薯', '0', '6.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/potato.jpeg', '个', '0');
INSERT INTO `goods` VALUES ('12', '紫薯', '0', '6.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/solanum.jpg', '小团', '0');
INSERT INTO `goods` VALUES ('13', '红薯', '0', '6.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/sweet_potato.jpeg', '个', '0');
INSERT INTO `goods` VALUES ('14', '瘦猪肉', '0', '10.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/lean_pork.jpeg', '份 ', '1');
INSERT INTO `goods` VALUES ('15', '豆浆', '0', '2.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/soybean_milk.jpeg', '杯', '1');
INSERT INTO `goods` VALUES ('16', '鸭肝', '0', '8.50', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/duck_liver.jpg', '份', '1');
INSERT INTO `goods` VALUES ('17', '鱿鱼圈', '0', '6.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/squid_ring.jpg', '份', '1');
INSERT INTO `goods` VALUES ('18', '豆腐丝', '0', '3.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/shredded.jpg', '份', '1');
INSERT INTO `goods` VALUES ('19', '猪小排', '0', '10.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/pork_ribs.jpg', '块', '1');
INSERT INTO `goods` VALUES ('20', '鱼肉', '0', '8.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/fish.jpg', '份', '1');
INSERT INTO `goods` VALUES ('21', '腐竹', '0', '3.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/bean_rolls.jpeg', '份', '1');
INSERT INTO `goods` VALUES ('22', '酸奶', '0', '6.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/yogurt.jpg', '碗', '1');
INSERT INTO `goods` VALUES ('23', '牛奶', '0', '5.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/milk.jpeg', '杯', '1');
INSERT INTO `goods` VALUES ('24', '去皮鸡腿', '0', '6.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/skinless_chicken.jpg', '个', '1');
INSERT INTO `goods` VALUES ('25', '瘦羊肉', '0', '8.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/thin_mutton.jpg', '份', '1');
INSERT INTO `goods` VALUES ('26', '虾仁', '0', '14.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/shrimp.jpg', '份', '1');
INSERT INTO `goods` VALUES ('27', '瘦牛肉', '0', '18.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/lean_beef.jpeg', '份', '1');
INSERT INTO `goods` VALUES ('28', '豆腐干', '0', '2.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/dried_bean_curd.jpg', '块', '1');
INSERT INTO `goods` VALUES ('29', '豆腐', '0', '1.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/tofu.jpg', '份', '1');
INSERT INTO `goods` VALUES ('30', '鸡胸肉', '0', '9.90', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/breast.jpeg', '份', '1');
INSERT INTO `goods` VALUES ('31', '鸡蛋', '0', '5.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/mmne/egg.jpeg', '个', '1');
INSERT INTO `goods` VALUES ('32', '山竹', '0', '13.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/mangosteen.jpg', '份', '2');
INSERT INTO `goods` VALUES ('33', '红提', '0', '19.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/red_grape.png', '份', '2');
INSERT INTO `goods` VALUES ('34', '南瓜', '0', '5.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/pumpkin.jpg', '份', '2');
INSERT INTO `goods` VALUES ('35', '西红柿', '0', '2.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/tomato.jpeg', '个', '2');
INSERT INTO `goods` VALUES ('36', '黄瓜', '0', '2.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/cucumber.jpeg', '根', '2');
INSERT INTO `goods` VALUES ('37', '球生菜', '0', '5.50', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/butterhead.jpg', '份', '2');
INSERT INTO `goods` VALUES ('38', '空心菜', '0', '3.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/cabbage.jpg', '份', '2');
INSERT INTO `goods` VALUES ('39', '芥蓝', '0', '5.50', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/cabbage_mustard.jpg', '份', '2');
INSERT INTO `goods` VALUES ('40', '花菜', '0', '3.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/cauliflower.jpeg', '份', '2');
INSERT INTO `goods` VALUES ('41', '大白菜', '0', '3.00', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/celery_cabbage.jpeg', '份', '2');
INSERT INTO `goods` VALUES ('42', '豆芽', '0', '4.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/bean_sprout.jpg', '份', '2');
INSERT INTO `goods` VALUES ('43', '秋葵', '0', '9.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/okra.jpeg', '份', '2');
INSERT INTO `goods` VALUES ('44', '扁豆', '0', '7.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/hyacinth_bean.jpg', '份', '2');
INSERT INTO `goods` VALUES ('45', '豇豆', '0', '3.50', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/cowpea.jpg', '份', '2');
INSERT INTO `goods` VALUES ('46', '茄子', '0', '4.90', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/eggplant.jpeg', '份', '2');
INSERT INTO `goods` VALUES ('47', '菠菜', '0', '3.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/spinach.jpg', '份', '2');
INSERT INTO `goods` VALUES ('48', '牛油果', '0', '9.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/avocado.jpg', '份', '2');
INSERT INTO `goods` VALUES ('49', '丝瓜', '0', '4.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/towel.jpg', '份', '2');
INSERT INTO `goods` VALUES ('50', '生菜', '0', '3.99', '0', 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/vegetables/lettuce.jpeg', '份', '2');

-- ----------------------------
-- Table structure for `health`
-- ----------------------------
DROP TABLE IF EXISTS `health`;
CREATE TABLE `health` (
  `uid` int(11) NOT NULL,
  `sex` tinyint(1) DEFAULT NULL COMMENT '性别',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `weight` decimal(4,1) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `level` decimal(4,2) DEFAULT NULL COMMENT '活动系数',
  `target` tinyint(1) DEFAULT NULL COMMENT '减肥或增肌',
  `dailyIngest` int(11) DEFAULT NULL COMMENT '每日摄入',
  `tempStatus` tinyint(1) unsigned DEFAULT NULL COMMENT '体温状态',
  `latestCard` varchar(20) DEFAULT NULL,
  `habitScore` int(11) DEFAULT NULL,
  `cardNum` int(11) DEFAULT '0' COMMENT '习惯养成计划打卡天数',
  `cardDate` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of health
-- ----------------------------
INSERT INTO `health` VALUES ('55', '1', '24', '65.0', '187', '0.20', '1', '2679', '0', '2020/06/10', '100', '0', null);
INSERT INTO `health` VALUES ('57', '0', '3', '20.0', '74', '0.55', '1', '1119', null, null, '80', '0', null);
INSERT INTO `health` VALUES ('59', '0', '23', '65.0', '160', '0.20', '0', '1241', '1', '2020/06/14', '85', '4', '2020/06/14');
INSERT INTO `health` VALUES ('63', '0', '80', '160.0', '125', '0.20', '1', '2470', '0', '2020/06/12', '80', '0', null);
INSERT INTO `health` VALUES ('64', '1', '23', '67.0', '183', '0.20', '1', '2876', null, null, '100', '0', null);

-- ----------------------------
-- Table structure for `notice`
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `top` tinyint(1) NOT NULL COMMENT '(1:置顶 0:非置顶)',
  `time` varchar(50) NOT NULL COMMENT '发表时间',
  `category` int(11) DEFAULT NULL COMMENT '类别(1:社区通知 2:舆情反馈 3:最新活动 …)',
  `imgurl` varchar(200) DEFAULT NULL COMMENT '配图url',
  `writer` varchar(20) DEFAULT NULL,
  `fileurl` varchar(200) DEFAULT NULL COMMENT '附件url',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES ('1', '《2019年药品舆情报告》发布', '浙江在线4月18日讯（浙江在线记者 胡昕然）梦，会开出花来。敢为人先的浙江打造的“未来社区”这个美梦，很快将照进现实。自今年浙江省两会“未来社区”首次被写入《政府工作报告》以来，浙江推进未来社区建设又有实质性进展。近日，省政府正式印发《浙江省未来社区建设试点工作方案》（以下简称《方案》），这也标志着浙江已着手开展未来社区建设试点申报工作，我省未来社区建设试点工作将全面启动。“未来社区”到底长啥样？与浙江人的生活有何密切联系？现在又进展到哪一步了？我们一起期待一下。', '0', '2019/04/17', '1', null, '张三', null);
INSERT INTO `notice` VALUES ('2', '社区卫生服务中心关于开通“社区健康通”的通知', '\r\n为落实政府为社区居民办实事提出的“社区健康通”24小时提供卫生服务的要求，自5月1日起，实现居民随时拨打“社区健康通”电话号码后得到相应的健康咨询服务，其服务内容如下：1、提供家庭医生和定点支援医院专家的诊疗预约咨询服务；2、提供用药安全咨询服务；3、提供健康教育咨询服务；4、提供慢病管理咨询服务；5、提供预防保健咨询服务。', '0', '2019/05/01', '2', '', '小肖', null);
INSERT INTO `notice` VALUES ('3', '假期健康饮食科普知识 ', '最近逢五一节假日，在这里提醒大家假期期间，饮食应保持清淡，减少油腻，搭配也要合理；少吃油腻和含糖高的食物，像糖果，甜点一类的食品通常所含的热量，油脂和糖分都很高，但营养价值很低，少吃会比较好。可以改吃各类坚果，比如花生，核桃等，这类食物对身体，特别是对心血管健康很有帮助。但是坚果油脂也不低，所以也要注意控制食量。要多吃蔬菜，节日的餐桌里菜肴丰盛，特别是鱼肉荤腥很多；然而这样的食物却总让人感到疲劳倦怠，还会增加胃肠胀气的现象。这时就要少沾些荤腥，多吃点蔬菜，便可有益健康。新鲜蔬菜是含碱的食物，不仅富含纤维素', '0', '2019/05/03', '1', null, '张三', null);
INSERT INTO `notice` VALUES ('4', '夏季老年人饮食健康科普', '老年人胃肠黏膜已经发生退行性变化，各种酶及胃酸的分泌量都有所降低，如果经常食用偏冷的食物，会使胃黏膜血管收缩加剧，进一步降低胃液分泌量，从而导致食欲下降以及消化不良。另外在低温状态下，会使老年人心脏冠状动脉发生痉挛，导致心肌缺血缺氧，诱发心率不齐和心绞痛。其实，夏天老人热食也许更凉快。喝热茶。夏季想要降热，不要只是喝冷饮，适当的热饮饮食也是解暑的关键。冷饮只能暂时解暑，不能持久解热、解渴，喝热茶却可刺激毛细血管普遍舒张，体温反而会明显降低，同时还有暖胃解渴的功效。吃热食。这里的热食有两方面意思，一是食物在老年人胃肠黏膜已经发生退行性变化，各种酶及胃酸的分泌量都有所降低，如果经常食用偏冷的食物，会使胃黏膜血管收缩加剧，进一步降低胃液分泌量，从而导致食欲下降以及消化不良。另外在低温状态下，会使老年人心脏冠状动脉发生痉挛，导致心肌缺血缺氧，诱发心率不齐和心绞痛。其实，夏天老人热食也许更凉快。喝热茶。夏季想要降热，不要只是喝冷饮，适当的热饮饮食也是解暑的关键。冷饮只能暂时解暑，不能持久解热、解渴，喝热茶却可刺激毛细血管普遍舒张，体温反而会明显降低，同时还有暖胃解渴的功效。吃热食。这里的热食有两方面意思，一是食物在夏季最好经过加热，可起到消毒灭菌的作用，保护身体不受细菌侵袭。二是可吃些热性食材，如羊肉可温补气血，开胃祛寒，脾胃虚寒或夏天长期待在空调房的老人，适宜吃些羊肉或羊汤。炒菜时也可适当用些大葱、蒜、生姜等调味，可以增加身体排汗，防暑降温。', '0', '2019/07/01', '1', null, '张三', null);
INSERT INTO `notice` VALUES ('5', '中秋节放假期间社区诊所值班安排', ' 2019年中秋节放假时间为9月13日（周五）-9月15日（周日），中心各临床科室及卫生站值班时间安排如下：\r\n    全  科：9月13日（周五）-9月15日（周日） 全天接诊：08:00－20:00\r\n    检验科：9月13日（周五）-9月15日（周日） 全天接诊：08:00－17:00\r\n    放射科：9月13日（周五）-9月15日（周日） 半天接诊：08:00－12:00\r\n    口腔科：9月13日（周五） 半天接诊：08:00－12:00\r\n    超声科：9月14日（周六） 半天接诊：08:00－12:00\r\n    ------------------------------------------------------------------------------------------------------------------------------------------------------温馨提示：\r\n    1、中医科（中医、针灸、理疗、康复）、眼科、妇科、预防保健科、健康科、医务科、财务科、办公室、东园站、西园站、中园站、花西站、南湖站、季景站、花家地站9月22日-9月24日全天停诊。\r\n    2、9月13日（周五）口腔科门诊限挂10个号，节假日期间不开展复杂牙拔除及牙周洁治项目，带来不便，敬请谅解。', '0', '2019/09/10', '1', null, '小肖', null);
INSERT INTO `notice` VALUES ('6', '守初心 担使命 共创新时代\r\n', '斗转星移，爆竹声中一岁除，春风送暖入屠苏。辞旧迎新，千门万户曈曈日，总把新桃换旧符。1月17日，社区在活动大厅举办了“不忘初心社区人，牢记使命创未来”2020年春节联欢会。满座高朋，如云胜友，共同来领略各个科室精心准备的饕餮盛宴。银花火树，流光溢彩，笑容满溢，欢声飘荡，整个会场的观众全都徜徉在欢乐喜庆的海洋里。\r\n    大海航行靠舵手，万物生长靠太阳。晚会开始前，社管先感谢了所有的员工和社会各界人士，慰问了仍在医院坚守岗位的同事。接着，社管带领我们共同回忆了努力拼搏平安度过的2019年，回忆每一个饱含困难和挑战的日夜，感恩每一位为共同家园拼搏的社区人，期待新一年的一帆风顺、一往无前。然后，又带领大家展望了2020年的前景，以人为本，质量至上，安全为本，去除浮躁，脚踏实地，不为规模所累，不为排名所扰；新的一年里，为全体社员全继续搭建一个充满包容、和谐快乐的工作环境，能充分的相互尊重、相互理解、相互帮助，坚持医院的公益性，坚持医德仁心，坚持“发展为了人民，发展依靠人民，发展成果人民共享”的原则，把医院的发展和我们每一个科室、每一个住户的发展紧密联系在一起，让我们齐心协力，共建我们的美好家园。社管的话饱含着热切的期望与对未来的信心，最后祝全体住户身心健康、工作顺利、阖家幸福、平安吉祥。 ', '0', '2020/01/19', '1', '', '小肖', '');
INSERT INTO `notice` VALUES ('7', '疫情防控中“以人民为中心”思想的实践', '<p>面对突如其来的新冠肺炎疫情，以习近平同志为核心的党中央迅速做出反应，打响了疫情防控的人民战争、总体战、阻击战。疫情同人民的生命和健康息息相关，关系着人民的根本利益，关系着社会的发展与稳定，疫情防控当属社会治理的重要内容。“以人民为中心”贯穿于中国社会各领域的治理实践之中。党中央对疫情的防控与治理充分展现了“中国之治”的人民价值立场，是“以人民为中心”思想的生动实践。</p><p><strong>以维护人民生命安全和身体健康为首位的防控要求</strong></p><p>在重大公共卫生突发事件面前，一个国家需要处理的事情较平常时期更为复杂，但是在这种特殊事件和情况面前，一个政党和政府的应急反应和首位要求最能凸显该政党和政府社会治理实践的价值立场和价值选择。</p><p>新冠病毒肺炎疫情发生之后，习近平总书记多次强调要“始终把人民群众生命安全和身体健康放在第一位”，在湖北省考察新冠肺炎疫情防控工作时指出“为保障人民生命安全和身体健康筑牢制度防线”“要组织动员更多党员、干部下沉一线、深入社区，及时解决人民群众实际困难”。这充分说明：疫情发生以来，习近平总书记的最大关切和最主要的关心是人民群众的生命安全和身体健康。</p><p>习近平总书记的最大关切同人民群众的最根本利益以及在疫情面前人民群众的最大关心是一致的、同位的。人的利益可以区分为根本利益和非根本利益，根本利益是关系人生命存在的利益，是关乎人生命存在的基本方面。很明显，生命安全和身体健康是人生命存在的基本前提，也是人生命创造财富和价值的重要基础。只有人的生命安全和身体健康得到保障，人的生命存在才能有保障；只有在生命安全和身体健康的条件下，人的生命才能够创造出更大的财富和价值。历来人们都十分珍惜和重视自己的生命安全和身体健康，因为二者是人的根本利益所在，在疫情这种特殊危险面前，人们会表现出对于生命和健康更为显著的担忧与关心。</p><p>党中央的疫情防控要求与最大关切和人民群众的根本利益与最大关心相一致、相契合，这种契合充分展现了中国疫情治理的基本价值立场——维护人民的根本利益，而维护人民根本利益是“以人民为中心”思想的体现。因此，此次中国疫情防控始终把人民群众生命安全和身体健康放在第一位，充分展现出了“以人民为中心”思想在疫情防控治理中的贯彻与落实</p>', '0', '2020/06/14', null, null, '胡一', null);
INSERT INTO `notice` VALUES ('8', '思想纵横：疫情防控展示文化的强大力量', '<p>中华文化源远流长、博大精深，为中华民族发展提供了强大精神动力。我国疫情防控阻击战取得重大战略成果，离不开中华优秀传统文化的支撑。习近平总书记指出，疫情防控斗争，“充分展示了中华优秀传统文化的强大力量”。疫情防控斗争的实践证明，中华优秀传统文化具有强大的生命力，是我们战胜各种风险挑战的强大精神支撑。</p><p>中华优秀传统文化注重家国情怀，这在疫情防控斗争中得到充分彰显。个人的家国情怀转化为实际行动，就是主动担当责任，如孔子所言“仁以为己任”，如顾炎武所说“天下兴亡，匹夫有责”，如林则徐所谓“苟利国家生死以，岂因祸福避趋之”。疫情防控激发了无数中国人勇敢拼搏的英雄主义精神，他们把个人生死置之度外，冲向最危险的地方，无私奉献、不怕牺牲。中华优秀传统文化所提倡的家国情怀，在这次抗疫斗争中表现为敢于担当、不怕牺牲、无私奉献，为爱国主义、集体主义、社会主义精神增添了时代光彩。</p><p>关爱生命是中华优秀传统文化倡导的道德规范和行为准则。《周易》有云：“天地之大德曰生”，把关爱生命看成天地之间伟大的道德。在疫情防控阻击战中，以习近平同志为核心的党中央明确要求各级党委和政府始终把人民群众生命安全和身体健康放在第一位，把提高收治率和治愈率、降低感染率和病亡率作为突出任务来抓。这是我国面对来势汹汹的疫情能够始终保持人心稳定、维护社会稳定的重要保证，也是我们党作为马克思主义执政党的使命担当。</p><p>自强不息是中华民族的精神基因。中华民族具有不畏艰险、迎难而上的巨大勇气，具有极强的自我修复和自力更生能力，呈现出变通达久的智慧和自强不息的活力。自强可以迸发强大的力量。在抗击疫情斗争中，中国人民怀着必胜的信心，全力以赴，顽强拼搏，彰显了中华民族坚韧不拔、自强不息的精神。</p><p>守望相助是中华民族历久弥新的文化传统。墨子倡导“兼相爱，交相利”，孟子主张“守望相助，疾病相扶持”，呼唤人与人之间、邻里之间相互扶持、互助互爱。这次抗疫斗争是一场史诗般的全民大动员，展现了中华民族的大团结。先贤倡导的守望相助、同舟共济、共克时艰的道德境界，由无数平凡中国人用汗水、鲜血甚至是生命赋予新的时代内涵，谱写了新篇章。</p>', '0', '2020/06/14', null, null, '胡一', null);
INSERT INTO `notice` VALUES ('9', '新知新觉：永葆“赶考”的清醒和坚定', '<p>1949年3月23日，党中央从西柏坡动身前往北京时，毛泽东同志说：“今天是进京赶考的日子。”70多年的实践充分证明，我们党在这场历史性考试中取得了优异成绩。同时，我们党也清醒地认识到，这场考试还在继续。2013年7月，习近平总书记在西柏坡调研指导时指出：“党面临的‘赶考’远未结束”。2019年9月，习近平总书记在视察北京香山革命纪念地时强调：“始终保持奋发有为的进取精神，永葆党的先进性和纯洁性，以‘赶考’的清醒和坚定答好新时代的答卷。”走好新时代的长征路，需要我们始终保持“赶考”的清醒和坚定，始终牢记、努力践行中国共产党人的初心和使命。</p><p>初心和使命确保中国共产党人永葆“赶考”的清醒和坚定。中国共产党人的初心和使命，就是为中国人民谋幸福，为中华民族谋复兴。中国共产党一经成立，就义无反顾地肩负起实现中华民族伟大复兴的历史使命，把人民对美好生活的向往作为自己的奋斗目标。中国共产党人深知，为中国人民谋幸福、为中华民族谋复兴是伟大而艰巨的事业，不可能轻轻松松完成。我们党牢记初心和使命，在取得一个又一个胜利后仍然保持谦虚谨慎、不骄不躁、艰苦奋斗，仍然保持永不懈怠的精神状态和一往无前的奋斗姿态，永葆“赶考”的清醒和坚定。正因为牢记初心和使命，在新中国成立前夕，毛泽东同志提出了著名的“赶考”命题；正因为牢记初心和使命，在新中国成立70周年之际，习近平总书记再次要求以“赶考”的清醒和坚定答好新时代的答卷。初心和使命是激励中国共产党人不断前进的根本动力，正是初心和使命所确立的高远理想和坚定信念，使中国共产党人面对胜利时不会骄傲和懈怠，永葆“赶考”的清醒和坚定。</p>', '0', '2020/06/14', null, null, '胡一', null);

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户编号',
  `goodsName` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `goodsNum` varchar(255) NOT NULL,
  `goodsPrice` varchar(255) NOT NULL,
  `payment` float(6,2) NOT NULL,
  `date` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('2', '55', '豆沙包|南瓜粥', '1|1', '1|5', '6.00', '2020-06-10 19:44:18');
INSERT INTO `orders` VALUES ('13', '55', '挂面|豆沙包|肉包', '1|1|1', '6.99|1|1.5', '9.49', '2020-06-10 21:34:41');
INSERT INTO `orders` VALUES ('14', '55', '全麦面包|红薯|豆沙包', '3|3|2', '9|18|2', '29.00', '2020-06-10 21:38:00');

-- ----------------------------
-- Table structure for `sports`
-- ----------------------------
DROP TABLE IF EXISTS `sports`;
CREATE TABLE `sports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '运动名称',
  `time` int(11) NOT NULL COMMENT '预计时长',
  `descrip` varchar(200) NOT NULL COMMENT '描述(使用''|''分割)',
  `per` varchar(50) NOT NULL COMMENT '每组规格',
  `group` int(11) NOT NULL COMMENT '组数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sports
-- ----------------------------
INSERT INTO `sports` VALUES ('1', '跪姿俯卧撑', '3', '双脚交叉，跪于垫上，腰背挺直，从侧面看身体成一条直线，双手撑于胸部两侧，间距比肩略宽|屈臂俯身至肘关节略高于躯干，然后伸臂起身还原', '8个', '3');
INSERT INTO `sports` VALUES ('2', '俯身肘对膝', '3', '手撑于垫子上，手肘微屈|收紧腰腹，身体绷成一条直线|抬腿提膝，用膝盖去碰触同侧肘关节', '20个', '3');
INSERT INTO `sports` VALUES ('3', '墙壁俯卧撑', '3', '双手伸直撑墙，与胸等高，胸部挺起|屈肘，身体靠向墙壁，直到脸贴近墙壁|撑起时，肘部往里夹，感受胸部发力', '12个', '3');
INSERT INTO `sports` VALUES ('4', '仰卧剪刀腿', '3', '平躺在垫子上，双腿绷直，抬离地面|腹部发力，让双腿有节奏的上下交替', '12个', '3');
INSERT INTO `sports` VALUES ('5', '侧卧抬腿', '3', '侧卧在垫子上，双腿绷直|臀部外侧发力将另一边的腿抬至最高点|垂直向上抬腿到最高点，然后缓慢放下', '10个', '3');
INSERT INTO `sports` VALUES ('6', '跨步波比', '3', '自然站立，双脚分开与肩同宽|向下俯身，双手与肩同宽撑地|保持双肩稳定，双腿向后交替迈步再还原，身体不能晃动|站起身体，进行第二次动作，动作越连贯越好', '8个', '3');
INSERT INTO `sports` VALUES ('7', '靠墙静蹲', '3', '双脚分开与肩同宽，双手放于大腿上|缓慢下蹲至大腿与地面平行，保持住|下背紧贴墙面，感受膝盖附近肌肉发力', '40秒', '3');
INSERT INTO `sports` VALUES ('8', '站姿交替提膝收腹', '2', '双手轻放在耳后，双脚分开站立|左膝抬高，主动俯身，同时身体扭转，用右手肘去碰左膝，还原，然后换另外一侧', '16个', '2');
INSERT INTO `sports` VALUES ('9', '卷腹摸膝', '3', '平躺在瑜伽垫上，屈膝，双腿微微分开，双脚踩实|双手扶在大腿上，用腹肌的力量将肩部和上背部卷离地面，在双手触摸到膝盖后，缓慢回到起始位置|摸膝时，下背部保持紧贴地面，双臂始终伸直', '8个', '3');
INSERT INTO `sports` VALUES ('10', '合掌跳', '3', '抬头挺胸，绷紧腹部|绷紧手臂，用胸肌的力量合掌，同时双脚交替前后小幅跳跃', '20秒', '3');
INSERT INTO `sports` VALUES ('11', '箱式深蹲', '2', '自然站立，双脚分开与肩同宽，椅子放于身后|臀部缓慢向后推并向下蹲，蹲至臀部触碰椅子边缘，同时手臂前平举；略作停顿后，臀部发力站起还原至起始状态|坐在椅子边缘时，膝盖不要超过脚尖|腰腹始终收紧，坐下时只有下肢稍放松', '8个', '2');
INSERT INTO `sports` VALUES ('12', '臀桥', '3', '仰卧在瑜伽垫上，双腿屈曲略宽于肩，脚跟踩地|发力将臀部抬起至大腿与身体呈一条直线，臀部抬起时上背部支撑地面|下落时下背部贴地，但臀部悬空', '12个', '3');
INSERT INTO `sports` VALUES ('13', '缓冲深蹲跳', '3', '挺直腰背，双手交握放于胸前，双脚略宽于肩，深蹲|起身时，双脚蹬地跳起|下落时，屈髋屈膝，缓冲落地', '8个', '3');
INSERT INTO `sports` VALUES ('14', '手脚交叉开合跳', '3', '自然站立，收紧腰核心|双手在胸前握拳，双脚分开点地|点地瞬间跳起收回，双脚合并', '20秒', '3');
INSERT INTO `sports` VALUES ('15', '前后小跳', '3', '绷紧全身，前后跳动，跳动幅度不要太大|起跳时手臂放松，脚跟不要着地', '30秒', '3');
INSERT INTO `sports` VALUES ('16', '简易俄罗斯转体', '3', '坐于垫上，双腿曲膝，脚放于垫上，下背挺直，上背略微弓起|转动双肩来带动手臂的移动|手接触身体两侧地面，目光跟随双手移动', '14个', '3');
INSERT INTO `sports` VALUES ('17', '开合跳', '3', '收紧腰腹，手臂用力绷紧|用肩部力量抬臂，背部力量下压手臂，用手臂带动身体的跳跃|双脚开合跳跃，小腿尽可能放松，不可低头、仰头', '20秒', '3');
INSERT INTO `sports` VALUES ('18', '全身舒展', '2', '俯低身体，双手交叉|起身的同时双手划一个最大的圆举至头顶', '6个', '2');
INSERT INTO `sports` VALUES ('19', '仰卧交替摸脚', '3', '腰部贴地，下颚紧贴脖子|骨盆固定不动，移动双肩去让手触摸脚后跟', '18个', '3');
INSERT INTO `sports` VALUES ('20', '向前交替箭步蹲', '3', '双脚并拢，收紧腹部核心，双手放于腰侧，肩膀后缩下沉|上半身挺直，向前迈一侧腿并下蹲，重心位于两脚中间|下蹲至前侧大腿与身体呈90°角，前侧大腿与小腿呈90°角，后侧大腿与小腿呈90°角；略作停顿，前侧腿发力站起回到起始', '16个', '3');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '真实姓名',
  `phone` varchar(20) NOT NULL COMMENT '手机号',
  `address` varchar(50) NOT NULL COMMENT '住址',
  `passwd` varchar(50) NOT NULL,
  `type` tinyint(1) NOT NULL COMMENT '人员类型(1:管理员 0:普通用户)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('55', '张三', '13376546789', '1单元1幢101室', '5ffa3bb4362d53e7dca5419e79393574', '2');
INSERT INTO `user` VALUES ('57', '小肖', '19957282177', '2单元1幢101室', 'd9a6dfec9358109384808652c307c833', '2');
INSERT INTO `user` VALUES ('59', '胡一', '13386530621', '1单元1幢101室', 'd9a6dfec9358109384808652c307c833', '0');
INSERT INTO `user` VALUES ('60', '小根', '15858228937', '1单元1幢101室', 'd9a6dfec9358109384808652c307c833', '2');
INSERT INTO `user` VALUES ('63', '赵六', '15355490048', '1单元1幢201室', '69e44c1a7e3041e7b48a950070202046', '0');
INSERT INTO `user` VALUES ('64', '李四', '16798670917', '1单元1幢102室', 'd9a6dfec9358109384808652c307c833', '1');