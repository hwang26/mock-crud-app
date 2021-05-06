let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let TransactionSchema = new Schema({
    // Foreign key for user collection
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    inspected: {
        type: Boolean,
        required: true
    },
    recurring: {
        type: Boolean,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    // Optional
    note: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: true
    },
    postDate: {
        type: Date,
        required: true
    },
    categories: {
        type: [Schema.Types.ObjectId],
        ref: 'Category',
        required: false
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);