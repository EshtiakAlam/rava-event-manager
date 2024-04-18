const LogisticsRequest = require('../models/logisticsRequestModel');
const mongoose = require('mongoose');

// GET all logistics requests
const getLogisticsRequests = async (req, res) => {
    try {
        const requests = await LogisticsRequest.find({}).sort({ createdAt: 1 });
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error getting logistics requests:', error);
        res.status(500).json({ error: 'Could not get logistics requests.' });
    }
};

// GET a single logistics request by ID
const getLogisticsRequestById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such logistics request' });
        }

        const request = await LogisticsRequest.findById(id);

        if (!request) {
            return res.status(404).json({ error: 'No such logistics request' });
        }

        res.status(200).json(request);
    } catch (error) {
        console.error('Error getting logistics request:', error);
        res.status(500).json({ error: 'Could not get logistics request.' });
    }
};

// POST a new logistics request
const createLogisticsRequest = async (req, res) => {
    const { event, items } = req.body;

    try {
        const request = await LogisticsRequest.create({ event, items });
        res.status(201).json(request);
    } catch (error) {
        console.error('Error creating logistics request:', error);
        res.status(500).json({ error: 'Could not create logistics request.' });
    }
};

// DELETE a logistics request by ID
const deleteLogisticsRequest = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such logistics request' });
        }

        const request = await LogisticsRequest.findOneAndDelete({ _id: id });

        if (!request) {
            return res.status(404).json({ error: 'No such logistics request' });
        }

        res.status(200).json(request);
    } catch (error) {
        console.error('Error deleting logistics request:', error);
        res.status(500).json({ error: 'Could not delete logistics request.' });
    }
};

// PATCH a logistics request by ID
const updateLogisticsRequest = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such logistics request' });
        }

        const request = await LogisticsRequest.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (!request) {
            return res.status(404).json({ error: 'No such logistics request' });
        }

        res.status(200).json(request);
    } catch (error) {
        console.error('Error updating logistics request:', error);
        res.status(500).json({ error: 'Could not update logistics request.' });
    }
};

module.exports = {
    getLogisticsRequests,
    getLogisticsRequestById,
    createLogisticsRequest,
    deleteLogisticsRequest,
    updateLogisticsRequest
};
