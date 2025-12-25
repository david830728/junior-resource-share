const mysql = require('mysql2/promise');

// 创建数据库连接
async function checkResourceExistence() {
  try {
    // 创建数据库连接池
    const pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'junior_resource_share',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log('Connected to database');

    // 查询ID为2的资源
    const [rows] = await pool.query('SELECT * FROM resources WHERE id = ?', [2]);
    console.log('Query result:', rows);

    if (rows.length > 0) {
      console.log('Resource with ID 2 exists:', rows[0]);
    } else {
      console.log('Resource with ID 2 does not exist');
    }

    // 查询所有资源ID
    const [allRows] = await pool.query('SELECT id, title FROM resources');
    console.log('All resources:', allRows.map(r => ({ id: r.id, title: r.title })));

    // 关闭连接池
    await pool.end();
    console.log('Database connection closed');

  } catch (error) {
    console.error('Error checking resource:', error);
  }
}

// 执行函数
checkResourceExistence();
