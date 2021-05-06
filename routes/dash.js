let express = require('express');
let router = express.Router();

let dashController = require('../controllers/dashController')

router.get('/', dashController.getDashPage);

module.exports = router;