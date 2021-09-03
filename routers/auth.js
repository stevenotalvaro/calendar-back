/*
    Routs Users / Auth
    host + /api/auth
*/
const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()

const {
    createUser,
    loginUser,
    revalidationToken,
} = require('../controllers/auth')

router.post(
    '/new',

    [
        // hear going to middlewes
        check('name', 'the name is required').not().isEmpty(),
        check('email', 'the name is required').isEmail(),
        check('password', 'the password is required').isLength({min: 6}),
    ],
    createUser,
)

router.post(
    '/',
    [
        // hear going to middlewes
        check('email', 'the name is required').isEmail(),
        check('password', 'the password is required').isLength({min: 6}),
    ],
    loginUser,
)

router.get('/renew', revalidationToken)

module.exports = router
