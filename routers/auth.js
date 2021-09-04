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
const {validationFields} = require('../middlewares/validation-fields')
const {validationJWT} = require('../middlewares/validation-JWT')

router.post(
    '/new',

    [
        // hear going to middlewes
        check('name', 'the name is required').not().isEmpty(),
        check('email', 'the name is required').isEmail(),
        check('password', 'the password is required').isLength({min: 6}),
        validationFields,
    ],
    createUser,
)

router.post(
    '/',
    [
        // hear going to middlewes
        check('email', 'the email is required').isEmail(),
        check('password', 'the password is required').isLength({min: 6}),
        validationFields,
    ],
    loginUser,
)

router.get('/renew', validationJWT, revalidationToken)

module.exports = router
