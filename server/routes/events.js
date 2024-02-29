const express = require('express')

const router = express.Router()

const {
    createEvent,
    getEvents,
    getEventById,
    deleteEvent,
    updateEvent
} = require('../controllers/eventController.js')



//GET all events
router.get('/', getEvents)

//GET a single event
router.get('/:id', getEventById)

//POST a new event
router.post('/',createEvent)

//Delete an event
router.delete('/:id', deleteEvent)

//Update an event
router.patch('/:id', updateEvent)


module.exports = router