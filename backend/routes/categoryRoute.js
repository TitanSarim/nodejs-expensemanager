const express = require("express");
const {createCategory, getCategories, updateCategory, deleteCategory} = require('../controller/categoryController');
const {isAuthenticatedUser} = require('../middleware/auth')


const router = express.Router();



router.route("/newCategory").post(isAuthenticatedUser, createCategory);

router.route('/categories').get(isAuthenticatedUser, getCategories)

router.route('/updateCategory/:id').put(isAuthenticatedUser, updateCategory);

router.route('/deleteCategory/:id').delete(isAuthenticatedUser, deleteCategory);



module.exports = router;