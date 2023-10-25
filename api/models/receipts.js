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
          !isNaN(new Date(value))
        },
        // Checks if its in YYYY/MM/DD format, denies post if it's not.,
        message: props => `${props.value} is not in proper format.`
    }},
    purchaseTime: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value)
        },
        message: props => `${props.value} is not in proper format.`
    }
    },
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
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
