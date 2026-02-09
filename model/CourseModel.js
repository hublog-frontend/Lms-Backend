const pool = require("../config/config");

const CourseModel = {
  createCourse: async (course_name, image) => {
    try {
      const [isExists] = await pool.query(
        `SELECT id FROM course WHERE course_name = ? AND is_active = 1`,
        [course_name],
      );

      if (isExists.length > 0)
        throw new Error("The course name already exists");

      const [insertCourse] = await pool.query(
        `INSERT INTO course(
            course_name,
            base64string
        )
        VALUES(?, ?)`,
        [course_name, image],
      );

      return insertCourse.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCourses: async (course_id) => {
    try {
      const queryParams = [];
      let getQuery = `SELECT id, course_name, base64string FROM course WHERE is_active = 1`;

      if (course_id) {
        getQuery += ` AND id = ?`;
        queryParams.push(course_id);
      }

      getQuery += ` ORDER BY course_name ASC`;

      const [courses] = await pool.query(getQuery, queryParams);

      return courses;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = CourseModel;
