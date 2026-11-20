const { body, validationResult } = require('express-validator');
const validateIssue = [
    body('title')
       .trim()
       .notEmpty()
       .withMessage('Issue titl is required')
       .isLength({ min: 5, max: 100})
       .withMessage('Title must be between 5 and 100 characters'),

    body('description')
       .trim()
       .notEmpty()
       .withMessage('Issue description is required')
       .isLength({ min: 10, max: 1000})
       .withMessage('Description must be between 10 and 1000 characters'),
    body('category')
       .isIn(['Electrical', 'Plumbing', 'Furniture', 'Cleaning', 'Other'])
       .withMessage('Invalid issue category'),
       
    body('priority')
       .optional()
       .isIn(['Low', 'Medium', 'High'])
       .withMessage('Invalid issue priority'),

       (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
         next();
       }

];

module.exports = validateIssue;