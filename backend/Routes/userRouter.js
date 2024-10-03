const express =require ('express');
const { signIn, signUp, logOut, getMe } = require('../Controller/userController');
const userAuthorizationMiddleware =require('../Middleware/userAuthorizationMiddleware');
const userAuthenticationMiddleware = require('../Middleware/userAuthenticationMiddleware')
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/logout', logOut);
router.get('/me', getMe)



module.exports = router;