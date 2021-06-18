let express = require('express');
let router = express.Router();

let dashController = require('../controllers/dashController')

router.get('/', dashController.getDashPage);

router.post('/saveCategory', dashController.postSaveCategory);

router.post('/saveBudget', dashController.postNewBudget);

router.post('/deleteBudget', dashController.deleteBudget);

module.exports = router;