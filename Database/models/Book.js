const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const BookSchema = new Schema({
    title: String,
    category: String,
    author: String,
    description: String,
    imageUrl: String,
    price: Number,
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop'}
})

BookSchema.plugin(mongoosePaginate);

// create a model
const Book = mongoose.model('Book', BookSchema);

Book.paginate().then({});

module.exports = Book;