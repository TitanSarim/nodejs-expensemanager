const pool = require('../connection/connection');
const bcrypt = require('bcryptjs');
const catchAsyncError = require('../middleware/catchAsyncError')
const errorHandler = require('../utils/errorHandler');
const path = require('path')
const fs = require('fs')



const createExpense = catchAsyncError(async (req, res, next) => {

    const {expenseCategory, expensename, description, totalAmount, paidAmount, remainingAmount} = req.body
    const userid = req.user.userid;
    const FileName = req.file.filename;

    try {

        const connection = await pool.getConnection();

        const [result] = await connection.execute('INSERT INTO expense (userid, expenseCategory, expensename, description, totalAmount, paidAmount, remainingAmount, image) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [userid, expenseCategory, expensename, description, totalAmount, paidAmount, remainingAmount, FileName]);
        connection.release();

        res.status(200).json({
            success: true,
            message: 'Expense is Created',
        })



    } catch (error) {
        console.error('Error creating Expense: ', error);
        return next(new errorHandler('Internal Server Error', 500));
    }

});




const getAllExpenses = catchAsyncError(async (req, res, next) => {
    
    const userid = req.user.userid;

    try {

        const connection = await pool.getConnection();

        const [result] = await connection.execute('SELECT * FROM expense WHERE userid = ? ', [userid]);

        res.status(200).json({
            success: true,
            message: 'Categories are retrived',
            data : result,
        })


    } catch (error) {
        console.error('Error gettting category: ', error);
        return next(new errorHandler('Internal Server Error', 500));
    }

});



const getExpense = catchAsyncError(async (req, res, next) => {
    
    const expenseID = req.params.id;


    try {

        const connection = await pool.getConnection();

        const [result] = await connection.execute('SELECT * FROM expense WHERE expenseid = ? ', [expenseID]);

        const data = {
            id: result[0].expenseid,
            userid: result[0].userid,
            expenseCategory: result[0].expenseCategory,
            expensename: result[0].expensename,
            description: result[0].description,
            totalAmount: result[0].totalAmount,
            paidAmount: result[0].paidAmount,
            remainingAmount: result[0].remainingAmount,
            image: `/storage/${result[0].image}`
        }

        res.status(200).json({
            success: true,
            message: 'Categories are retrived',
            data,
        })


    } catch (error) {
        console.error('Error gettting category: ', error);
        return next(new errorHandler('Internal Server Error', 500));
    }

});



const updateExpense = catchAsyncError(async(req, res, next) => {

    try {

        const {expenseCategory, expensename, description, totalAmount, paidAmount, remainingAmount} = req.body
        const expenseId = req.params.id
        const FileName = req.file.filename;




        const connection = await pool.getConnection();

        const [imageResult] = await connection.execute('SELECT image FROM expense WHERE expenseid = ? ', [expenseId]);
        
        if(imageResult.length > 0){
            const oldImage = imageResult[0].image;

            if(oldImage !== FileName){
                const imagePath = path.join(__dirname, '../storage', oldImage);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting old image:', err);
                    } else {
                        console.log('Old image deleted successfully');
                    }
                });
            }
        }


        const [result] = await connection.execute('UPDATE expense SET expenseCategory = ?, expensename = ?, description = ?, totalAmount = ?, paidAmount = ?, remainingAmount = ?, image = ? WHERE expenseid = ? ', [expenseCategory, expensename, description, totalAmount, paidAmount, remainingAmount, FileName, expenseId]);

        connection.release()

        res.status(200).json({
            success: true,
            message: 'Expense is updated',
            data : result,
        })


    } catch (error) {
        console.error('Error updating Expense: ', error);
        return next(new errorHandler('Internal Server Error', 500));
    }

})




const deleteExpense = catchAsyncError(async(req, res, next) => {

    try {

        const expenseid = req.params.id
        
        const connection = await pool.getConnection();

        const [imageResult] = await connection.execute('SELECT image FROM expense WHERE expenseid = ? ', [expenseid]);
        
        if(imageResult.length > 0){
            const removeimage =  imageResult[0].image;

                const imagePath = path.join(__dirname, '../storage', removeimage);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image:', err);
                    } else {
                        console.log('Image deleted successfully');
                    }
            });
        }

        const [result] = await connection.execute('DELETE FROM expense WHERE expenseid = ? ', [expenseid]);
        

        connection.release()

        res.status(200).json({
            success: true,
            message: 'Expense is deleted',
            data : result,
        })


    } catch (error) {
        console.error('Error deleted Expense: ', error);
        return next(new errorHandler('Internal Server Error', 500));
    }

})




module.exports = {createExpense, getAllExpenses, getExpense, updateExpense, deleteExpense}