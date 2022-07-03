const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const reviewSchema = mongoose.Schema({
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true }
    },
    {
        timestaps: true
    }
);

reviewSchema.plugin(mongoosePaginate);
module.exports.Review = mongoose.model('Review', reviewSchema);