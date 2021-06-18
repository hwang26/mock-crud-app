const { body,validationResult } = require('express-validator');

let Budget = require('../models/budget');
let Transaction = require('../models/transaction');
let Category = require('../models/category');

exports.getDashPage = async (req,res,next) => {

    // Query results
    let budgets;
    let budgetData = [];
    let uninspectedTransactions;
    let categories;

    // For the given budget, return the transactions that share the same category
    // Transactions can be associated with more than 1 budget
    async function getTransactionsForBudget(budget){

        let budgetCategoryObjectId = budget.category;

        let associatedTransactions = await Transaction.find({
            category: budgetCategoryObjectId
        });

        return associatedTransactions;
    };

    try{
        // Get budget information
        budgets = await Budget.find({}).populate("category").exec();
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
        budgetData = 0;
    }
    else{
        try{

            // For each budget, get the associated transactions (array) and append to the budgetData
            for(let i=0; i<budgets.length; i++){
                let currentBudget = budgets[i];
                let transactions = await getTransactionsForBudget(currentBudget);

                let transactionsSum = 0;

                for(let i=0; i<transactions.length; i++){
                    transactionsSum = transactions[i].amount + transactionsSum;
                }

                // set the category name

                currentBudget.categoryName = currentBudget.category.name;

                budgetData.push([currentBudget,transactionsSum]);
            }
        }
        catch(e){
            console.log(e);
            next(e);
        }
    }

    res.render('dashboard', 
    {
        includeNavbar: 1, 
        active: "Home", 
        budgets: budgetData,
        uninspectedTransactions: uninspectedTransactions,
        categories: categories
    });

};

exports.postSaveCategory = 
[

    body('saveCategory', 'Category Name must not be empty').trim().not().isEmpty().escape(),

    async(req,res,next) => {

        const errs = validationResult(req);

        if(errs.isEmpty()){

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
        }
        else{
            res.json(errs.array());
        }



    }

];


exports.postNewBudget = [
    body('name', 'Budget Name must not be empty').trim().not().isEmpty().escape(),
    body('amount').isCurrency({allow_negatives: false}).withMessage('Amount must be a valid currency amount'),
    body('category', 'Category must not be empty').trim().not().isEmpty().escape(),
    async (req,res,next) => {

        const errs = validationResult(req);

        console.log(errs);

        if(errs.isEmpty()){

            // if id is null, then its a new budget, otherwise we should overwrite an old budget

            // Save new budget
            try{

                let categoryId = await Category.find({name:req.body.category}).exec();

                categoryId = categoryId[0]._id;

                if(req.body.id == ""){
                    let newBudget = new Budget({
                        name: req.body.name,
                        amount: req.body.amount,
                        category: categoryId,
                        dateCreated: Date.now()
                    });
    
                    let budgetSaveResult = await newBudget.save();
    
                    if(budgetSaveResult == newBudget){
                        res.json(1);
                    }
                    else{
                        res.json(0);
                    } 
                }
                else{
                    
                    let updateRes = await Budget.updateOne(
                        {_id: req.body.id},
                        {
                            name: req.body.name,
                            amount: req.body.amount,
                            category: categoryId
                        }
                    );
    
                    // If we found a document to update, then it was a success
                    if(updateRes.n == 1){
                        res.json(1);
                    }
                    else{
                        res.json(0);
                    }
                }
            }
            catch(e){
                console.log(e);
                next(e);
            }
            
        }
        else{
            res.json(errs.array());
        }
        
    }
];

exports.deleteBudget = async(req,res,next) => {
    let bId = req.body.id;

    try{
        let deletionResult = await Budget.deleteOne({_id: bId});

        if(deletionResult.deletedCount == 1){
            
            // Success
            
            res.json(1);
        }
        else{
            res.json(0);
        }

        
    }
    catch(e){
        next(e);
    }
};

