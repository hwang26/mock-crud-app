let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        // id will be auto generated
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        takeHome: {
            type: Number,
            required: true
        },
        financialGoal: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('User', UserSchema);