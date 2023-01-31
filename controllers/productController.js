const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');

const createProduct = (req, res)=>{
    res.send('create product');
}

const getAllProducts = (req, res)=>{
    res.send('get all products');
}

module.exports = {
    createProduct,
    getAllProducts
}