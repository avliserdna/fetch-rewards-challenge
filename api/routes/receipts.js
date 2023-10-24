const express = require('express')
const router = express.Router()
const Receipt = require('../models/receipts')
const Item = require('../models/item')
const { default: mongoose } = require('mongoose')

// Submit a Receipt

router.post('/process', async (req,res) => {
  try {
    const receipt = new Receipt({
      _id : new mongoose.Types.ObjectId(),
      retailer: req.body.retailer,
      purchaseDate: req.body.purchaseDate,
      purchaseTime: req.body.purchaseTime
    })
    await receipt.save()

    items = req.body.items

    for (item of items) {
      const newItem = new Item({
        _id: new mongoose.Types.ObjectId(),
        receiptId: receipt._id,
        shortDescription: item.shortDescription,
        price: item.price
      })
      await newItem.save()
    }
    res.status(200).json({id: receipt._id})
  }
  catch (err) {
    res.status(400).json({description: "The receipt is invalid"})
  }
})
