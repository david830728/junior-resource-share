-- ============================================================
-- 英语教材目录树 Seed Script
-- 学科: 英语  学期: 七年级上/下、八年级上/下
-- 结构: 章(Unit) → 节(Section) → 细目(Subsection)
-- 执行方式: mysql -u root -p your_db < seed_english.sql
-- ============================================================

START TRANSACTION;

-- 清理旧数据（幂等）
DELETE ts FROM textbook_subsections ts JOIN textbook_chapters tc ON ts.chapter_id=tc.id WHERE tc.subject='英语' AND tc.semester IN ('七年级上','七年级下','八年级上','八年级下');
DELETE FROM textbook_chapters WHERE subject='英语' AND semester IN ('七年级上','七年级下','八年级上','八年级下');

-- ============================================================
-- 七年级上
-- ============================================================
INSERT INTO textbook_chapters
  (subject, semester, chapter_num, chapter_title, section_num, section_title, sort_order, is_special)
VALUES
-- Starter
('英语','七年级上',0,'Welcome to junior high!',NULL,'Get ready',1,0),
('英语','七年级上',0,'Welcome to junior high!',NULL,'Know your school',2,0),
('英语','七年级上',0,'Welcome to junior high!',NULL,'Get to know each other',3,0),
('英语','七年级上',0,'Welcome to junior high!',NULL,'Make a wishing tree',4,0),
-- Unit 1
('英语','七年级上',1,'A new start',NULL,'Starting out',5,0),
('英语','七年级上',1,'A new start',NULL,'Understanding ideas',6,0),
('英语','七年级上',1,'A new start',NULL,'Developing ideas',7,0),
('英语','七年级上',1,'A new start',NULL,'Presenting ideas',8,0),
('英语','七年级上',1,'A new start',NULL,'Reflection',9,0),
-- Unit 2
('英语','七年级上',2,'More than fun',NULL,'Starting out',10,0),
('英语','七年级上',2,'More than fun',NULL,'Understanding ideas',11,0),
('英语','七年级上',2,'More than fun',NULL,'Developing ideas',12,0),
('英语','七年级上',2,'More than fun',NULL,'Presenting ideas',13,0),
('英语','七年级上',2,'More than fun',NULL,'Reflection',14,0),
-- Unit 3
('英语','七年级上',3,'Family ties',NULL,'Starting out',15,0),
('英语','七年级上',3,'Family ties',NULL,'Understanding ideas',16,0),
('英语','七年级上',3,'Family ties',NULL,'Developing ideas',17,0),
('英语','七年级上',3,'Family ties',NULL,'Presenting ideas',18,0),
('英语','七年级上',3,'Family ties',NULL,'Reflection',19,0),
-- Unit 4
('英语','七年级上',4,'Time to celebrate',NULL,'Starting out',20,0),
('英语','七年级上',4,'Time to celebrate',NULL,'Understanding ideas',21,0),
('英语','七年级上',4,'Time to celebrate',NULL,'Developing ideas',22,0),
('英语','七年级上',4,'Time to celebrate',NULL,'Presenting ideas',23,0),
('英语','七年级上',4,'Time to celebrate',NULL,'Reflection',24,0),
-- Unit 5
('英语','七年级上',5,'The power of plants',NULL,'Starting out',25,0),
('英语','七年级上',5,'The power of plants',NULL,'Understanding ideas',26,0),
('英语','七年级上',5,'The power of plants',NULL,'Developing ideas',27,0),
('英语','七年级上',5,'The power of plants',NULL,'Presenting ideas',28,0),
('英语','七年级上',5,'The power of plants',NULL,'Reflection',29,0),
-- Unit 6
('英语','七年级上',6,'Fantastic friends',NULL,'Starting out',30,0),
('英语','七年级上',6,'Fantastic friends',NULL,'Understanding ideas',31,0),
('英语','七年级上',6,'Fantastic friends',NULL,'Developing ideas',32,0),
('英语','七年级上',6,'Fantastic friends',NULL,'Presenting ideas',33,0),
('英语','七年级上',6,'Fantastic friends',NULL,'Reflection',34,0),
-- 特殊条目
('英语','七年级上',NULL,NULL,NULL,'小初衔接',35,1),
('英语','七年级上',NULL,NULL,NULL,'开学',36,1),
('英语','七年级上',NULL,NULL,NULL,'周测',37,1),
('英语','七年级上',NULL,NULL,NULL,'阶段检测',38,1),
('英语','七年级上',NULL,NULL,NULL,'期中',39,1),
('英语','七年级上',NULL,NULL,NULL,'期末',40,1),
('英语','七年级上',NULL,NULL,NULL,'寒暑假',41,1),
('英语','七年级上',NULL,NULL,NULL,'竞赛',42,1);

-- ============================================================
-- 七年级下
-- ============================================================
INSERT INTO textbook_chapters
  (subject, semester, chapter_num, chapter_title, section_num, section_title, sort_order, is_special)
VALUES
('英语','七年级下',1,'The secrets of happiness',NULL,'Starting out',1,0),
('英语','七年级下',1,'The secrets of happiness',NULL,'Understanding ideas',2,0),
('英语','七年级下',1,'The secrets of happiness',NULL,'Developing ideas',3,0),
('英语','七年级下',1,'The secrets of happiness',NULL,'Presenting ideas',4,0),
('英语','七年级下',1,'The secrets of happiness',NULL,'Reflection',5,0),
('英语','七年级下',2,'Go for it!',NULL,'Starting out',6,0),
('英语','七年级下',2,'Go for it!',NULL,'Understanding ideas',7,0),
('英语','七年级下',2,'Go for it!',NULL,'Developing ideas',8,0),
('英语','七年级下',2,'Go for it!',NULL,'Presenting ideas',9,0),
('英语','七年级下',2,'Go for it!',NULL,'Reflection',10,0),
('英语','七年级下',3,'Food matters',NULL,'Starting out',11,0),
('英语','七年级下',3,'Food matters',NULL,'Understanding ideas',12,0),
('英语','七年级下',3,'Food matters',NULL,'Developing ideas',13,0),
('英语','七年级下',3,'Food matters',NULL,'Presenting ideas',14,0),
('英语','七年级下',3,'Food matters',NULL,'Reflection',15,0),
('英语','七年级下',4,'The art of having fun',NULL,'Starting out',16,0),
('英语','七年级下',4,'The art of having fun',NULL,'Understanding ideas',17,0),
('英语','七年级下',4,'The art of having fun',NULL,'Developing ideas',18,0),
('英语','七年级下',4,'The art of having fun',NULL,'Presenting ideas',19,0),
('英语','七年级下',4,'The art of having fun',NULL,'Reflection',20,0),
('英语','七年级下',5,'Amazing nature',NULL,'Starting out',21,0),
('英语','七年级下',5,'Amazing nature',NULL,'Understanding ideas',22,0),
('英语','七年级下',5,'Amazing nature',NULL,'Developing ideas',23,0),
('英语','七年级下',5,'Amazing nature',NULL,'Presenting ideas',24,0),
('英语','七年级下',5,'Amazing nature',NULL,'Reflection',25,0),
('英语','七年级下',6,'Hitting the road',NULL,'Starting out',26,0),
('英语','七年级下',6,'Hitting the road',NULL,'Understanding ideas',27,0),
('英语','七年级下',6,'Hitting the road',NULL,'Developing ideas',28,0),
('英语','七年级下',6,'Hitting the road',NULL,'Presenting ideas',29,0),
('英语','七年级下',6,'Hitting the road',NULL,'Reflection',30,0),
('英语','七年级下',NULL,NULL,NULL,'开学',31,1),
('英语','七年级下',NULL,NULL,NULL,'周测',32,1),
('英语','七年级下',NULL,NULL,NULL,'阶段检测',33,1),
('英语','七年级下',NULL,NULL,NULL,'期中',34,1),
('英语','七年级下',NULL,NULL,NULL,'期末',35,1),
('英语','七年级下',NULL,NULL,NULL,'寒暑假',36,1),
('英语','七年级下',NULL,NULL,NULL,'竞赛',37,1);

-- ============================================================
-- 八年级上
-- ============================================================
INSERT INTO textbook_chapters
  (subject, semester, chapter_num, chapter_title, section_num, section_title, sort_order, is_special)
VALUES
('英语','八年级上',1,'This is me',NULL,'Starting out',1,0),
('英语','八年级上',1,'This is me',NULL,'Understanding ideas',2,0),
('英语','八年级上',1,'This is me',NULL,'Developing ideas',3,0),
('英语','八年级上',1,'This is me',NULL,'Presenting ideas',4,0),
('英语','八年级上',1,'This is me',NULL,'Reflection',5,0),
('英语','八年级上',2,'Getting along',NULL,'Starting out',6,0),
('英语','八年级上',2,'Getting along',NULL,'Understanding ideas',7,0),
('英语','八年级上',2,'Getting along',NULL,'Developing ideas',8,0),
('英语','八年级上',2,'Getting along',NULL,'Presenting ideas',9,0),
('英语','八年级上',2,'Getting along',NULL,'Reflection',10,0),
('英语','八年级上',3,'Make it happen!',NULL,'Starting out',11,0),
('英语','八年级上',3,'Make it happen!',NULL,'Understanding ideas',12,0),
('英语','八年级上',3,'Make it happen!',NULL,'Developing ideas',13,0),
('英语','八年级上',3,'Make it happen!',NULL,'Presenting ideas',14,0),
('英语','八年级上',3,'Make it happen!',NULL,'Reflection',15,0),
('英语','八年级上',4,'Digital life',NULL,'Starting out',16,0),
('英语','八年级上',4,'Digital life',NULL,'Understanding ideas',17,0),
('英语','八年级上',4,'Digital life',NULL,'Developing ideas',18,0),
('英语','八年级上',4,'Digital life',NULL,'Presenting ideas',19,0),
('英语','八年级上',4,'Digital life',NULL,'Reflection',20,0),
('英语','八年级上',5,'Play by the rules?',NULL,'Starting out',21,0),
('英语','八年级上',5,'Play by the rules?',NULL,'Understanding ideas',22,0),
('英语','八年级上',5,'Play by the rules?',NULL,'Developing ideas',23,0),
('英语','八年级上',5,'Play by the rules?',NULL,'Presenting ideas',24,0),
('英语','八年级上',5,'Play by the rules?',NULL,'Reflection',25,0),
('英语','八年级上',6,'When disaster strikes',NULL,'Starting out',26,0),
('英语','八年级上',6,'When disaster strikes',NULL,'Understanding ideas',27,0),
('英语','八年级上',6,'When disaster strikes',NULL,'Developing ideas',28,0),
('英语','八年级上',6,'When disaster strikes',NULL,'Presenting ideas',29,0),
('英语','八年级上',6,'When disaster strikes',NULL,'Reflection',30,0),
('英语','八年级上',NULL,NULL,NULL,'开学',31,1),
('英语','八年级上',NULL,NULL,NULL,'周测',32,1),
('英语','八年级上',NULL,NULL,NULL,'阶段检测',33,1),
('英语','八年级上',NULL,NULL,NULL,'期中',34,1),
('英语','八年级上',NULL,NULL,NULL,'期末',35,1),
('英语','八年级上',NULL,NULL,NULL,'寒暑假',36,1),
('英语','八年级上',NULL,NULL,NULL,'竞赛',37,1);

-- ============================================================
-- 八年级下
-- ============================================================
INSERT INTO textbook_chapters
  (subject, semester, chapter_num, chapter_title, section_num, section_title, sort_order, is_special)
VALUES
('英语','八年级下',1,'Career talks',NULL,'Starting out',1,0),
('英语','八年级下',1,'Career talks',NULL,'Understanding ideas',2,0),
('英语','八年级下',1,'Career talks',NULL,'Developing ideas',3,0),
('英语','八年级下',1,'Career talks',NULL,'Presenting ideas',4,0),
('英语','八年级下',1,'Career talks',NULL,'Reflection',5,0),
('英语','八年级下',2,'Growing pains and gains',NULL,'Starting out',6,0),
('英语','八年级下',2,'Growing pains and gains',NULL,'Understanding ideas',7,0),
('英语','八年级下',2,'Growing pains and gains',NULL,'Developing ideas',8,0),
('英语','八年级下',2,'Growing pains and gains',NULL,'Presenting ideas',9,0),
('英语','八年级下',2,'Growing pains and gains',NULL,'Reflection',10,0),
('英语','八年级下',3,'What makes a great team?',NULL,'Starting out',11,0),
('英语','八年级下',3,'What makes a great team?',NULL,'Understanding ideas',12,0),
('英语','八年级下',3,'What makes a great team?',NULL,'Developing ideas',13,0),
('英语','八年级下',3,'What makes a great team?',NULL,'Presenting ideas',14,0),
('英语','八年级下',3,'What makes a great team?',NULL,'Reflection',15,0),
('英语','八年级下',4,'Helping out',NULL,'Starting out',16,0),
('英语','八年级下',4,'Helping out',NULL,'Understanding ideas',17,0),
('英语','八年级下',4,'Helping out',NULL,'Developing ideas',18,0),
('英语','八年级下',4,'Helping out',NULL,'Presenting ideas',19,0),
('英语','八年级下',4,'Helping out',NULL,'Reflection',20,0),
('英语','八年级下',5,'Looking into nature',NULL,'Starting out',21,0),
('英语','八年级下',5,'Looking into nature',NULL,'Understanding ideas',22,0),
('英语','八年级下',5,'Looking into nature',NULL,'Developing ideas',23,0),
('英语','八年级下',5,'Looking into nature',NULL,'Presenting ideas',24,0),
('英语','八年级下',5,'Looking into nature',NULL,'Reflection',25,0),
('英语','八年级下',6,'Living with nature',NULL,'Starting out',26,0),
('英语','八年级下',6,'Living with nature',NULL,'Understanding ideas',27,0),
('英语','八年级下',6,'Living with nature',NULL,'Developing ideas',28,0),
('英语','八年级下',6,'Living with nature',NULL,'Presenting ideas',29,0),
('英语','八年级下',6,'Living with nature',NULL,'Reflection',30,0),
('英语','八年级下',NULL,NULL,NULL,'开学',31,1),
('英语','八年级下',NULL,NULL,NULL,'周测',32,1),
('英语','八年级下',NULL,NULL,NULL,'阶段检测',33,1),
('英语','八年级下',NULL,NULL,NULL,'期中',34,1),
('英语','八年级下',NULL,NULL,NULL,'期末',35,1),
('英语','八年级下',NULL,NULL,NULL,'寒暑假',36,1),
('英语','八年级下',NULL,NULL,NULL,'竞赛',37,1);

-- ============================================================
-- 细目 (Subsections)
-- Understanding ideas → Reading(1), Grammar(2)
-- Developing ideas    → Listening and speaking(1), Reading for writing(2)
-- 适用: 所有学期 Unit 1-6（Starter无细目）
-- ============================================================

-- ── 七年级上 ──
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=1 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=1 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=1 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=1 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=2 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=2 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=2 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=2 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=3 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=3 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=3 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=3 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=4 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=4 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=4 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=4 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=5 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=5 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=5 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=5 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=6 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=6 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=6 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级上' AND chapter_num=6 AND section_title='Developing ideas';

-- ── 七年级下 ──
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=1 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=1 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=1 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=1 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=2 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=2 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=2 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=2 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=3 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=3 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=3 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=3 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=4 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=4 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=4 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=4 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=5 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=5 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=5 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=5 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=6 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=6 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=6 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='七年级下' AND chapter_num=6 AND section_title='Developing ideas';

-- ── 八年级上 ──
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=1 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=1 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=1 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=1 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=2 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=2 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=2 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=2 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=3 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=3 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=3 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=3 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=4 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=4 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=4 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=4 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=5 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=5 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=5 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=5 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=6 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=6 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=6 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级上' AND chapter_num=6 AND section_title='Developing ideas';

-- ── 八年级下 ──
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=1 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=1 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=1 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=1 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=2 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=2 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=2 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=2 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=3 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=3 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=3 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=3 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=4 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=4 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=4 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=4 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=5 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=5 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=5 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=5 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=6 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=6 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=6 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='八年级下' AND chapter_num=6 AND section_title='Developing ideas';

COMMIT;

-- 验证行数（可选）
-- SELECT semester, COUNT(*) FROM textbook_chapters WHERE subject='英语' GROUP BY semester;
-- SELECT COUNT(*) FROM textbook_subsections WHERE chapter_id IN (SELECT id FROM textbook_chapters WHERE subject='英语');
