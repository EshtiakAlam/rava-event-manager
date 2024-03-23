const Club = require('../models/clubModel');
const mongoose = require('mongoose');

// GET all clubs
const getClubs = async (req, res) => {
    try {
        const clubs = await Club.find({}).sort({ createdAt: 1 });
        res.status(200).json(clubs);
    } catch (error) {
        console.error('Error getting clubs:', error);
        res.status(500).json({ error: 'Could not get clubs.' });
    }
};

// GET a single club by ID
const getClubById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such club' });
        }

        const club = await Club.findById(id);

        if (!club) {
            return res.status(404).json({ error: 'No such club' });
        }

        res.status(200).json(club);
    } catch (error) {
        console.error('Error getting club:', error);
        res.status(500).json({ error: 'Could not get club.' });
    }
};

// POST a new club
const createClub = async (req, res) => {
    const { title, abbreviation, description, panel, advisor, events, contactInformation, members } = req.body;

    try {
        const club = await Club.create({ title, abbreviation, description, panel, advisor, events, contactInformation, members });
        res.status(201).json(club);
    } catch (error) {
        console.error('Error creating club:', error);
        res.status(500).json({ error: 'Could not create club.' });
    }
};

// DELETE a club by ID
const deleteClub = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such club' });
        }

        const club = await Club.findOneAndDelete({ _id: id });

        if (!club) {
            return res.status(404).json({ error: 'No such club' });
        }

        res.status(200).json(club);
    } catch (error) {
        console.error('Error deleting club:', error);
        res.status(500).json({ error: 'Could not delete club.' });
    }
};

// PATCH an club by ID
const updateClub = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such club' });
        }

        const club = await Club.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (!club) {
            return res.status(404).json({ error: 'No such club' });
        }

        res.status(200).json(club);
    } catch (error) {
        console.error('Error updating club:', error);
        res.status(500).json({ error: 'Could not update club.' });
    }
};

// GET all events of a club by club ID
const getClubEvents = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such club' });
        }

        const club = await Club.findById(id);

        if (!club) {
            return res.status(404).json({ error: 'No such club' });
        }

        const events = club.events;
        res.status(200).json(events);
    } catch (error) {
        console.error('Error getting club events:', error);
        res.status(500).json({ error: 'Could not get club events.' });
    }
};

// GET all members of a club by club ID
const getClubMembers = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such club' });
        }

        const club = await Club.findById(id);

        if (!club) {
            return res.status(404).json({ error: 'No such club' });
        }

        const members = club.members;
        res.status(200).json(members);
    } catch (error) {
        console.error('Error getting club members:', error);
        res.status(500).json({ error: 'Could not get club members.' });
    }
};

// GET advisor of a club by club ID
const getClubAdvisor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such club' });
        }

        const club = await Club.findById(id);

        if (!club) {
            return res.status(404).json({ error: 'No such club' });
        }

        const advisor = club.advisor;
        res.status(200).json(advisor);
    } catch (error) {
        console.error('Error getting club advisor:', error);
        res.status(500).json({ error: 'Could not get club advisor.' });
    }
};

module.exports = {
    getClubs,
    getClubById,
    createClub,
    deleteClub,
    updateClub,
    getClubEvents,
    getClubMembers,
    getClubAdvisor
};
