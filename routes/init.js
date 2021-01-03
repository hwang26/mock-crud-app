let express = require('express');
let router = express.Router();

let initController = require('../controllers/initController');

// There's a little quirk. If we submit the form, it performs the POST request, but it continually runs the POST req even if you refresh the page.
router.get('/',initController.getInitPage);
router.post('/', initController.postWriteUser);

module.exports = router;