const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const validateIssue = require('../middleware/issueValidation');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

//@desc Submit a new maintenance issue
// @route POST /api/issues
// @access Public (for now)

router.post('/', protect,  validateIssue, async (req, res) =>
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
            priority,
            reportedBy: req.user._id
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

router.get('/', protect, async (req, res) => {
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

// @desc Update maintenance issue status
// @route PATCH /api/issues/:id/status
// @access Public (for now)

router.patch('/:id/status', protect, authorize('Admin'), async (req, res) => {
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

router.put('/:id', protect, authorize('Admin'), validateIssue, async (req, res) => {
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

// DELETE an issue
router.delete('/:id', protect, authorize('Admin'), async (req, res) => {
    try {
        const deletedIssue = await Issue.findByIdAndDelete(
            req.params.id
        );

        if (!deletedIssue) {
            return res.status(404).json({
                success: false,
                message: 'Issue not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Issue deleted successfully',
            data: deletedIssue
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid issue ID'
        });
    }
});

// GET all isues with search and filters

router.get('/', async (req, res) => {
    try {
        const { category, status, priority, search } = req.query;
        const filters = {};

        // Students can only see their own issue
        if (req.user.role !== 'Admin') {
            filters.reportedBy = req.user._id;
        }

        // Optional filters
        if (category) {
            filters.category = category;
        }

        if (status) {
            filters.status = status;
        }

        if (priority) {
            filters.priority = priority;
        }

        if (search) {
            filters.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' }}
            ];
        }

        //Pagination
        const currentPage = Math.max(1, parseInt(page, 10) || 1);
        const perPage = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
        const skip = (currentPage - 1) * perPage;
        const totalIssues = await Issue.countDocuments(filters);
        const issues = await Issue.find(filters)
                                            .sort('-createdAt')
                                            .skip(skip)
                                            .limit(perPage);
                                      res.status(200).json({
                                        successs: true,
                                        count: issues.length,
                                        totlaIssues,
                                        currentPage,
                                        totalPages:
                                Math.ceil(totalIssues / perPage),
                                            data: issues
                                      })   ;   

    }  catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
// @desc Get statistics for the logged-in student
// @route GET /api/issues/my-stats
// @access Private (student)

router.get('/my-stats', protect, async (req, res) => {
    try {
        const totalIssues = await Issue.countDocuments({
            reportedBy: req.user._id
        });

        const pendingIssues = await Issue.countDocuments({
            reportedBy: req.user._id, status: 'Pending'
        });

        const inProgressIssues = await Issue.countDocuments({
            reportedBy: req.user._id, status: 'In Progress'
        });

        const resolvedIssues = await Issue.countDocuments({
            reportedBy: req.user._id, status: 'Resolved'
        });

        res.status(200).json({
            success: true,
            stats: {
                totalIssues,
                pendingIssues,
                inProgressIssues,
                resolvedIssues
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve student statistics',
            erro: error.message
        });
    }
});



//GET issue statistics

router.get('/stats/overview', protect, authorize('Admin'), async (req, res) => {
    try {
        const totalIssues = await Issue.countDocuments();
        const pendingIssues = await Issue.countDocuments({
            status: 'Pending'
        });

        const inProgressIssues = await Issue.countDocuments({
            status: 'in Progress'
        });

        const resolvedIssues = await Issue.countDocuments({
            status: 'Resolved'
        });

        const highPriorityIssues = await Issue.countDocuments({
            priority: 'High'
        });

        res.status(200).json({
            success: true,
            data: {
                totalIssues,
                pendingIssues,
                inProgressIssues,
                resolvedIssues,
                highPriorityIssues
            }
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

router.get('/:id', protect, async (req, res) => {
    try {
        const filters = {
            _id: req.params.id
        };

        // students can only access their own issues
        if (req.user.role !== 'Admin') {
            filters.reportedBy = req.user._id;
        }

        const issue = await Issue.findOne(filters);

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


module.exports = router;