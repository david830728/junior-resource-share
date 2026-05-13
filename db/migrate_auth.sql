-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL COMMENT '登录账号',
  password_hash VARCHAR(255) NOT NULL COMMENT '密码哈希',
  display_name VARCHAR(100) NOT NULL COMMENT '显示名称',
  role ENUM('admin', 'teacher', 'pending') NOT NULL DEFAULT 'pending' COMMENT '角色：admin管理员/teacher教师/pending待审核',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间'
);

-- resources 表新增 user_id 字段（关联用户）
ALTER TABLE resources ADD COLUMN IF NOT EXISTS user_id INT NULL COMMENT '上传者用户ID' AFTER uploader;
ALTER TABLE resources ADD CONSTRAINT IF NOT EXISTS fk_resources_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;

-- 初始管理员账号（用户名: admin，密码: Admin@123456）
-- 密码哈希由 bcrypt 生成，请通过 /api/admin/setup 接口初始化，或手动替换下方哈希值
-- 如需手动插入，先运行程序后访问 http://localhost:3000/api/admin/setup
