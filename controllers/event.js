const {response} = require('express')
const Event = require('../models/Event')

const getEvents = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getEvents',
    })
}

const createEvent = async (req, res = response) => {
    const event = new Event(req.body)

    try {
        event.user = req.uid
        const eventSave = await event.save()
        res.json({
            ok: true,
            event: eventSave,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'to talk with the admin',
        })
    }
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
