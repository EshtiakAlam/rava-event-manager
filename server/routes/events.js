const express = require('express')

const router = express.Router()

const {
    createEvent,
    getEvents,
    getEventById,
    deleteEvent,
    updateEvent,
    findRecentUpcomingEvents,
    findApprovedEvents
} = require('../controllers/eventController.js')

const requireAuth =require("../middleware/requireAuth.js")
router.use(requireAuth)
//GET all events
router.get('/', getEvents)

// GET approved events
router.get('/approved', findApprovedEvents);

// GET recent upcoming events
router.get('/upcoming', findRecentUpcomingEvents);

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