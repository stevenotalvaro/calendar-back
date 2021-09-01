/*
    Routs Users / Auth
*/

const {Router} = require('express')
const {
    createUser,
    loginUser,
    revalidationToken,
} = require('../controllers/auth')
const router = Router()

router.post('/new', createUser)

//authentication pasi
router.post('/', loginUser)
router.get('/renew', revalidationToken)

module.exports = router
