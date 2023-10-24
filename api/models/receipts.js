// Receipt Schema
const mongoose = require('mongoose')
const {Schema, model} = mongoose;

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
        validate: v =>!isNaN(new Date(v)),
        // Checks if its in YYYY/MM/DD format, denies post if it's not.,
        message: props => `${props.value} is not in proper format.`
    }},
    purchaseTime: {
      type: String,
      required: true,
      validate: {
        validate: v => {
          let isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(v)
          return isValid
          // uses Regex to check if time is in proper time format. Chec56ks for Military Time.
        },
        message: props => `${props.value} is not in proper format.`
    }
    },
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
    total: String,
  },{
    collection: 'receipts' // Points to the Receipt Collection on Database
  }
);

const Receipt = model('Receipt', receiptSchema)
module.exports = Receipt;
