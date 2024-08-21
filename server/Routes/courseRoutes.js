const express = require('express');
const router = express.Router();

const courseController = require('../controllers/Course');

// Define routes
router.get('/alltopcourses', courseController.showAllCourses);
router.post('/createCourse', courseController.createCourse);
router.get('/showMyCourses/:userId', courseController.showMyCourses);
router.get('/showCourseContent/:id', courseController.showCourseContent);

module.exports = router; // Ensure this is exporting the router object
