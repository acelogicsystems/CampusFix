const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

//@desc Submit a new maintenance issue
// @route POST /api/issues
// @access Public (for now)

router.post('/', async (req, res) =>
{
    try {
        const {
            title,
            description,
            category,
            location,
            priority
        } = req.body;

        const newIssue = new Issue({
            title,
            description,
            category,
            location,
            priority
        });

        const savedIssue = await newIssue.save();

        res.status(201).json({
            success: true,
            message: 'Issue submitted successfully',
            data: savedIssue
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// @desc Get all maintenance issues
// @route GET/api/issues
// @access public (for now)

router.get('/', async (req, res) => {
    try {
        const issues = await Issue.find().sort('-createdAt');

        res.status(200).json({
            success: true,
            count: issues.length,
            data: issues
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @desc Get a single maintenance issue
// @route GET/api/issues/:id
// @access Public (for now)

router.get('/:id', async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: 'Issue not found'
            });
        } 
         res.status(200).json({
            success: true,
            data: issue

         });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid issue ID'
        });
    }
});

// @desc Update maintenance issue status
// @route PATCH /api/issues/:id/status
// @access Public (for now)

router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            'Pending',
            'In Progress',
            'Resolved'
        ];

        if (! allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid issue status'
            });
        }

        const updatedIssue = await 
        Issue.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedIssue) {
            return res.status(404).json({
                success: false,
                message: 'Issue not found'
            });
        } 

        res.status(200).json({
                success: true,
                message: 'Issue status updated successsfully',
                data: updatedIssue
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
    }
});

// @desc Update issue details
// @route PUT /api/issues/:id
// @access Public (for now)

router.put('/:id', async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            location,
            priority
        } = req.body;

        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.id, {
                title,
                description,
                category,
                location,
                priority
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedIssue) {
            return res.status(404).json({
                success: false,
                message: 'Issue not found'
            });
        }

        res.status(200).json({
            succes: true,
            mesage: 'Issue updated successfully',
            data: updatedIssue
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;