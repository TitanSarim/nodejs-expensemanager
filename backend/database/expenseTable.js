const { pool } = require('../connection/connection');


// Check if expense table exists
pool.query(`SHOW TABLES LIKE 'expense'`, (err, results) => {
  if (err) {
    console.error('Error checking if expense table exists: ', err);
    
    return;
  }
  
  // If expense table exists, do nothing
  if (results.length > 0) {
    console.log('expense table already exists');
    
    return;
  }
  
  // Otherwise, create expense table
  pool.query(`CREATE TABLE expense (
    expenseid INT PRIMARY KEY AUTO_INCREMENT,
    userid INT NOT NULL,
    expenseCategory VARCHAR(255) NOT NULL, 
    expensename VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    totalAmount VARCHAR(255) NOT NULL,
    paidAmount VARCHAR(255) NOT NULL,
    remainingAmount VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`, (err) => {

    if (err) {

      console.error('Error creating expense table: ', err);
      return;

    }
    
    console.log('expense table created successfully');
    
  });
});