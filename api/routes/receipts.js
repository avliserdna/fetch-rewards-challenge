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
      purchaseTime: req.body.purchaseTime,
      total: req.body.total
    })
// Receipt Blob here.
   await receipt.validate() // Validate if receipt is valid, or send a 400.
    if (localStorage("receipts") === null || JSON.parse(localStorage("receipts")).length === 0) {
      localStorage("receipts", "[]")
    }
      receiptArray = JSON.parse(localStorage("receipts"))
      receiptArray.push(receipt)
      localStorage("receipts", JSON.stringify(receiptArray))
// Checks if the receipts key in the localStorage is null. If it's null, we create an empty array
// The data is then parsed from a string.
    items = req.body.items
// Get the items from the request's body.
    if (localStorage("items") === null || JSON.parse(localStorage("receipts")).length === 0) {
      localStorage("items", "[]")
    }
    // Same process as above.
    itemArray = JSON.parse(localStorage("items"))
    for (item of items) {
      const newItem = new Item({
        _id: new mongoose.Types.ObjectId(),
        receiptId: receipt._id,
        shortDescription: item.shortDescription,
        price: item.price
      })
      await newItem.validate()
      itemArray.push(newItem)
      // Because it's an array of items, we check if they all are valid, and attach the receiptId to simulate a join
    }
    localStorage("items", JSON.stringify(itemArray))
    res.status(200).json({id: receipt._id})
    // Send back the receiptId
  }
  catch (err) {
    res.status(400).json({description: `The receipt is invalid.`})
  }
})

module.exports = router
