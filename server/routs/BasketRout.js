const express = require('express');
const router = express.Router();
const basketController = require('../controllers/BasketControler');

const verifyJWT = require("../middelware/verifyJWT")
router.use(verifyJWT)

router.post('/add-item', basketController.addItem);

router.delete('/delete-item', basketController.deleteItem);

router.get('/', basketController.getAllItems);

router.put('/update-item-quantity', basketController.updateBasketItemQuantity);

module.exports = router;
