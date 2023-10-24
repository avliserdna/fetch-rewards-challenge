const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const itemSchema = new Schema(
  {
    receipt: {type: Schema.Types.ObjectId, ref: 'Receipt'},
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
