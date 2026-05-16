-- ================================================================
-- 新功能迁移脚本 (需要 MySQL 8.0.3+)
-- 执行顺序：先运行本文件，再运行 seed_chapters.sql
-- 全部使用 IF NOT EXISTS / ADD COLUMN IF NOT EXISTS，可安全重复执行
-- ================================================================

-- ----------------------------------------------------------------
-- 1. comments 表：新增 user_id（关联用户）和 parent_id（嵌套回复）
-- ----------------------------------------------------------------
ALTER TABLE comments
  ADD COLUMN IF NOT EXISTS user_id BIGINT UNSIGNED NULL COMMENT '评论用户ID' AFTER author,
  ADD COLUMN IF NOT EXISTS parent_id BIGINT UNSIGNED NULL COMMENT '父评论ID，NULL表示顶级评论' AFTER user_id;

-- ----------------------------------------------------------------
-- 2. resources 表：新增 user_id、chapter_id、difficulty、pdf_path
-- ----------------------------------------------------------------
ALTER TABLE resources
  ADD COLUMN IF NOT EXISTS user_id BIGINT UNSIGNED NULL COMMENT '上传者用户ID' AFTER uploader,
  ADD COLUMN IF NOT EXISTS chapter_id INT UNSIGNED NULL COMMENT '关联章节ID' AFTER uploaded_at,
  ADD COLUMN IF NOT EXISTS difficulty VARCHAR(10) NULL COMMENT '难度：基础/提高/拓展' AFTER chapter_id,
  ADD COLUMN IF NOT EXISTS pdf_path VARCHAR(255) NULL COMMENT 'Word转换后的PDF文件名' AFTER difficulty;

-- ----------------------------------------------------------------
-- 3. 新建 textbook_chapters 表（科学教材章节树）
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS textbook_chapters (
  id        INT UNSIGNED NOT NULL AUTO_INCREMENT,
  subject   VARCHAR(20)  NOT NULL COMMENT '学科',
  semester  VARCHAR(20)  NOT NULL COMMENT '学期，如 七年级上',
  chapter_num   TINYINT UNSIGNED NULL COMMENT '章序号，NULL表示特殊条目',
  chapter_title VARCHAR(100) NULL COMMENT '章标题',
  section_num   TINYINT UNSIGNED NULL COMMENT '节序号',
  section_title VARCHAR(100) NOT NULL COMMENT '节标题或特殊条目名称',
  code      VARCHAR(20) NULL COMMENT '编码，如 1.2',
  sort_order SMALLINT NOT NULL DEFAULT 0 COMMENT '排序',
  is_special TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1=特殊条目(期中/期末等)',
  PRIMARY KEY (id),
  KEY idx_subject_semester (subject, semester)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------
-- 4. 新建 user_collections 表（教师收藏/校本作业）
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_collections (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id     BIGINT UNSIGNED NOT NULL COMMENT '收藏用户ID',
  resource_id BIGINT UNSIGNED NOT NULL COMMENT '资源ID',
  custom_name VARCHAR(255) NULL COMMENT '自定义显示名称',
  sort_order  INT NOT NULL DEFAULT 0 COMMENT '排序值',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_user_resource (user_id, resource_id),
  KEY idx_user_sort (user_id, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
