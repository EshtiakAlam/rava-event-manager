const Event = require('../models/eventModel');
const mongoose = require('mongoose');

//GET all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({}).sort({ date: 1 });
        res.status(200).json(events);
    } catch (error) {
        console.error('Error getting events:', error);
        res.status(500).json({ error: 'Could not get events.' });
    }
};

//GET a single event
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such event' });
        }

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ error: 'No such event' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error getting event:', error);
        res.status(500).json({ error: 'Could not get event.' });
    }
};

//POST a new event
const createEvent = async (req, res) => {
    const { title, tagline, organizer, date, location, time, description, highlights, faq, like, approval, link } = req.body;

    try {
        const event = await Event.create({ title, tagline, organizer, date, location, time, description, highlights, faq, like: 0, approval: false, link: 'None' });
        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Could not create event.' });
    }
};

//DELETE an event
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such event' });
        }

        const event = await Event.findOneAndDelete({ _id: id });

        if (!event) {
            return res.status(404).json({ error: 'No such event' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Could not delete event.' });
    }
};

// PATCH an event
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such event' });
        }

        const event = await Event.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (!event) {
            return res.status(404).json({ error: 'No such event' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Could not update event.' });
    }
};

// Find recent upcoming events (Current Date - next two weeks)
const findRecentUpcomingEvents = async (req, res) => {
    try {
        const currentDate = new Date();
        console.log(currentDate)
        const twoWeeksLater = new Date(currentDate.getTime() + (14 * 24 * 60 * 60 * 1000)); // Adding two weeks in milliseconds
        console.log(twoWeeksLater)
        const upcomingEvents = await Event.find({
            date: {
                $gte: currentDate,
                $lte: twoWeeksLater
            }, approved: true
        }).sort({ date: 1 });

        res.status(200).json(upcomingEvents);
    } catch (error) {
        console.error('Error finding recent upcoming events:', error);
        res.status(500).json({ error: 'Could not find recent upcoming events.' });
    }
}

// Find approved events
const findApprovedEvents = async (req, res) => {
    try {
        console.log("Finding approved events..."); // Debugging statement
        const approvedEvents = await Event.find({ approval: true }).sort({ date: 1 });
        console.log("Approved events found:", approvedEvents); // Debugging statement

        if (approvedEvents.length === 0) {
            return res.status(404).json({ error: 'No approved events found.' });
        }

        res.status(200).json(approvedEvents);
    } catch (error) {
        console.error('Error finding approved events:', error);
        res.status(500).json({ error: 'Could not find approved events.' });
    }
}
module.exports = {
    getEvents,
    getEventById,
    createEvent,
    deleteEvent,
    updateEvent,
    findRecentUpcomingEvents,
    findApprovedEvents
};
