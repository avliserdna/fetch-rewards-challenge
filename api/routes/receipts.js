const express = require('express')
const router = express.Router()
const Receipt = require('../models/receipts')
const Item = require('../models/item')
const { default: mongoose } = require('mongoose') // mongoose is used for validators and schema use.
const localStorage = require('local-storage') // due to constraints of project, we use local-storage middle ware


// Submit a Receipt
router.post('/process', async (req,res) => {
  try {
    const receipt = new Receipt({
      _id : new mongoose.Types.ObjectId(),
      retailer: req.body.retailer,
      purchaseDate: req.body.purchaseDate,
      purchaseTime: req.body.purchaseTime
    })

    receipt.validate()
    if (localStorage("receipts") === null || JSON.parse(localStorage("receipts")).length === 0) {
      localStorage("receipts", "[]")
    }
      receiptArray = JSON.parse(localStorage("receipts"))
      receiptArray.push(receipt)
      localStorage("receipts", JSON.stringify(receiptArray))

    items = req.body.items

    if (localStorage("items") === null || JSON.parse(localStorage("receipts")).length === 0) {
      localStorage("items", "[]")
    }
    itemArray = JSON.parse(localStorage("items"))
    for (item of items) {
      const newItem = new Item({
        _id: new mongoose.Types.ObjectId(),
        receiptId: receipt._id,
        shortDescription: item.shortDescription,
        price: item.price
      })
      newItem.validate()
      itemArray.push(newItem)
    }
    localStorage("items", JSON.stringify(itemArray))
    res.status(200).json({id: receipt._id})
  }
  catch (err) {
    res.status(400).json({description: `The receipt is invalid ${err}`})
  }
})

module.exports = router
