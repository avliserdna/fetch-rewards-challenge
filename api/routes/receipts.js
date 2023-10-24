const express = require('express')
const router = express.Router()
const Receipt = require('../models/receipts')
const Item = require('../models/item')

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
  }
  catch (err) {
    res.status(400).json({description: "The receipt is invalid"})
  }
})
