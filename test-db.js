require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'junior_resource_share',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log('测试数据库连接...');
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('数据库连接成功! 测试查询结果:', rows);

    // 测试查询 resources 表
    console.log('\n测试查询 resources 表...');
    const [resources] = await pool.query('SELECT * FROM resources LIMIT 5');
    console.log('Resources 表数据:', resources);

    // 测试查询 comments 表
    console.log('\n测试查询 comments 表...');
    const [comments] = await pool.query('SELECT * FROM comments LIMIT 5');
    console.log('Comments 表数据:', comments);

    await pool.end();
    console.log('\n所有测试完成!');
  } catch (error) {
    console.error('数据库连接错误:', error);
    process.exit(1);
  }
}

testConnection();