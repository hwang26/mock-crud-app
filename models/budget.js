let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let BudgetSchema = new Schema({
    dateCreated: {
        type: Date,
        required: true
    },
    dateEnds:{
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Budget', BudgetSchema);