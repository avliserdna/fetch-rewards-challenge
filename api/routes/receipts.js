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


// Get Rewards

router.get('/:id/points', async (req, res) => {
  // Following the parameters of the test, we need to calc points

  try {
  const id = req.params.id
  let points = 0;
    // Rule #1: 1 Point for every AlphaNumeric character in a retailer name.
    // Ex: Target = 6
  let receiptArray = JSON.parse(localStorage("receipts"));

  let targetReceipt = receiptArray.find((receipt) => receipt._id === id)

  points += alphaNumericRetailerTotal(targetReceipt.retailer)

  console.log(points, "rule 1")

// Rule #2: 50 Points, if the ReceiptTotal is a whole number

if (Number(targetReceipt.total) % 1 === 0) points += 50

console.log(points, "rule 2")
// Rule #3: 25 Points, if the total is a multiple of .25

if (Number(targetReceipt.total) % 0.25 === 0) points += 25
console.log(points, "rule 3")
// Rule #4: 5 Points for every pair in the items.
  let itemArray = JSON.parse(localStorage("items"))
  points +=  (Math.floor(itemArray.length/2) * 5)
console.log(points, "rule 4")
// Rule #5: Check if the item.shortDescription is a multiple of 3, if it is multiple the price by 0.2 then round up.
  for (item of itemArray) {
    if (item.shortDescription.length % 3 === 0) {
      points =  Math.ceil(Number(item.price) * 0.2) + points

    }
  }
  console.log(points, "rule 5")
// Rule #6: 6 Points, if the Day is odd.
let dateArray = targetReceipt.purchaseDate.split("-")
let targetDay = parseInt(dateArray[2], 10)
if (targetDay % 2) points += 6
console.log(points, "rule 6")
// Rule #7: 10 Points, if the time of purchase is after 2:00 but before 4:00 (So in between 2:00 and 4:00)
let splitTime = targetReceipt.purchaseTime.split(":")
let targetHour = Number(splitTime[0])
let targetMinute = Number(splitTime[1])

if ((targetHour > 14 && targetHour < 16) || (targetHour === 14 && targetMinute > 0)) {
  points += 10
}
console.log(points, "rule 7")
res.status(200).json({points: points})
  }

  catch (err) {
    res.status(400).json({description: `No receipt of ${req.params.id} found. ${err}`})
  }
})

function alphaNumericRetailerTotal(str) {
  let total = 0;
  for (let i = 0; i < str.length; i++) {
    let char = str[i]
    if (char.match(/^[a-zA-Z0-9]+$/) !== null) total +=1
  }
  return total
}

module.exports = router
