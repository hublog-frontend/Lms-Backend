const express = require("express");
const router = express.Router();

const { verifyToken } = require("../validation/Validation");
const LoginController = require("../controller/LoginController");
const CourseController = require("../controller/CourseController");
const UserController = require("../controller/UserController");
const VideoController = require("../controller/VideoController");
const upload = require("../validation/UploadMiddleware");

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

router.post("/updateExperience", verifyToken, UserController.updateExperience);
router.post("/updateEducation", verifyToken, UserController.updateEducation);
router.post("/updateProject", verifyToken, UserController.updateProject);
router.post(
  "/updateCertificate",
  verifyToken,
  UserController.updateCertificate,
);
router.post("/updateUser", verifyToken, UserController.updateUser);
router.get("/getUserById", verifyToken, UserController.getUserById);
router.post("/getAllUsers", verifyToken, UserController.getAllUsers);
router.delete(
  "/deleteExperience",
  verifyToken,
  UserController.deleteExperience,
);
router.delete("/deleteProject", verifyToken, UserController.deleteProject);

router.post(
  "/uploadContent",
  upload.uploadCourseVideo.single("content"),
  VideoController.uploadContent,
);
router.get("/getVideos", VideoController.getCourseVideos);
router.delete("/deleteContent", VideoController.deleteContent);
router.delete(
  "/deleteCertificate",
  verifyToken,
  UserController.deleteCertificate,
);

module.exports = router;
