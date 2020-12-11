const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/courses_controller");

router.get('/courses', coursesController.getCourses)
router.post('/create-course', coursesController.createCourse)
router.get('/course/:id', coursesController.getCourse)
router.get('/test/:id', coursesController.getTest)
router.get('/courses/:author', coursesController.getCoursesByAuthor);

module.exports = router;
