-- 英语教材目录树 Seed Script —— 九年级上/下
-- 结构: 与七/八年级相同，每单元5个顶级节，Reading/Grammar 为 Understanding ideas 的细目，
--       Listening and speaking/Reading for writing 为 Developing ideas 的细目
-- 执行: mysql -u root -pAdmin@123456 junior_resource_share < seed_english_9.sql

START TRANSACTION;

-- 清理旧数据
DELETE ts FROM textbook_subsections ts JOIN textbook_chapters tc ON ts.chapter_id=tc.id WHERE tc.subject='英语' AND tc.semester IN ('九年级上','九年级下');
DELETE FROM textbook_chapters WHERE subject='英语' AND semester IN ('九年级上','九年级下');

-- ============================================================
-- 九年级上
-- ============================================================
INSERT INTO textbook_chapters (subject,semester,chapter_num,chapter_title,section_num,section_title,sort_order,is_special) VALUES
('英语','九年级上',1,'Teenagers today',NULL,'Starting out',1,0),
('英语','九年级上',1,'Teenagers today',NULL,'Understanding ideas',2,0),
('英语','九年级上',1,'Teenagers today',NULL,'Developing ideas',3,0),
('英语','九年级上',1,'Teenagers today',NULL,'Presenting ideas',4,0),
('英语','九年级上',1,'Teenagers today',NULL,'Reflection',5,0),
('英语','九年级上',2,'On the money',NULL,'Starting out',6,0),
('英语','九年级上',2,'On the money',NULL,'Understanding ideas',7,0),
('英语','九年级上',2,'On the money',NULL,'Developing ideas',8,0),
('英语','九年级上',2,'On the money',NULL,'Presenting ideas',9,0),
('英语','九年级上',2,'On the money',NULL,'Reflection',10,0),
('英语','九年级上',3,'Past passing by',NULL,'Starting out',11,0),
('英语','九年级上',3,'Past passing by',NULL,'Understanding ideas',12,0),
('英语','九年级上',3,'Past passing by',NULL,'Developing ideas',13,0),
('英语','九年级上',3,'Past passing by',NULL,'Presenting ideas',14,0),
('英语','九年级上',3,'Past passing by',NULL,'Reflection',15,0),
('英语','九年级上',4,'Heroes',NULL,'Starting out',16,0),
('英语','九年级上',4,'Heroes',NULL,'Understanding ideas',17,0),
('英语','九年级上',4,'Heroes',NULL,'Developing ideas',18,0),
('英语','九年级上',4,'Heroes',NULL,'Presenting ideas',19,0),
('英语','九年级上',4,'Heroes',NULL,'Reflection',20,0),
('英语','九年级上',5,'A fine balance',NULL,'Starting out',21,0),
('英语','九年级上',5,'A fine balance',NULL,'Understanding ideas',22,0),
('英语','九年级上',5,'A fine balance',NULL,'Developing ideas',23,0),
('英语','九年级上',5,'A fine balance',NULL,'Presenting ideas',24,0),
('英语','九年级上',5,'A fine balance',NULL,'Reflection',25,0),
('英语','九年级上',6,'Live green',NULL,'Starting out',26,0),
('英语','九年级上',6,'Live green',NULL,'Understanding ideas',27,0),
('英语','九年级上',6,'Live green',NULL,'Developing ideas',28,0),
('英语','九年级上',6,'Live green',NULL,'Presenting ideas',29,0),
('英语','九年级上',6,'Live green',NULL,'Reflection',30,0),
('英语','九年级上',NULL,NULL,NULL,'开学',31,1),
('英语','九年级上',NULL,NULL,NULL,'周测',32,1),
('英语','九年级上',NULL,NULL,NULL,'阶段检测',33,1),
('英语','九年级上',NULL,NULL,NULL,'期中',34,1),
('英语','九年级上',NULL,NULL,NULL,'期末',35,1),
('英语','九年级上',NULL,NULL,NULL,'寒暑假',36,1),
('英语','九年级上',NULL,NULL,NULL,'竞赛',37,1);

-- ============================================================
-- 九年级下
-- ============================================================
INSERT INTO textbook_chapters (subject,semester,chapter_num,chapter_title,section_num,section_title,sort_order,is_special) VALUES
('英语','九年级下',1,'Life choices',NULL,'Starting out',1,0),
('英语','九年级下',1,'Life choices',NULL,'Understanding ideas',2,0),
('英语','九年级下',1,'Life choices',NULL,'Developing ideas',3,0),
('英语','九年级下',1,'Life choices',NULL,'Presenting ideas',4,0),
('英语','九年级下',1,'Life choices',NULL,'Reflection',5,0),
('英语','九年级下',2,'The road to success',NULL,'Starting out',6,0),
('英语','九年级下',2,'The road to success',NULL,'Understanding ideas',7,0),
('英语','九年级下',2,'The road to success',NULL,'Developing ideas',8,0),
('英语','九年级下',2,'The road to success',NULL,'Presenting ideas',9,0),
('英语','九年级下',2,'The road to success',NULL,'Reflection',10,0),
('英语','九年级下',3,'Art for life',NULL,'Starting out',11,0),
('英语','九年级下',3,'Art for life',NULL,'Understanding ideas',12,0),
('英语','九年级下',3,'Art for life',NULL,'Developing ideas',13,0),
('英语','九年级下',3,'Art for life',NULL,'Presenting ideas',14,0),
('英语','九年级下',3,'Art for life',NULL,'Reflection',15,0),
('英语','九年级下',4,'More than words',NULL,'Starting out',16,0),
('英语','九年级下',4,'More than words',NULL,'Understanding ideas',17,0),
('英语','九年级下',4,'More than words',NULL,'Developing ideas',18,0),
('英语','九年级下',4,'More than words',NULL,'Presenting ideas',19,0),
('英语','九年级下',4,'More than words',NULL,'Reflection',20,0),
('英语','九年级下',5,'Under the waves',NULL,'Starting out',21,0),
('英语','九年级下',5,'Under the waves',NULL,'Understanding ideas',22,0),
('英语','九年级下',5,'Under the waves',NULL,'Developing ideas',23,0),
('英语','九年级下',5,'Under the waves',NULL,'Presenting ideas',24,0),
('英语','九年级下',5,'Under the waves',NULL,'Reflection',25,0),
('英语','九年级下',6,'Looking beyond',NULL,'Starting out',26,0),
('英语','九年级下',6,'Looking beyond',NULL,'Understanding ideas',27,0),
('英语','九年级下',6,'Looking beyond',NULL,'Developing ideas',28,0),
('英语','九年级下',6,'Looking beyond',NULL,'Presenting ideas',29,0),
('英语','九年级下',6,'Looking beyond',NULL,'Reflection',30,0),
('英语','九年级下',NULL,NULL,NULL,'开学',31,1),
('英语','九年级下',NULL,NULL,NULL,'周测',32,1),
('英语','九年级下',NULL,NULL,NULL,'阶段检测',33,1),
('英语','九年级下',NULL,NULL,NULL,'期中',34,1),
('英语','九年级下',NULL,NULL,NULL,'期末',35,1),
('英语','九年级下',NULL,NULL,NULL,'寒暑假',36,1),
('英语','九年级下',NULL,NULL,NULL,'竞赛',37,1);

-- ============================================================
-- 细目 (Subsections) —— 九年级上
-- Understanding ideas → Reading(1), Grammar(2)
-- Developing ideas    → Listening and speaking(1), Reading for writing(2)
-- ============================================================
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=1 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=1 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=1 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=1 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=2 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=2 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=2 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=2 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=3 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=3 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=3 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=3 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=4 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=4 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=4 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=4 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=5 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=5 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=5 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=5 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=6 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=6 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=6 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级上' AND chapter_num=6 AND section_title='Developing ideas';

-- ============================================================
-- 细目 (Subsections) —— 九年级下
-- ============================================================
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=1 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=1 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=1 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=1 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=2 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=2 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=2 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=2 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=3 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=3 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=3 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=3 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=4 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=4 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=4 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=4 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=5 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=5 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=5 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=5 AND section_title='Developing ideas';

INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=6 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Grammar',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=6 AND section_title='Understanding ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Listening and speaking',1 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=6 AND section_title='Developing ideas';
INSERT INTO textbook_subsections (chapter_id, title, sort_order) SELECT id,'Reading for writing',2 FROM textbook_chapters WHERE subject='英语' AND semester='九年级下' AND chapter_num=6 AND section_title='Developing ideas';

COMMIT;
