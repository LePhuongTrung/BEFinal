const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book'}, // join
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']
        },
        unitPrice: { 
            type: Number, 
            required: true,}
    }],
    subTotal: {
        default: 0,
        type: Number,
    },
});
const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;