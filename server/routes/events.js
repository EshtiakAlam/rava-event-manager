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

// Like an event
/*router.post('/:id/like', likeEvent);

// Unlike an event
router.delete('/:id/like', unlikeEvent);

// Get liked events for a user
router.get('/liked', getLikedEvents);*/

module.exports = router