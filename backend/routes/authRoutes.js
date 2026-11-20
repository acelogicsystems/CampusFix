const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// REGISTER USER
router.post('/register', async (req, res ) => {
    try {
        const {name, email, password} = req.body;

        // check required fileds
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email and password'
            });
        }

        // validate password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters'
            });
        }

        // check whether email already exists
        const existingUser = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email is already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create student account
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'Student'
        });

        // Generate JWT

        const token = jwt.sign({
            id: newUser._id,
            role: newUser.role
        },
        process.env.JWT_SECRET, {
            expiresIn: '1d'
        }
    );

    res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token,
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
    });
    } catch (error) {
        res.status(500).json({
            successs: false,
            message: error.message
        });
    }
});

// LOGIN USER
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //check required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // find user
        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or passsword'
            });
        }

        // compare passwords
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        
        //Generate JWT
        const token = jwt.sign({
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
        
    );
    console.log(
            'Login token verification:',
            jwt.verify(token, process.env.JWT_SECRET)
        );

    res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

//GET CURRENT USER
router.get('/me', protect, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

module.exports = router;