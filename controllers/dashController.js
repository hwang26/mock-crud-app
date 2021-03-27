const { body,validationResult } = require('express-validator');

let User = require('../models/user');
let Budget = require('../models/budget');

exports.getDashPage = async (req,res,next) => {

    let userData;
    let userFullName;
    let userMonthlyWage;
    let userGoal;

    let budgets;

    try{
        userData = await User.find({});
    }
    catch(error){
        next(error);
    }

    userData = userData[0];
    
    userFullName = userData.firstName + " " + userData.lastName;
    userMonthlyWage = "$" + (userData.takeHome*2).toString() + "/month";
    userGoal = userData.financialGoal;

    // Need to get budget information now

    try{
        // Grab all budgets
        budgets = await Budget.find({});
    }
    catch(error){
        next(error);
    }

    // If no budgets are retrieved, set the parameter as 0
    if(budgets.length == 0){
        budgets = 0;
    }

    res.render('dashboard', {includeNavbar: 1, active: "Home", userFullName: userFullName, userFirstName: userData.firstName, userLastName: userData.lastName, userMonthlyWage: userMonthlyWage, userGoal: userGoal, budgets: budgets});

};

exports.postSaveButton = [

    body('firstName', 'First Name must not be empty').trim().not().isEmpty().escape(),
    body('lastName', 'Last Name must not be empty').trim().not().isEmpty().escape(),
    body('takeHome').isCurrency({allow_negatives: false}).withMessage('Take home must be a valid currency amount'),
    body('financialGoal', 'Financial Goal must not be empty').trim().not().isEmpty().escape(),

    async function validateSaveButton(req,res,next){
        const errs = validationResult(req);

        // If `errs` is empty, we build the User data, overwrite the user information in the DB, and return a success message

        if(errs.isEmpty()){

            // Retrieve the id of the original entry

            let originalUser;

            try{
                // Update the original user document
                originalUser = await User.find({});
                originalUser = originalUser[0];
                await User.findByIdAndUpdate(
                    originalUser._id,
                    {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        takeHome: req.body.takeHome,
                        financialGoal: req.body.financialGoal
                    }
                ).exec();
            }
            catch(e){
                next(e);
            }

            res.json("Its all good!");
        }
        else{
            res.json(errs["errors"]);
        }
    }

];
