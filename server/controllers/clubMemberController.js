const ClubMember = require('../models/clubMemberModel');
const mongoose = require('mongoose');

// Function to get all club members
const getAllClubMembers = async (req, res) => {
    try {
        const clubMembers = await ClubMember.find({});
        res.status(200).json(clubMembers);
    } catch (error) {
        console.error('Error getting club members:', error);
        res.status(500).json({ error: 'Could not get club members.' });
    }
};

// GET a single club member by ID
const getClubMemberById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such club member' });
        }

        const clubMember = await ClubMember.findById(id);

        if (!clubMember) {
            return res.status(404).json({ error: 'No such club member' });
        }

        res.status(200).json(clubMember);
    } catch (error) {
        console.error('Error getting club member:', error);
        res.status(500).json({ error: 'Could not get club member.' });
    }
};

// GET pending club members by club ID
const getPendingClubMembersByClubId = async (req, res) => {
    const { clubId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(clubId)) {
            return res.status(404).json({ error: 'Invalid club ID' });
        }

        const pendingClubMembers = await ClubMember.find({ clubID: clubId, status: 'Pending' });

        if (!pendingClubMembers || pendingClubMembers.length === 0) {
            return res.status(404).json({ error: 'No pending club members found for this club ID' });
        }

        res.status(200).json(pendingClubMembers);
    } catch (error) {
        console.error('Error getting pending club members by club ID:', error);
        res.status(500).json({ error: 'Could not get pending club members by club ID' });
    }
};


// GET approved club members by club ID
const getApprovedClubMembersByClubId = async (req, res) => {
    const { clubId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(clubId)) {
            return res.status(404).json({ error: 'Invalid club ID' });
        }

        const approvedClubMembers = await ClubMember.find({ clubID: clubId, status: 'Approved' });

        if (!approvedClubMembers || approvedClubMembers.length === 0) {
            return res.status(404).json({ error: 'No approved club members found for this club ID' });
        }

        res.status(200).json(approvedClubMembers);
    } catch (error) {
        console.error('Error getting approved club members by club ID:', error);
        res.status(500).json({ error: 'Could not get approved club members by club ID' });
    }
};



// POST a new club member
const createClubMember = async (req, res) => {
    const { studentID, name, department, contact, email, status, clubID } = req.body;

    try {
        const clubMember = await ClubMember.create({ studentID, name, department, contact, email, status, clubID });
        res.status(201).json(clubMember);
    } catch (error) {
        console.error('Error creating club member:', error);
        res.status(500).json({ error: 'Could not create club member.' });
    }
};


// PATCH update a club member by ID
const updateClubMemberById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid club member ID' });
        }

        const updatedClubMember = await ClubMember.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedClubMember) {
            return res.status(404).json({ error: 'No such club member' });
        }

        res.status(200).json(updatedClubMember);
    } catch (error) {
        console.error('Error updating club member:', error);
        res.status(500).json({ error: 'Could not update club member' });
    }
};


// DELETE a club member by ID
const deleteClubMemberById = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid club member ID' });
        }

        const clubMember = await ClubMember.findByIdAndDelete(id);

        if (!clubMember) {
            return res.status(404).json({ error: 'No such club member' });
        }

        res.status(200).json({ message: 'Club member deleted successfully' });
    } catch (error) {
        console.error('Error deleting club member:', error);
        res.status(500).json({ error: 'Could not delete club member' });
    }
};

module.exports = {
    getAllClubMembers,
    getPendingClubMembersByClubId,
    getApprovedClubMembersByClubId,
    getClubMemberById,
    createClubMember,
    updateClubMemberById,
    deleteClubMemberById
};
