// Receipt Schema
const mongoose = require('mongoose')
const {Schema, model} = mongoose;
const validator = require('validator')

const receiptSchema = new Schema(
  {
    retailer: {
      type: String,
      required: true,
    },
    purchaseDate: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          console.log(value, "test")
        //  return validator.isDate(value)
        },
        // Checks if its in YYYY/MM/DD format, denies post if it's not.,
        message: props => `${props.value} is not in proper format.`,
        validator: function(value){
          let valueArr = value.split("-")
          const days31 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
          const days30 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
          const days29 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
          const calendar = {1: days31, 2:days29, 3: days31, 4: days30, 5:days31, 6:days30, 7:days31,8:days31, 9:days30, 10:days31, 11:days30, 12:days31}

          if (Number(valueArr[1]) === 2) {
            if (Number(valueArr[0]) % 4 === 0) {
              return calendar[2].includes(Number(valueArr[2]))
            }
            else {
              return  Number(valueArr[2]) < 29
            }
          }
          else {
            return calendar[Number(valueArr[1])].includes(Number(valueArr[2]))
          }
          // console.log(validator.isDate(value), "validator")

          // if (Number(valueArr[0]) % 4 === 0) {
          //   console.log(true)
          //   if (Number(valueArr[1]) === 2) {
          //     return Number(valueArr[2]) < 30
          //   }
          // }
          // else {
          //   if (Number(valueArr[1]) === 2) {
          //     return Number(valueArr[2]) < 29
          //   }
          // }
        },
        message: props => `${props.value} is an invalid date.`,
        // Check February Dates if Leap year or non leap year
    }},
    purchaseTime: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value)
        },
        // Checks if time is in XX:XX format, denies if post is not in format.
        message: props => `${props.value} is not in proper format.`
    }
    },
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
    // In a theoretic environment where we have a database
    // I would use this line of code to pull from the Database connected to the receiptId
    total: {
      type: String,
      required: true
    },
  },{
    collection: 'receipts' // Points to the Receipt Collection on Database
  }
);


const Receipt = model('Receipt', receiptSchema)
module.exports = Receipt;
