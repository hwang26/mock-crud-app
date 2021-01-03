const { body,validationResult } = require('express-validator');

exports.getDashPage = (req,res) => {
    res.render('dashboard');
};