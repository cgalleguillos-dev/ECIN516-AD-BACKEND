const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = mongoose.Schema({
    name: { type: String, required: true},
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default:0 },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true},
    }, 
    {
        timestamps: true,
    }
);

ProductSchema.index({sku: 1});
ProductSchema.plugin(mongoosePaginate);
module.exports.Product = mongoose.model('Product', ProductSchema);