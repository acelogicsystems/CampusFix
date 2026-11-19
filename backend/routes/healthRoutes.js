const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).json({
        "success": true,
        "message": 'CampusFix API is healthy',
        "service": 'CampusFix Backend',
        "timestamp": new Date().toISOString()

    });
});

module.exports = router;