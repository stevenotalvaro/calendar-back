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

const router = Router()

router.get('/', validationJWT, getEvents)
router.post('/', validationJWT, createEvent)
router.put('/:id', validationJWT, updateEvent)
router.delete('/', validationJWT, deleteEvent)

module.exports = router
