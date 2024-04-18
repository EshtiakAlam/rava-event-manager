const express = require('express');
const router = express.Router();

const {
    createLogisticsRequest,
    getLogisticsRequests,
    getLogisticsRequestById,
    deleteLogisticsRequest,
    updateLogisticsRequest,
    fetchLogisticsRequestsByClub
} = require('../controllers/logisticsRequestController.js');

// GET all logistics requests
router.get('/', getLogisticsRequests);

// GET Logistics requests by club id
router.get('/:clubId', fetchLogisticsRequestsByClub);

// GET a single logistics request
router.get('/:id', getLogisticsRequestById);

// POST a new logistics request
router.post('/', createLogisticsRequest);

// DELETE a logistics request
router.delete('/:id', deleteLogisticsRequest);

// UPDATE a logistics request
router.patch('/:id', updateLogisticsRequest);

module.exports = router;
