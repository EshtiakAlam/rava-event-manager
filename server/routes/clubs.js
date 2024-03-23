const express = require('express');
const router = express.Router();
const {
    createClub,
    getClubs,
    getClubById,
    deleteClub,
    updateClub,
    getClubEvents,
    getClubMembers,
    getClubAdvisor
} = require('../controllers/clubController.js');

// GET all clubs
router.get('/', getClubs);

// GET a single club
router.get('/:id', getClubById);

// GET all events of a club
router.get('/:id/events', getClubEvents);

// GET all members of a club
router.get('/:id/members', getClubMembers);

// GET advisor of a club
router.get('/:id/advisor', getClubAdvisor);

// POST a new club
router.post('/', createClub);

// DELETE a club
router.delete('/:id', deleteClub);

// UPDATE a club
router.patch('/:id', updateClub);


module.exports = router;
