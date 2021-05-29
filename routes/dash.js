let express = require('express');
let router = express.Router();

let dashController = require('../controllers/dashController')

router.get('/', dashController.getDashPage);

router.post('/saveCategory', dashController.postSaveCategory);

module.exports = router;