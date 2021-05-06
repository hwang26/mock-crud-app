const { body,validationResult } = require('express-validator');

let User = require('../models/user');
let Budget = require('../models/budget');
let Transaction = require('../models/transaction');

exports.getDashPage = async (req,res,next) => {

    // Query results
    let userData;
    let budgets;
    let uninspectedTransactions;

    // User parameters
    let userFullName;
    let userMonthlyWage;
    let userGoal;

    try{
        // Get user information
        userData = await User.find({});
        // Get budget information
        budgets = await Budget.find({});
        // Get transaction information where inspected == false
        uninspectedTransactions = await Transaction.find({inspected: false}).exec();
    }
    catch(error){
        next(error);
    }

    // Prepare user data parameters
    userData = userData[0];
    userFullName = userData.firstName + " " + userData.lastName;
    userMonthlyWage = "$" + (userData.takeHome*2).toString() + "/month";
    userGoal = userData.financialGoal;

    // If no budgets, set parameter to 0
    if(budgets.length == 0){
        budgets = 0;
    }

    res.render('dashboard', 
    {
        includeNavbar: 1, 
        active: "Home", 
        userFullName: userFullName, 
        userFirstName: userData.firstName, 
        userLastName: userData.lastName, 
        userMonthlyWage: userMonthlyWage, 
        userGoal: userGoal, 
        budgets: budgets,
        uninspectedTransactions: uninspectedTransactions
    });

};
