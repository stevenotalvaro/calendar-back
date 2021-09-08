const {response} = require('express')
const Event = require('../models/Event')

const getEvents = async (req, res = response) => {
    const events = await Event.find().populate('user', 'name')

    res.json({
        ok: true,
        events,
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

const updateEvent = async (req, res = response) => {
    const eventId = req.params.id
    const uid = req.uid
    try {
        const event = await Event.findById(eventId)

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'event does not with that Id',
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'don not privileges',
            })
        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

        const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {
            new: true,
        })

        res.json({
            ok: true,
            event: eventUpdate,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Talking with administration',
        })
    }
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
