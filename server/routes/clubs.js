const express = require('express');
const router = express.Router();
const {
    createClub,
    getClubs,
    getClubById,
    deleteClub,
    updateClub,
    getClubEvents,
    getClubsByAbbreviation
} = require('../controllers/clubController.js');

// GET all clubs
router.get('/', getClubs);


// GET a single club
router.get('/:id', getClubById);

// GET all events of a club
router.get('/:id/events', getClubEvents);

// GET clubs by abbreviation
router.get("/:abbreviation", getClubsByAbbreviation);

// POST a new club
router.post('/', createClub);

// DELETE a club
router.delete('/:id', deleteClub);

// UPDATE a club
router.patch('/:id', updateClub);


module.exports = router;
