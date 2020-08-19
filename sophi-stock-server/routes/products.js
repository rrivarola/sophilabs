const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');


const Products = require('../models/products');
const productRouter = express.Router();


// productRouter.route('/')
// .get((req, res, next) => {
//     Products.find({})
//         .then((product) => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(product);
//         }, (err) => next(err))
//         .catch((err) => next(err));
// })


productRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Products.find({ user: req.user._id })
            .populate('user')
            .then((products) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(products);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

productRouter.route('/')
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Products.create({"name": req.body.name, "image":"" ,"category": req.body.category, "quantity": req.body.quantity, "price":req.body.price, "user": req.user._id})
        .then((product) => {
            console.log('Product Created ', product);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(product);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Products.findByIdAndUpdate(req.params.Id, {
        $set: req.body
    }, { new: true })
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
})

// productRouter.route('/:productId')
// .get((req,res,next) => {
//     Products.findById(req.params.productId)
//     .then((product) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(product);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })

module.exports = productRouter;