const { request, response } = require("express");
const CourseModel = require("../model/CourseModel");

const createCourse = async (request, response) => {
  const { course_name, image } = request.body;
  try {
    const courses = await CourseModel.createCourse(course_name, image);

    return response.status(201).send({
      message: "Course created successfully",
      date: courses,
    });
  } catch (error) {
    response.status(500).send({
      message: "Error while inserting course",
      details: error.message,
    });
  }
};

const getCourses = async (request, response) => {
  const { course_id } = request.query;
  try {
    const courses = await CourseModel.getCourses(course_id);

    return response.status(201).send({
      message: "Courses fetched successfully",
      date: courses,
    });
  } catch (error) {
    response.status(500).send({
      message: "Error while fetching courses",
      details: error.message,
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
};
