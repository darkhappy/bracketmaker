let express = require('express');
let userController = require('./controllers/UserController');

let router = express.Router();
router.route('/user/create').get(userController.createUser)
module.exports = router;