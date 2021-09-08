/**
    Event Routes
    /api/events
 */

const {Router} = require('express')
const {validationJWT} = require('../middlewares/validation-JWT')
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/event')
const {check} = require('express-validator')
const {validationFields} = require('../middlewares/validation-fields')
const {isDate} = require('../helpers/isDate')

const router = Router()

router.get('/', validationJWT, getEvents)
router.post(
    '/',
    validationJWT,
    [
        check('title', 'title is required').not().isEmpty(),
        check('start', 'date is required').custom(isDate),
        check('end', 'date is required').custom(isDate),
        validationFields,
    ],

    createEvent,
)
router.put(
    '/:id',
    [
        check('title', 'title is required').not().isEmpty(),
        check('start', 'date is required').custom(isDate),
        check('end', 'date is required').custom(isDate),
        validationFields,
    ],
    validationJWT,
    updateEvent,
)
router.delete('/', validationJWT, deleteEvent)

module.exports = router
