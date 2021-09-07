const {response} = require('express')

const getEvents = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getEvents',
    })
}

const createEvent = (req, res = response) => {
    console.log(req.body)

    res.json({
        ok: true,
        msg: 'create events',
    })
}

const updateEvent = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'update event',
    })
}

const deleteEvent = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteEvent',
    })
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}
