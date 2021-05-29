const { body,validationResult } = require('express-validator');

let Budget = require('../models/budget');
let Transaction = require('../models/transaction');
let Category = require('../models/category');

exports.getDashPage = async (req,res,next) => {

    // Query results
    let budgets;
    let uninspectedTransactions;
    let categories;

    try{
        // Get budget information
        budgets = await Budget.find({});
        // Get transaction information where inspected == false
        uninspectedTransactions = await Transaction.find({inspected: false}).exec();
        // Get Categories
        categories = await Category.find({});
    }
    catch(error){
        next(error);
    }

    // If no budgets, set parameter to 0
    if(budgets.length == 0){
        budgets = 0;
    }

    res.render('dashboard', 
    {
        includeNavbar: 1, 
        active: "Home", 
        budgets: budgets,
        uninspectedTransactions: uninspectedTransactions,
        categories: categories
    });

};

exports.postSaveCategory = async(req,res,next) => {
    /*
        Write the category to the DB and return a string indicating either success or failure.
    */

    try{
        let categoryToBeSaved = new Category({
            name: req.body.saveCategory
        });

        let saveResult = await categoryToBeSaved.save();

        if(saveResult == categoryToBeSaved){
            //Success
            res.json(1);
        }
        else{
            //Failure
            res.json(0);
        }
    }
    catch(error){
        next(error);
    }

    // res.json("");

}
