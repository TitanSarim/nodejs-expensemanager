const pool = require('../connection/connection');
const bcrypt = require('bcryptjs');
const catchAsyncError = require('../middleware/catchAsyncError')
const errorHandler = require('../utils/errorHandler');




const createCategory = catchAsyncError(async (req, res, next) => {

    const {category} = req.body
    
    const userid = req.user.userid;

    try {

        const connection = await pool.getConnection();

        const [result] = await connection.execute('INSERT INTO category (userid, category) VALUES(?, ?)', [userid, category]);

        res.status(200).json({
            success: true,
            message: 'Category is Created',
        })

        connection.release();


    } catch (error) {
        console.error('Error creating category: ', err);
        return next(new errorHandler('Internal Server Error', 500));
    }

});




const getCategories = catchAsyncError(async (req, res, next) => {
    
    const userid = req.user.userid;

    try {

        const connection = await pool.getConnection();

        const [result] = await connection.execute('SELECT * FROM category WHERE userid = ? ', [userid]);

        res.status(200).json({
            success: true,
            message: 'Categories are retrived',
            data : result,
        })


    } catch (error) {
        console.error('Error gettting category: ', err);
        return next(new errorHandler('Internal Server Error', 500));
    }

});



const updateCategory = catchAsyncError(async(req, res, next) => {

    try {

        const {category} = req.body
        const categoryid = req.params.id
        
        const connection = await pool.getConnection();

        const [result] = await connection.execute('UPDATE category SET category = ? WHERE categoryid = ? ', [category, categoryid]);

        // update category present in expense table too.


        connection.release()

        res.status(200).json({
            success: true,
            message: 'Category is updated',
            data : result,
        })


    } catch (error) {
        console.error('Error updating category: ', err);
        return next(new errorHandler('Internal Server Error', 500));
    }

})




const deleteCategory = catchAsyncError(async(req, res, next) => {

    try {

        const categoryid = req.params.id
        
        const connection = await pool.getConnection();

        const [result] = await connection.execute('DELETE FROM category WHERE categoryid = ? ', [categoryid]);

        connection.release()

        res.status(200).json({
            success: true,
            message: 'Category is deleted',
            data : result,
        })


    } catch (error) {
        console.error('Error deleted category: ', err);
        return next(new errorHandler('Internal Server Error', 500));
    }

})

module.exports = {createCategory, getCategories, updateCategory, deleteCategory}