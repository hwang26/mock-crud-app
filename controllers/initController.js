
// Destructuring assignment
const { body,validationResult } = require('express-validator');

// User Model
const User = require('../models/user')

/* 
    Render the initView
*/
exports.getInitPage = function(req,res){
    res.render('init');
};

exports.postWriteUser = [


    /*
        Validate & Sanitize fields

        - First and Last names must not be empty
        - Net Biweekly Takehome must be numeric and non-negative
        - Financial goal must not be empty
    */

    body('firstName', 'First Name must not be empty').trim().not().isEmpty().escape(),
    body('lastName', 'Last Name must not be empty').trim().not().isEmpty().escape(),
    body('takeHome').isCurrency({allow_negatives: false}).withMessage('Takehome must be a valid currency amount'),
    body('financialGoal', 'Financial Goal must not be empty').trim().not().isEmpty().escape(),

    /*
        1. Create User object with req data

        2. If there are no errors, save the user and render the Dashboard page

        3. If there are errors, re-render the form with the field data and error messages
    */

    (req,res,next) => {

        const errs = validationResult(req);

        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            takeHome: req.body.takeHome,
            financialGoal: req.body.financialGoal
        });

        if(errs.isEmpty()){
            // Save user to MongoDB
            user.save((err)=>{
                if(err){
                    return next(err);
                }
            });

            // Redirect to Dashboard
            res.redirect(
                '/dashboard'
            );
        }
        else{
            res.render(
                'init', 
                {
                    errors: errs.array(), 
                    firstName: req.body.firstName, 
                    lastName: req.body.lastName, 
                    takeHome: req.body.takeHome, 
                    financialGoal: req.body.financialGoal
                }
            );
        }
    }


];