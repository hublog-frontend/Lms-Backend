const express = require("express");
const router = express.Router();

const { verifyToken } = require("../validation/Validation");
const LoginController = require("../controller/LoginController");
const CourseController = require("../controller/CourseController");

router.post("/login", LoginController.login);
router.post("/createCourse", verifyToken, CourseController.createCourse);
router.get("/getCourses", verifyToken, CourseController.getCourses);

module.exports = router;
