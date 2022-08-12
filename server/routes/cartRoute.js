const router = require('express').Router(); 
const { postCart, updatedCart, getCart, deleteCart} = require('./../controllers/cartController');
const { cartAuthenticate2, cartAuthenticate} = require('./../controllers/authControllers');
router.get('/',cartAuthenticate2, getCart );
router.post('/',cartAuthenticate, postCart);
router.patch('/:id', cartAuthenticate, updatedCart);
router.delete('/id',cartAuthenticate, deleteCart);

module.exports = router;