const express = require("express");
const router = express.Router();

const { verifyToken } = require("../validation/Validation");
const LoginController = require("../controller/LoginController");
const CourseController = require("../controller/CourseController");

router.post("/login", LoginController.login);
router.post("/createCourse", verifyToken, CourseController.createCourse);
router.get("/getCourses", verifyToken, CourseController.getCourses);
router.post("/createModule", verifyToken, CourseController.createModule);
router.get("/getModules", verifyToken, CourseController.getModules);
router.post("/insertReview", verifyToken, CourseController.insertReview);
router.get("/getReviews", verifyToken, CourseController.getReviews);
router.post(
  "/insertDiscussion",
  verifyToken,
  CourseController.insertDiscussion,
);

module.exports = router;
