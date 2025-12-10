const Item = require("../models/Item");

const createNewItem = async (req, res) => {
  const { name, price, avalible, free_delivery, img } = req.body;

  if (!name || price == null || avalible == null || free_delivery == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const item = await Item.create({ name, price, avalible, free_delivery, img });
    return res.status(201).json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const getAllItems = async (req, res) => {
  // console.log("aaaaaaaa");
  try {
    const items = await Item.find().lean();
    if (!items.length) {
      return res.json([]);
    }
    return res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const updateItem = async (req, res) => {
  const { name, price, avalible, free_delivery } = req.body;
  const _id = req.params._id;

  if (!_id || !name || price == null || avalible == null || free_delivery == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const item = await Item.findById(_id).exec();
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.name = name;
    item.price = price;
    item.avalible = avalible;
    item.free_delivery = free_delivery;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'ID required for deletion' });
  }

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // שמרי את המידע לפני המחיקה
    const itemName = item.name;
    const itemId = item._id;

    await item.deleteOne();

    res.json({ message: `Item '${itemName}' (ID: ${itemId}) deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  createNewItem,
  getAllItems,
  updateItem,
  deleteItem
}