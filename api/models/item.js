const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const itemSchema = new Schema(
  {
    receiptId: {type: Schema.Types.ObjectId, ref: 'Receipt'},
    // Just like I mentioned on recepts.js, this would be what I would use for a database approach.
    // I simply left it here for the sake of clarity.
    shortDescription: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  }, {
    collection: 'items'
  }
);

const Item = model('Item', itemSchema)
module.exports = Item;
