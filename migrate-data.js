require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function migrateData() {
  try {
    // 连接数据库
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'junior_resource_share',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log('连接数据库成功！');

    // 读取resources.json文件
    const resourcesPath = path.join(__dirname, 'data', 'resources.json');
    const resourcesData = JSON.parse(fs.readFileSync(resourcesPath, 'utf-8'));
    console.log(`读取到 ${resourcesData.length} 条资源数据`);

    // 读取comments.json文件
    const commentsPath = path.join(__dirname, 'data', 'comments.json');
    const commentsData = JSON.parse(fs.readFileSync(commentsPath, 'utf-8'));
    console.log(`读取到 ${commentsData.length} 条评论数据`);

    // 清空现有数据
    await pool.query('DELETE FROM comments');
    await pool.query('DELETE FROM resources');
    console.log('清空现有数据成功！');

    // 插入资源数据
    const resourceIdMap = new Map(); // 记录UUID到数据库ID的映射
    for (const resource of resourcesData) {
      const [result] = await pool.query(
        `INSERT INTO resources (
          title, description, subject, grade, uploader, 
          file_name, file_type, file_size, download_count, uploaded_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          resource.title,
          resource.description,
          resource.subject,
          resource.grade,
          resource.uploader,
          resource.fileName,
          resource.fileType,
          resource.fileSize,
          resource.downloadCount || 0,
          new Date(resource.uploadedAt).toISOString().slice(0, 19).replace('T', ' ')
        ]
      );
      resourceIdMap.set(resource.id, result.insertId);
      console.log(`迁移资源：${resource.title} (UUID: ${resource.id} → DB ID: ${result.insertId})`);
    }
    console.log('资源数据迁移成功！');

    // 插入评论数据
    for (const comment of commentsData) {
      const dbResourceId = resourceIdMap.get(comment.resourceId);
      if (dbResourceId) {
        await pool.query(
          `INSERT INTO comments (
            resource_id, author, content, rating, created_at
          ) VALUES (?, ?, ?, ?, ?)`,
          [
            dbResourceId,
            comment.author,
            comment.content,
            comment.rating,
            new Date(comment.createdAt).toISOString().slice(0, 19).replace('T', ' ')
          ]
        );
        console.log(`迁移评论：资源ID ${comment.resourceId} → ${dbResourceId}`);
      } else {
        console.log(`跳过评论：未找到资源 ${comment.resourceId}`);
      }
    }
    console.log('评论数据迁移成功！');

    // 验证迁移结果
    const [resourcesResult] = await pool.query('SELECT COUNT(*) as count FROM resources');
    const [commentsResult] = await pool.query('SELECT COUNT(*) as count FROM comments');
    console.log(`\n迁移完成！`);
    console.log(`资源表：${resourcesResult[0].count} 条记录`);
    console.log(`评论表：${commentsResult[0].count} 条记录`);

    await pool.end();
    console.log('数据库连接已关闭');
  } catch (error) {
    console.error('数据迁移错误：', error);
    process.exit(1);
  }
}

migrateData();