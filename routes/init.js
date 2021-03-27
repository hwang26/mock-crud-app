let express = require('express');
let router = express.Router();

let initController = require('../controllers/initController');

router.get('/',initController.getInitPage);
router.post('/', initController.postWriteUser);

module.exports = router;