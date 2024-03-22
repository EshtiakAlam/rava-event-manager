const Event = require('../models/eventModel')
const mongoose = require('mongoose')


//GET all events
const getEvents = async (req, res) => {
    try {
        const  events = await Event.find({}).sort({Date: 1})
        res.status(200).json(events)
    } catch(error){
        console.error('Error getting events:', error);
        res.status(500).json({ error: 'Could not get events.'})
    }
}

//GET a single event
const getEventById = async (req, res) => {
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such event'})
        }
        const event = await Event.findById(id)

        if(!event) {
            return res.status(404).json({error: 'No such event'})
        }

        res.status(201).json(event)
    } catch (error){
        console.error('Error getting event:', error);
        res.status(500).json({ error: 'Could not get event.'})
    }
}

//POST a new event
const createEvent = async(req, res) => {
    const {title, organizer, date, location, time, description} = req.body

    //add document to db
    try{
        const event = await Event.create({title, organizer, date, location, time, description})
        res.status(200).json(event)

    } catch(error){
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Could not create event.'})
    }
}
//DELETE an event
const deleteEvent = async (req, res) => {
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such event'})
        }
        const event = await Event.findOneAndDelete({_id: id})

        if(!event) {
            return res.status(404).json({error: 'No such event'})
        }

        res.status(201).json(event)
    } catch (error){
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Could not delete event.'})
    }
}

// PATCH an event
const updateEvent = async (req, res) => {
    try{
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such event'})
        }

        const event = await Event.findOneAndUpdate({_id: id},{
            ...req.body
        })
        if(!event) {
            return res.status(404).json({error: 'No such event'})
        }

        res.status(201).json(event)

    } catch (error){
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Could not update event.'})
    }

}

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    deleteEvent,
    updateEvent

}