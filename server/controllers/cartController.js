const Cart = require('./../models/cartModel');
const catchAsyncErrors = require("../utils/catchAsync");

const postCart = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body)
    const cart = await Cart.create({
      product : req.body.data.product,
      user : req.user.id,
      total : req.body.data.total
    });
  //  console.log(cart);
    res.status(200).json({
      success: true,
      cart,
    });
  });


  const updatedCart = catchAsyncErrors(async (req, res, next)=>{
    // console.log(req.params.id)
    const cart = await Cart.findByIdAndUpdate(req.params.id,req.body);
    res.status(201).json({
      success: true,
      cart,
    });
  })
  const deleteCart = catchAsyncErrors(async (req, res, next)=>{
    // console.log(req.params.id)
    const cart = await Cart.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      cart,
    });
  })

  const getCart = catchAsyncErrors(async (req, res, next)=> {

      const cart = await Cart.find({user : req.user.id}).populate('product');

      res.status(200).json({
        success: true,
        cart,
      });
  });

  module.exports = { postCart, updatedCart, getCart, deleteCart };