const express = require('express');
const router = express.Router();
const clubMemberController = require('../controllers/clubMemberController');



// GET all club members
router.get('/', clubMemberController.getAllClubMembers);

// GET a single club member by ID
router.get('/:id', clubMemberController.getClubMemberById);

// GET pending club members by club ID
router.get('/pending-by-club/:clubId', clubMemberController.getPendingClubMembersByClubId);

// GET approved club members by club ID
router.get('/approved-by-club/:clubId', clubMemberController.getApprovedClubMembersByClubId);


// POST a new club member
router.post('/', clubMemberController.createClubMember);

// PATCH update a club member by ID
router.patch('/:id', clubMemberController.updateClubMemberById);

// DELETE a club member by ID
router.delete('/:id', clubMemberController.deleteClubMemberById);


module.exports = router;
