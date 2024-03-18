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
    getClubPresident,
    getClubPartnerships,
    getClubAchievements
} = require('../controllers/clubController.js');

// GET all clubs
router.get('/', getClubs);

// GET a single club
router.get('/:id', getClubById);

// POST a new club
router.post('/', createClub);

// DELETE a club
router.delete('/:id', deleteClub);

// UPDATE a club
router.patch('/:id', updateClub);

// GET all events of a club
router.get('/:id/events', getClubEvents);

// GET all members of a club
router.get('/:id/members', getClubMembers);

// GET leadership information of a club
router.get('/:id/president', getClubPresident);

// GET partnerships of a club
router.get('/:id/partnerships', getClubPartnerships);

// GET achievements of a club
router.get('/:id/achievements', getClubAchievements);

module.exports = router;
