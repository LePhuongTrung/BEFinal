const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShopSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    address: String,
    imgUrl: String,
})

const Shop = mongoose.model('Shop', ShopSchema);
module.exports = Shop;