const { pool } = require('../connection/connection');


// Check if user table exists
pool.query(`SHOW TABLES LIKE 'user'`, (err, results) => {
  if (err) {
    console.error('Error checking if user table exists: ', err);
    
    return;
  }
  
  // If user table exists, do nothing
  if (results.length > 0) {
    console.log('user table already exists');
    
    return;
  }
  
  // Otherwise, create user table
  pool.query(`CREATE TABLE user (
    userid INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {

    if (err) {

      console.error('Error creating user table: ', err);
      return;

    }
    
    console.log('user table created successfully');
    
  });
});