const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const Registration = require('../models/Registration');
const Course = require('../models/Course');

// GET /api/registrations/my – מחזיר את הקורסים של המשתמש המחובר
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // משיג את כל ההרשמות של המשתמש כולל פרטי הקורס
    const registrations = await Registration.find({ user: userId }).populate('course');

    // מחלץ רק את הקורסים
    const courses = registrations.map(r => r.course);

    res.json(courses);
  } catch (err) {
    console.error('שגיאה בשליפת קורסים של המשתמש:', err);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
});

module.exports = router;
