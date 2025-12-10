const Basket = require("../models/Basket");
const Item = require("../models/Item");

const addItem = async (req, res) => {

  const userId = req.user._id
  // console.log(req.body);
  const { productId, quantity } = req.body

  const basket = await Basket.findOne({ userId })
  //  console.log(basket);
  if (basket) {
    const item = basket.items.filter((i) => { return i.productId == productId })
    if (item.length != 0) {
      console.log(item);
      let i = 0;
      for (i = 0; i < basket.items.length; i++) {
        if (basket.items[i].productId == productId) {
          break;
        }
      }
      // console.log(basket.items[i-1]);
      basket.items[i].quantity += quantity
      basket.save()
      // if(basket.items[i].quantity == 0)
      // return await deleteProduct(req,res)
      // item.quantity+=quantity
      // basket.save()
    }
    else {
      basket.items.push({ productId, quantity })
      basket.save()
    }
  }
  else { const newBasket = await Basket.create({ userId, items: { productId, quantity } }) }
  // console.log(newBasket);
  res.json(basket)
};

const getAllItems = async (req, res) => {
  const userId = req.user._id
  try {
    const items = await Basket.findOne({ userId }).lean();
    if (!items) {
      return res.status(404).json({ message: 'No items found' });
    }
    console.log(items.items);
    let arr = []
    for (let index = 0; index < items.items.length; index++) {
      let element = items.items[index];
      let p = await Item.findById(element.productId)

      p = { ...p, quantity: element.quantity }
      console.log(p);
      arr.push(p)
    }
    // console.log(arr);
    res.json(arr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const updateBasketItemQuantity = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  if (!productId || quantity == null) {
    return res.status(400).json({ message: 'productId and quantity are required' });
  }

  const basket = await Basket.findOne({ userId });
  if (!basket) {
    return res.status(404).json({ message: 'Basket not found' });
  }

  const itemIndex = basket.items.findIndex(item => item.productId.toString() === productId);
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found in basket' });
  }

  basket.items[itemIndex].quantity = quantity;

  await basket.save();
  res.status(200).json({ message: 'Quantity updated', basket });
};


const deleteItem = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id
  if (!productId) {
    return res.status(400).json({ message: 'basketId and productId are required' });
  }

  // const basket = await Basket.findById(userId);
  const basket = await Basket.findOne({ userId });
  if (!basket) {
    return res.status(404).json({ message: 'Basket not found' });
  }

  const itemIndex = basket.items.findIndex(item => item.productId.toString() === productId);
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found in basket' });
  }

  basket.items.splice(itemIndex, 1);


  await basket.save();
  return res.status(200).json({ message: 'Item updated successfully', basket });
};

module.exports = {
  addItem,
  getAllItems,
  updateBasketItemQuantity,
  deleteItem
}