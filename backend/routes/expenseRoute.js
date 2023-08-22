const express = require("express");
const {createExpense, getAllExpenses, getExpense, updateExpense, deleteExpense} = require('../controller/expenseController');
const {isAuthenticatedUser} = require('../middleware/auth')
const multer = require('multer');
const upload = require('../middleware/imageUpload')


const router = express.Router();



router.route("/newExpense").post(isAuthenticatedUser, upload.single('image'), createExpense);

router.route('/expenses').get(isAuthenticatedUser, getAllExpenses)

router.route('/expense/:id').get(isAuthenticatedUser, getExpense)

router.route('/updateExpense/:id').put(isAuthenticatedUser, upload.single('image'), updateExpense);

router.route('/deleteExpense/:id').delete(isAuthenticatedUser, deleteExpense);



module.exports = router;