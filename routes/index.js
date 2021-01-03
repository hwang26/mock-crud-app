var express = require('express');
var router = express.Router();

let User = require("../models/user");

/* 
  Access the User table to see if there are any entries. 
  If there's already a written entry, then we can redirect to the Dashboard, 
  otherwise we'll redirect to the Init page. 
*/
router.get('/', async function(req, res, next) {

  /* 
    I think the query is async and functions as a promise. 
    Javascript is interpreted, so as the program is running, it will leave the async code for the queue at the end.
    Therefore, userExists is null until the end of the code block. 
  */
  let userExists = await User.countDocuments({});

  if(userExists>0){
    res.redirect('/dashboard');
  }
  else{
    res.redirect('/init');  
  }
});

module.exports = router;
