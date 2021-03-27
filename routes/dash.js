let express = require('express');
let router = express.Router();

let dashController = require('../controllers/dashController')

router.get('/', dashController.getDashPage);

// Add post request

router.post('/saveButton', dashController.postSaveButton);

module.exports = router;