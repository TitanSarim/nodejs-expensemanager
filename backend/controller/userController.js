const pool = require('../connection/connection');
const bcrypt = require('bcryptjs');
const catchAsyncError = require('../middleware/catchAsyncError')
const errorHandler = require('../utils/errorHandler');
const {generatedToken} = require('../utils/jwtToken')
const {setTokenCookie} = require('../utils/sendToken');



const register = catchAsyncError(async (req, res, next) => {

    const {username, email, password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);
    
    try {

        const connection = await pool.getConnection();


        const [usernameResult] = await connection.execute(
          `SELECT * FROM user WHERE username = ?`,
          [username]
        );

        const [emailResult] = await connection.execute(
            `SELECT * FROM user WHERE email = ?`,
            [email]
        );

        if (usernameResult.length > 0) {
            return next(new errorHandler('Username already in use', 400));
        }
        if (emailResult.length > 0) {
            return next(new ErrorHandler('Email already in use', 400));
        }

        const [result] = await connection.execute(
            `INSERT INTO user (username, email, password) 
            VALUES (?, ?, ?)`,
            [username, email, hashedPassword]
        );

        connection.release();

        console.log(`User with username ${username} created successfully`);

        const userid = result.insertId;
        const userEmail = email
        const token = generatedToken(userid, username, userEmail)
        // set cookie
        setTokenCookie(res, token);


        res.status(201).json({
            success: true,
            message: "User with username ${username} created successfully",
            token: token,
          });

    } catch (error) {
        console.error('Error registering User: ', err);
        return next(new errorHandler('Internal Server Error', 500));
    }

});




const login = catchAsyncError(async (req, res, next) => {

    const {email, password} = req.body;

    
    try {

        const connection = await pool.getConnection();


        const [rows, fields] = await connection.execute(
            `SELECT * FROM user WHERE email = ?`,
            [email]
        );

        if (rows.length === 0) {
            return next(new errorHandler('Invalid email', 400));
        }

        const storedPasswordHash = rows[0].password;
        const passwordMatches = await bcrypt.compare(password, storedPasswordHash);

        if (!passwordMatches) {
            return next(new errorHandler('Invalid Password', 401));
        }

        console.log(`User loggedin successfully`);


        const  userid = rows[0].userid;
        const username = rows[0].username;
        const userEmail = rows[0].email;
    
        const token = generatedToken(userid, username, userEmail);
        setTokenCookie(res, token);


        res.status(201).json({
            success: true,
            message: "User with username ${username} created successfully",
            token,
          });

    } catch (error) {
        console.error('Error logging User: ', err);
        return next(new errorHandler('Internal Server Error', 500));
    }

});




const logOut = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });


    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
    

});



module.exports = {register, login, logOut}