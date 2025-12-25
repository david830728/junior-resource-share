import { pool } from './db.ts';
import { exit } from 'process';

async function checkResource() {
  try {
    // 直接查询数据库中的资源
    const [rows] = await pool.query(
      `SELECT 
        id,
        title,
        description,
        subject,
        grade,
        uploader,
        file_name AS fileName,
        file_type AS fileType,
        file_size AS fileSize,
        download_count AS downloadCount,
        uploaded_at AS uploadedAt
      FROM resources WHERE id = ?`,
      [2]
    );

    console.log('数据库查询结果:', rows);
    
    if ((rows as any[]).length === 0) {
      console.log('ID为2的资源不存在于数据库中');
      
      // 查询所有资源，看看有哪些ID存在
      const [allRows] = await pool.query(
        `SELECT id, title FROM resources ORDER BY id ASC`
      );
      
      console.log('所有资源:', allRows);
    }
  } catch (error) {
    console.error('查询资源失败:', error);
  } finally {
    // 关闭数据库连接
    await pool.end();
  }
}

checkResource();