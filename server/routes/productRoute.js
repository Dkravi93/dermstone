const router = require('express').Router(); 
const {postProducts, getProducts, updateProducts, deleteProducts} = require('./../controllers/productsController');
const { isAuthenticate } = require('./../controllers/authControllers');

router.get('/',getProducts );
router.post('/', isAuthenticate, postProducts);
router.patch('/:id', isAuthenticate, updateProducts);
router.delete('/:id', isAuthenticate, deleteProducts);

module.exports = router;