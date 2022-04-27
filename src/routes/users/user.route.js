const express = require('express');
const multer = require('multer');
const router = express.Router();
const userController = require('../../controllers/users/user.controller');
const auth = require('../../middlewares/auth');
const storage = require('../../middlewares/upload');
const upload = multer({ storage: storage });

router.post('/signup', upload.single('image'), userController.SignUp);
router.post('/login', userController.Login);
router.get('/', auth, userController.GetUserDetails);

module.exports = router;