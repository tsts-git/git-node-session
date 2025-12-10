const express = require("express")
const router = express.Router()

const ItemControler = require("../controllers/ItemControler")

router.get("/",ItemControler.getAllItems)
router.post("/", ItemControler.createNewItem)
router.delete("/:id",ItemControler.deleteItem)
router.put("/:id",ItemControler.updateItem)
// router.put("/complete/:id",taskController.updateTaskComplete)

module.exports = router