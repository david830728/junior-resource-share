-- 语文教材目录树 Seed Script  （七年级上/下、八年级上/下、九年级上）
-- 执行: mysql -u root -pAdmin@123456 junior_resource_share < seed_chinese.sql

START TRANSACTION;

-- 清理旧数据
DELETE ts FROM textbook_subsections ts JOIN textbook_chapters tc ON ts.chapter_id=tc.id WHERE tc.subject='语文';
DELETE FROM textbook_chapters WHERE subject='语文';

-- ============================================================
-- textbook_chapters  (subject,semester,chapter_num,chapter_title,section_num,section_title,code,sort_order,is_special)
-- ============================================================

INSERT INTO textbook_chapters (subject,semester,chapter_num,chapter_title,section_num,section_title,code,sort_order,is_special) VALUES
('语文','七年级上',1,NULL,NULL,'阅读',NULL,1,0),
('语文','七年级上',1,NULL,NULL,'写作',NULL,2,0),
('语文','七年级上',2,NULL,NULL,'阅读',NULL,3,0),
('语文','七年级上',2,NULL,NULL,'写作',NULL,4,0),
('语文','七年级上',2,NULL,NULL,'专题学习活动',NULL,5,0),
('语文','七年级上',3,NULL,NULL,'阅读',NULL,6,0),
('语文','七年级上',3,NULL,NULL,'写作',NULL,7,0),
('语文','七年级上',3,NULL,NULL,'整本书阅读',NULL,8,0),
('语文','七年级上',3,NULL,NULL,'课外古诗词诵读',NULL,9,0),
('语文','七年级上',4,NULL,NULL,'阅读',NULL,10,0),
('语文','七年级上',4,NULL,NULL,'写作',NULL,11,0),
('语文','七年级上',4,NULL,NULL,'专题学习活动',NULL,12,0),
('语文','七年级上',5,'活动·探究',NULL,'任务一 体会人与动物的关系',NULL,13,0),
('语文','七年级上',5,'活动·探究',NULL,'任务二 亲近动物，丰富生命体验',NULL,14,0),
('语文','七年级上',5,'活动·探究',NULL,'任务三 记叙与动物的相处',NULL,15,0),
('语文','七年级上',6,NULL,NULL,'阅读',NULL,16,0),
('语文','七年级上',6,NULL,NULL,'写作',NULL,17,0),
('语文','七年级上',6,NULL,NULL,'整本书阅读',NULL,18,0),
('语文','七年级上',6,NULL,NULL,'课外古诗词诵读',NULL,19,0),
('语文','七年级上',NULL,NULL,NULL,'小初衔接',NULL,20,1),
('语文','七年级上',NULL,NULL,NULL,'周测',NULL,21,1),
('语文','七年级上',NULL,NULL,NULL,'阶段检测',NULL,22,1),
('语文','七年级上',NULL,NULL,NULL,'期中',NULL,23,1),
('语文','七年级上',NULL,NULL,NULL,'期末',NULL,24,1),
('语文','七年级上',NULL,NULL,NULL,'寒暑假',NULL,25,1),
('语文','七年级上',NULL,NULL,NULL,'竞赛',NULL,26,1);

INSERT INTO textbook_chapters (subject,semester,chapter_num,chapter_title,section_num,section_title,code,sort_order,is_special) VALUES
('语文','七年级下',1,NULL,NULL,'阅读',NULL,1,0),
('语文','七年级下',1,NULL,NULL,'写作',NULL,2,0),
('语文','七年级下',2,NULL,NULL,'阅读',NULL,3,0),
('语文','七年级下',2,NULL,NULL,'写作',NULL,4,0),
('语文','七年级下',2,NULL,NULL,'专题学习活动',NULL,5,0),
('语文','七年级下',3,NULL,NULL,'阅读',NULL,6,0),
('语文','七年级下',3,NULL,NULL,'写作',NULL,7,0),
('语文','七年级下',3,NULL,NULL,'整本书阅读',NULL,8,0),
('语文','七年级下',3,NULL,NULL,'课外古诗词诵读',NULL,9,0),
('语文','七年级下',4,NULL,NULL,'阅读',NULL,10,0),
('语文','七年级下',4,NULL,NULL,'写作',NULL,11,0),
('语文','七年级下',4,NULL,NULL,'专题学习活动',NULL,12,0),
('语文','七年级下',5,NULL,NULL,'阅读',NULL,13,0),
('语文','七年级下',5,NULL,NULL,'写作',NULL,14,0),
('语文','七年级下',5,NULL,NULL,'整本书阅读',NULL,15,0),
('语文','七年级下',6,'活动·探究',NULL,'任务一 阅读与探讨',NULL,16,0),
('语文','七年级下',6,'活动·探究',NULL,'任务二 搜集与整理',NULL,17,0),
('语文','七年级下',6,'活动·探究',NULL,'任务三 表达与呈现',NULL,18,0),
('语文','七年级下',6,'活动·探究',NULL,'课外古诗词诵读',NULL,19,0),
('语文','七年级下',NULL,NULL,NULL,'开学',NULL,20,1),
('语文','七年级下',NULL,NULL,NULL,'周测',NULL,21,1),
('语文','七年级下',NULL,NULL,NULL,'阶段检测',NULL,22,1),
('语文','七年级下',NULL,NULL,NULL,'期中',NULL,23,1),
('语文','七年级下',NULL,NULL,NULL,'期末',NULL,24,1),
('语文','七年级下',NULL,NULL,NULL,'寒暑假',NULL,25,1),
('语文','七年级下',NULL,NULL,NULL,'竞赛',NULL,26,1);

INSERT INTO textbook_chapters (subject,semester,chapter_num,chapter_title,section_num,section_title,code,sort_order,is_special) VALUES
('语文','八年级上',1,'活动·探究',NULL,'任务一 新闻阅读',NULL,1,0),
('语文','八年级上',1,'活动·探究',NULL,'任务二 新闻采访',NULL,2,0),
('语文','八年级上',1,'活动·探究',NULL,'任务三 新闻写作',NULL,3,0),
('语文','八年级上',2,NULL,NULL,'阅读',NULL,4,0),
('语文','八年级上',2,NULL,NULL,'写作',NULL,5,0),
('语文','八年级上',2,NULL,NULL,'整本书阅读',NULL,6,0),
('语文','八年级上',3,NULL,NULL,'阅读',NULL,7,0),
('语文','八年级上',3,NULL,NULL,'写作',NULL,8,0),
('语文','八年级上',3,NULL,NULL,'专题学习活动',NULL,9,0),
('语文','八年级上',3,NULL,NULL,'课外古诗词诵读',NULL,10,0),
('语文','八年级上',4,NULL,NULL,'阅读',NULL,11,0),
('语文','八年级上',4,NULL,NULL,'写作',NULL,12,0),
('语文','八年级上',4,NULL,NULL,'整本书阅读',NULL,13,0),
('语文','八年级上',5,NULL,NULL,'阅读',NULL,14,0),
('语文','八年级上',5,NULL,NULL,'写作',NULL,15,0),
('语文','八年级上',5,NULL,NULL,'专题学习活动',NULL,16,0),
('语文','八年级上',6,NULL,NULL,'阅读',NULL,17,0),
('语文','八年级上',6,NULL,NULL,'写作',NULL,18,0),
('语文','八年级上',6,NULL,NULL,'课外古诗词诵读',NULL,19,0),
('语文','八年级上',NULL,NULL,NULL,'开学',NULL,20,1),
('语文','八年级上',NULL,NULL,NULL,'周测',NULL,21,1),
('语文','八年级上',NULL,NULL,NULL,'阶段检测',NULL,22,1),
('语文','八年级上',NULL,NULL,NULL,'期中',NULL,23,1),
('语文','八年级上',NULL,NULL,NULL,'期末',NULL,24,1),
('语文','八年级上',NULL,NULL,NULL,'寒暑假',NULL,25,1),
('语文','八年级上',NULL,NULL,NULL,'竞赛',NULL,26,1);

INSERT INTO textbook_chapters (subject,semester,chapter_num,chapter_title,section_num,section_title,code,sort_order,is_special) VALUES
('语文','八年级下',1,NULL,NULL,'阅读',NULL,1,0),
('语文','八年级下',1,NULL,NULL,'写作',NULL,2,0),
('语文','八年级下',2,NULL,NULL,'阅读',NULL,3,0),
('语文','八年级下',2,NULL,NULL,'写作',NULL,4,0),
('语文','八年级下',2,NULL,NULL,'专题学习活动',NULL,5,0),
('语文','八年级下',3,NULL,NULL,'阅读',NULL,6,0),
('语文','八年级下',3,NULL,NULL,'写作',NULL,7,0),
('语文','八年级下',3,NULL,NULL,'整本书阅读',NULL,8,0),
('语文','八年级下',3,NULL,NULL,'课外古诗词诵读',NULL,9,0),
('语文','八年级下',4,'活动·探究',NULL,'任务一 学习演讲词',NULL,10,0),
('语文','八年级下',4,'活动·探究',NULL,'任务二 撰写演讲稿',NULL,11,0),
('语文','八年级下',4,'活动·探究',NULL,'任务三 举办演讲比赛',NULL,12,0),
('语文','八年级下',5,NULL,NULL,'阅读',NULL,13,0),
('语文','八年级下',5,NULL,NULL,'写作',NULL,14,0),
('语文','八年级下',5,NULL,NULL,'整本书阅读',NULL,15,0),
('语文','八年级下',6,NULL,NULL,'阅读',NULL,16,0),
('语文','八年级下',6,NULL,NULL,'写作',NULL,17,0),
('语文','八年级下',6,NULL,NULL,'专题学习活动',NULL,18,0),
('语文','八年级下',6,NULL,NULL,'课外古诗词诵读',NULL,19,0),
('语文','八年级下',NULL,NULL,NULL,'开学',NULL,20,1),
('语文','八年级下',NULL,NULL,NULL,'周测',NULL,21,1),
('语文','八年级下',NULL,NULL,NULL,'阶段检测',NULL,22,1),
('语文','八年级下',NULL,NULL,NULL,'期中',NULL,23,1),
('语文','八年级下',NULL,NULL,NULL,'期末',NULL,24,1),
('语文','八年级下',NULL,NULL,NULL,'寒暑假',NULL,25,1),
('语文','八年级下',NULL,NULL,NULL,'竞赛',NULL,26,1);

INSERT INTO textbook_chapters (subject,semester,chapter_num,chapter_title,section_num,section_title,code,sort_order,is_special) VALUES
('语文','九年级上',1,'活动·探究',NULL,'任务一 学习鉴赏',NULL,1,0),
('语文','九年级上',1,'活动·探究',NULL,'任务二 诗歌朗诵',NULL,2,0),
('语文','九年级上',1,'活动·探究',NULL,'任务三 尝试创作',NULL,3,0),
('语文','九年级上',2,NULL,NULL,'阅读',NULL,4,0),
('语文','九年级上',2,NULL,NULL,'写作',NULL,5,0),
('语文','九年级上',2,NULL,NULL,'专题学习活动',NULL,6,0),
('语文','九年级上',3,NULL,NULL,'阅读',NULL,7,0),
('语文','九年级上',3,NULL,NULL,'写作',NULL,8,0),
('语文','九年级上',3,NULL,NULL,'课外古诗词诵读',NULL,9,0),
('语文','九年级上',4,NULL,NULL,'阅读',NULL,10,0),
('语文','九年级上',4,NULL,NULL,'写作',NULL,11,0),
('语文','九年级上',4,NULL,NULL,'整本书阅读',NULL,12,0),
('语文','九年级上',5,NULL,NULL,'阅读',NULL,13,0),
('语文','九年级上',5,NULL,NULL,'写作',NULL,14,0),
('语文','九年级上',5,NULL,NULL,'专题学习活动',NULL,15,0),
('语文','九年级上',6,NULL,NULL,'阅读',NULL,16,0),
('语文','九年级上',6,NULL,NULL,'写作',NULL,17,0),
('语文','九年级上',6,NULL,NULL,'整本书阅读',NULL,18,0),
('语文','九年级上',6,NULL,NULL,'课外古诗词诵读',NULL,19,0),
('语文','九年级上',NULL,NULL,NULL,'开学',NULL,20,1),
('语文','九年级上',NULL,NULL,NULL,'周测',NULL,21,1),
('语文','九年级上',NULL,NULL,NULL,'阶段检测',NULL,22,1),
('语文','九年级上',NULL,NULL,NULL,'期中',NULL,23,1),
('语文','九年级上',NULL,NULL,NULL,'期末',NULL,24,1),
('语文','九年级上',NULL,NULL,NULL,'寒暑假',NULL,25,1),
('语文','九年级上',NULL,NULL,NULL,'竞赛',NULL,26,1);

-- ============================================================
-- textbook_subsections  七年级上
-- ============================================================
SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=1 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=1 AND section_title='写作');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'春/朱自清','1',1),(@r,NULL,'济南的冬天/老舍','2',2),(@r,NULL,'雨的四季/刘湛秋','3*',3);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'古代诗歌四首','4',4);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'观沧海/曹操',NULL,1),(@r,@par,'次北固山下/王湾',NULL,2),(@r,@par,'闻王昌龄左迁龙标遥有此寄/李白',NULL,3),(@r,@par,'天净沙·秋思/马致远',NULL,4);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'热爱写作，学会观察',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=2 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=2 AND section_title='写作');
SET @s=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=2 AND section_title='专题学习活动');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'秋天的怀念/史铁生','5',1),(@r,NULL,'散步/莫怀戚','6',2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'散文诗二首','7*',3);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'金色花/泰戈尔',NULL,1),(@r,@par,'荷叶·母亲/冰心',NULL,2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'《世说新语》二则','8',4);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'咏雪',NULL,1),(@r,@par,'陈太丘与友期行',NULL,2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'学会记事',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@s,NULL,'有朋自远方来',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=3 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=3 AND section_title='写作');
SET @b=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=3 AND section_title='整本书阅读');
SET @p=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=3 AND section_title='课外古诗词诵读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'从百草园到三味书屋/鲁迅','9',1),(@r,NULL,'往事依依/于漪','10',2),(@r,NULL,'再塑生命的人/海伦·凯勒','11*',3),(@r,NULL,'《论语》十二章','12',4),(@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'如何突出中心',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@b,NULL,'《朝花夕拾》 精读、略读、浏览',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@p,NULL,'峨眉山月歌/李白',NULL,1),(@p,NULL,'江南逢李龟年/杜甫',NULL,2),(@p,NULL,'行军九日思长安故园/岑参',NULL,3),(@p,NULL,'夜上受降城闻笛/李益',NULL,4);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=4 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=4 AND section_title='写作');
SET @s=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=4 AND section_title='专题学习活动');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'纪念白求恩/毛泽东','13',1),(@r,NULL,'回忆我的母亲/朱德','14',2),(@r,NULL,'梅岭三章/陈毅','15*',3),(@r,NULL,'诫子书/诸葛亮','16',4),(@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'思路要清晰',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@s,NULL,'少年正是读书时',NULL,1);

SET @t1=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=5 AND section_title='任务一 体会人与动物的关系');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@t1,NULL,'猫/郑振铎','17',1),(@t1,NULL,'我的白鸽/陈忠实','18',2),(@t1,NULL,'大雁归来/利奥波德','19',3),(@t1,NULL,'狼/蒲松龄','20',4);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=6 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=6 AND section_title='写作');
SET @b=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=6 AND section_title='整本书阅读');
SET @p=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级上' AND chapter_num=6 AND section_title='课外古诗词诵读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'小圣施威降大圣/吴承恩','21',1),(@r,NULL,'皇帝的新装/安徒生','22',2),(@r,NULL,'女娲造人/袁珂','23*',3);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'寓言四则','24',4);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'赫耳墨斯和雕像者/《伊索寓言》',NULL,1),(@r,@par,'蚊子和狮子/《伊索寓言》',NULL,2),(@r,@par,'穿井得一人/《吕氏春秋》',NULL,3),(@r,@par,'杞人忧天/《列子》',NULL,4);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'发挥联想和想象',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@b,NULL,'《西游记》',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@p,NULL,'秋词（其一）/刘禹锡',NULL,1),(@p,NULL,'夜雨寄北/李商隐',NULL,2),(@p,NULL,'十一月四日风雨大作（其二）/陆游',NULL,3),(@p,NULL,'潼关/谭嗣同',NULL,4);

-- ============================================================
-- textbook_subsections  七年级下
-- ============================================================
SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=1 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=1 AND section_title='写作');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'邓稼先/杨振宁','1',1),(@r,NULL,'说和做——记闻一多先生言行片段/臧克家','2',2),(@r,NULL,'列夫·托尔斯泰/茨威格','3*',3),(@r,NULL,'孙权劝学/《资治通鉴》','4',4),(@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'写出人物特点',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=2 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=2 AND section_title='写作');
SET @s=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=2 AND section_title='专题学习活动');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'黄河颂/光未然','5',1),(@r,NULL,'老山界/陆定一','6',2),(@r,NULL,'谁是最可爱的人/魏巍','7',3),(@r,NULL,'土地的誓言/端木蕻良','8*',4),(@r,NULL,'木兰诗','9',5),(@r,NULL,'阅读综合实践',NULL,6);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'学习抒情',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@s,NULL,'我的语文生活',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=3 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=3 AND section_title='写作');
SET @b=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=3 AND section_title='整本书阅读');
SET @p=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=3 AND section_title='课外古诗词诵读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'阿长与《山海经》/鲁迅','10',1),(@r,NULL,'山地回忆/孙犁','11',2),(@r,NULL,'台阶/李森祥','12*',3),(@r,NULL,'卖油翁/欧阳修','13',4),(@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'抓住细节',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@b,NULL,'《骆驼祥子》圈点、批注、做笔记',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@p,NULL,'竹里馆/王维',NULL,1),(@p,NULL,'春夜洛城闻笛/李白',NULL,2),(@p,NULL,'逢入京使/岑参',NULL,3),(@p,NULL,'晚春/韩愈',NULL,4);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=4 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=4 AND section_title='写作');
SET @s=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=4 AND section_title='专题学习活动');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'驿路梨花/彭荆风','14',1),(@r,NULL,'青春之光/祝红蕾','15',2),(@r,NULL,'有为有不为/季羡林','16*',3);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'短文两篇','17',4);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'陋室铭/刘禹锡',NULL,1),(@r,@par,'爱莲说/周敦颐',NULL,2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'怎样选材',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@s,NULL,'孝亲敬老，传承家风',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=5 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=5 AND section_title='写作');
SET @b=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=5 AND section_title='整本书阅读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'井冈翠竹/袁鹰','18',1),(@r,NULL,'紫藤萝瀑布/宗璞','19',2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'外国诗二首','20*',3);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'假如生活欺骗了你/普希金',NULL,1),(@r,@par,'未选择的路/弗罗斯特',NULL,2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'古代诗歌五首','21',4);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'登幽州台歌/陈子昂',NULL,1),(@r,@par,'望岳/杜甫',NULL,2),(@r,@par,'登飞来峰/王安石',NULL,3),(@r,@par,'游山西村/陆游',NULL,4),(@r,@par,'己亥杂诗（其五）/龚自珍',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'语言要简明',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@b,NULL,'《钢铁是怎样炼成的》',NULL,1);

SET @t1=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=6 AND section_title='任务一 阅读与探讨');
SET @p=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='七年级下' AND chapter_num=6 AND section_title='课外古诗词诵读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@t1,NULL,'太空一日/杨利伟','22',1),(@t1,NULL,'"蛟龙"探海/许晨','23',2),(@t1,NULL,'带上她的眼睛/刘慈欣','24',3),(@t1,NULL,'活板/沈括','25',4);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@p,NULL,'泊秦淮/杜牧',NULL,1),(@p,NULL,'贾生/李商隐',NULL,2),(@p,NULL,'过松源晨炊漆公店（其五）/杨万里',NULL,3),(@p,NULL,'约客/赵师秀',NULL,4);

-- ============================================================
-- textbook_subsections  八年级上
-- ============================================================
SET @t1=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=1 AND section_title='任务一 新闻阅读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@t1,NULL,'消息二则/毛泽东','1',1);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@t1,@par,'我三十万大军胜利南渡长江',NULL,1),(@t1,@par,'人民解放军百万大军横渡长江',NULL,2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@t1,NULL,'中国人首次进入自己的空间站/余建斌 吴月辉 刘诗瑶','2',2),(@t1,NULL,'首届诺贝尔奖颁发','3',3),(@t1,NULL,'"飞天"凌空——跳水姑娘吕伟夺魁记/夏浩然 樊云芳','4',4),(@t1,NULL,'一着惊海天——目击我国航母舰载战斗机首架次成功着舰/蔡年迟 蒲海洋','5',5),(@t1,NULL,'国行公祭，为佑世界和平/钟声','6',6);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=2 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=2 AND section_title='写作');
SET @b=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=2 AND section_title='整本书阅读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'藤野先生/鲁迅','7',1),(@r,NULL,'回忆鲁迅先生（节选）/萧红','8',2),(@r,NULL,'天上有颗"南仁东星"/王宏甲','9*',3),(@r,NULL,'美丽的颜色/艾芙·居里','10*',4),(@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'学写传记',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@b,NULL,'《红星照耀中国》怎样读红色经典作品',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=3 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=3 AND section_title='写作');
SET @s=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=3 AND section_title='专题学习活动');
SET @p=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=3 AND section_title='课外古诗词诵读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'三峡/郦道元','11',1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'短文二篇','12',2);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'答谢中书书/陶弘景',NULL,1),(@r,@par,'记承天寺夜游/苏轼',NULL,2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'与朱元思书/吴均','13*',3);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'唐诗五首','14',4);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'野望/王绩',NULL,1),(@r,@par,'黄鹤楼/崔颢',NULL,2),(@r,@par,'使至塞上/王维',NULL,3),(@r,@par,'渡荆门送别/李白',NULL,4),(@r,@par,'钱塘湖春行/白居易',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'学习描写景物',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@s,NULL,'人无信不立',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@p,NULL,'庭中有奇树/《古诗十九首》',NULL,1),(@p,NULL,'龟虽寿/曹操',NULL,2),(@p,NULL,'赠从弟（其二）/刘桢',NULL,3),(@p,NULL,'梁甫行/曹植',NULL,4);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=4 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=4 AND section_title='写作');
SET @b=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=4 AND section_title='整本书阅读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'背影/朱自清','15',1),(@r,NULL,'白杨礼赞/茅盾','16',2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'散文二篇','17*',3);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'永久的生命/严文井',NULL,1),(@r,@par,'我为什么而活着/罗素',NULL,2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'昆明的雨/汪曾祺','18*',4),(@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'语言要连贯',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@b,NULL,'《红岩》',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=5 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=5 AND section_title='写作');
SET @s=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=5 AND section_title='专题学习活动');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'中国石拱桥/茅以昇','19',1),(@r,NULL,'苏州园林/叶圣陶','20',2),(@r,NULL,'人民英雄永垂不朽——瞻仰首都人民英雄纪念碑/周定舫','21*',3),(@r,NULL,'梦回繁华/毛宁','22*',4),(@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'说明事物要抓住特征',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@s,NULL,'身边的文化遗产',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=6 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=6 AND section_title='写作');
SET @p=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级上' AND chapter_num=6 AND section_title='课外古诗词诵读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'《孟子》三章','23',1);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'得道多助，失道寡助',NULL,1),(@r,@par,'富贵不能淫',NULL,2),(@r,@par,'生于忧患，死于安乐',NULL,3);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'愚公移山/《列子》','24',2),(@r,NULL,'周亚夫军细柳/司马迁','25*',3);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'诗词五首','26',4);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'饮酒（其五）/陶渊明',NULL,1),(@r,@par,'春望/杜甫',NULL,2),(@r,@par,'雁门太守行/李贺',NULL,3),(@r,@par,'赤壁/杜牧',NULL,4),(@r,@par,'渔家傲（天接云涛连晓雾）/李清照',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'表达要得体',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@p,NULL,'浣溪沙（一曲新词酒一杯）/晏殊',NULL,1),(@p,NULL,'采桑子（轻舟短棹西湖好）/欧阳修',NULL,2),(@p,NULL,'相见欢（金陵城上西楼）/朱敦儒',NULL,3),(@p,NULL,'如梦令（常记溪亭日暮）/李清照',NULL,4);

-- ============================================================
-- textbook_subsections  八年级下
-- ============================================================
SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=1 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=1 AND section_title='写作');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'社戏/鲁迅','1',1),(@r,NULL,'回延安/贺敬之','2',2),(@r,NULL,'安塞腰鼓/刘成章','3*',3),(@r,NULL,'灯笼/吴伯箫','4*',4),(@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'考虑目的和对象',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=2 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=2 AND section_title='写作');
SET @s=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=2 AND section_title='专题学习活动');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'大自然的语言/竺可桢 宛敏渭','5',1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'阿西莫夫短文两篇','6',2);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'恐龙无处不有',NULL,1),(@r,@par,'被压扁的沙子',NULL,2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'月亮是从哪里来的/卞毓麟','7*',3),(@r,NULL,'时间的脚印/陶世龙','8*',4),(@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'说明的顺序',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@s,NULL,'绿水青山，低碳生活',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=3 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=3 AND section_title='写作');
SET @b=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=3 AND section_title='整本书阅读');
SET @p=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=3 AND section_title='课外古诗词诵读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'桃花源记/陶渊明','9',1),(@r,NULL,'小石潭记/柳宗元','10',2),(@r,NULL,'核舟记/魏学洢','11*',3);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'《诗经》二首','12',4);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'关雎',NULL,1),(@r,@par,'蒹葭',NULL,2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'学写读后感',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@b,NULL,'《经典常谈》 怎样读知识性作品',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@p,NULL,'式微/《诗经·邶风》',NULL,1),(@p,NULL,'子衿/《诗经·郑风》',NULL,2),(@p,NULL,'送杜少府之任蜀州/王勃',NULL,3),(@p,NULL,'望洞庭湖上张丞相/孟浩然',NULL,4);

SET @t1=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=4 AND section_title='任务一 学习演讲词');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@t1,NULL,'最后一次讲演/闻一多','13',1),(@t1,NULL,'敬业与乐业/梁启超','14',2),(@t1,NULL,'应有格物致知精神/丁肇中','15',3),(@t1,NULL,'我一生中的重要抉择/王选','16',4);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=5 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=5 AND section_title='写作');
SET @b=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=5 AND section_title='整本书阅读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'壶口瀑布/梁衡','17',1),(@r,NULL,'在长江源头各拉丹冬/马丽华','18',2),(@r,NULL,'登勃朗峰/马克·吐温','19*',3),(@r,NULL,'一滴水经过丽江/阿来','20*',4),(@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'学写游记',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@b,NULL,'《昆虫记》',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=6 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=6 AND section_title='写作');
SET @s=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=6 AND section_title='专题学习活动');
SET @p=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='八年级下' AND chapter_num=6 AND section_title='课外古诗词诵读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'《庄子》二则','21',1);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'北冥有鱼',NULL,1),(@r,@par,'庄子与惠子游于濠梁之上',NULL,2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'《礼记》二则','22',2);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'虽有嘉肴',NULL,1),(@r,@par,'大道之行也',NULL,2);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'马说/韩愈','23*',3);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'唐诗三首','24',4);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'石壕吏/杜甫',NULL,1),(@r,@par,'茅屋为秋风所破歌/杜甫',NULL,2),(@r,@par,'卖炭翁/白居易',NULL,3);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'负责任地表达',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@s,NULL,'以和为贵',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@p,NULL,'题破山寺后禅院/常建',NULL,1),(@p,NULL,'送友人/李白',NULL,2),(@p,NULL,'卜算子·黄州定慧院寓居作/苏轼',NULL,3),(@p,NULL,'卜算子·咏梅/陆游',NULL,4);

-- ============================================================
-- textbook_subsections  九年级上
-- ============================================================
SET @t1=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=1 AND section_title='任务一 学习鉴赏');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@t1,NULL,'沁园春·雪/毛泽东','1',1),(@t1,NULL,'周总理，你在哪里/柯岩','2',2),(@t1,NULL,'我爱这土地/艾青','3',3),(@t1,NULL,'乡愁/余光中','4',4),(@t1,NULL,'你是人间的四月天——一句爱的赞颂/林徽因','5',5),(@t1,NULL,'我看/穆旦','6',6);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=2 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=2 AND section_title='写作');
SET @s=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=2 AND section_title='专题学习活动');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'培养德智体美劳全面发展的社会主义建设者和接班人/习近平','7',1),(@r,NULL,'中国人失掉自信力了吗/鲁迅','8',2),(@r,NULL,'谈骨气/吴晗','9*',3),(@r,NULL,'创造宣言/陶行知','10*',4),(@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'观点要明确',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@s,NULL,'君子自强不息',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=3 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=3 AND section_title='写作');
SET @p=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=3 AND section_title='课外古诗词诵读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'岳阳楼记/范仲淹','11',1),(@r,NULL,'醉翁亭记/欧阳修','12',2),(@r,NULL,'湖心亭看雪/张岱','13*',3);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'诗词三首','14',4);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'行路难（其一）/李白',NULL,1),(@r,@par,'酬乐天扬州初逢席上见赠/刘禹锡',NULL,2),(@r,@par,'水调歌头（明月几时有）/苏轼',NULL,3);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'议论要言之有据',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@p,NULL,'月夜忆舍弟/杜甫',NULL,1),(@p,NULL,'长沙过贾谊宅/刘长卿',NULL,2),(@p,NULL,'左迁至蓝关示侄孙湘/韩愈',NULL,3),(@p,NULL,'商山早行/温庭筠',NULL,4);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=4 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=4 AND section_title='写作');
SET @b=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=4 AND section_title='整本书阅读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'故乡/鲁迅','15',1),(@r,NULL,'我的叔叔于勒/莫泊桑','16',2),(@r,NULL,'孤独之旅/曹文轩','17*',3),(@r,NULL,'蒲柳人家（节选）/刘绍棠','18*',4),(@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'学写小小说',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@b,NULL,'《简·爱》怎样读外国小说',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=5 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=5 AND section_title='写作');
SET @s=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=5 AND section_title='专题学习活动');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'想和做/胡绳','19',1),(@r,NULL,'怀疑与学问/顾颉刚','20',2),(@r,NULL,'就英法联军远征中国致巴特勒上尉的信/雨果','21*',3),(@r,NULL,'精神的三间小屋/毕淑敏','22*',4),(@r,NULL,'阅读综合实践',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'论证要合理',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@s,NULL,'我们的数字时代',NULL,1);

SET @r=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=6 AND section_title='阅读');
SET @w=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=6 AND section_title='写作');
SET @b=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=6 AND section_title='整本书阅读');
SET @p=(SELECT id FROM textbook_chapters WHERE subject='语文' AND semester='九年级上' AND chapter_num=6 AND section_title='课外古诗词诵读');
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'曹刿论战/《左传》','23',1),(@r,NULL,'邹忌讽齐王纳谏/《战国策》','24*',2),(@r,NULL,'陈涉世家/司马迁','25*',3),(@r,NULL,'出师表/诸葛亮','26',4);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'诗词曲五首','27',5);
SET @par=LAST_INSERT_ID();
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,@par,'十五从军征',NULL,1),(@r,@par,'白雪歌送武判官归京/岑参',NULL,2),(@r,@par,'南乡子·登京口北固亭有怀/辛弃疾',NULL,3),(@r,@par,'过零丁洋/文天祥',NULL,4),(@r,@par,'山坡羊·潼关怀古/张养浩',NULL,5);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@r,NULL,'阅读综合实践',NULL,6);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@w,NULL,'学会深入思考',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@b,NULL,'《唐诗三百首》',NULL,1);
INSERT INTO textbook_subsections (chapter_id,parent_id,title,code,sort_order) VALUES (@p,NULL,'咸阳城东楼/许浑',NULL,1),(@p,NULL,'无题/李商隐',NULL,2),(@p,NULL,'浣溪沙（漠漠轻寒上小楼）/秦观',NULL,3),(@p,NULL,'丑奴儿·书博山道中壁/辛弃疾',NULL,4);

COMMIT;
