const pool = require("../config/config");

const CourseModel = {
  createCourse: async (course_name, image, description, outcomes) => {
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
            base64string,
            description,
            outcomes
        )
        VALUES(?, ?, ?, ?)`,
        [course_name, image, description, outcomes],
      );

      return insertCourse.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCourses: async (course_id) => {
    try {
      const queryParams = [];
      let getQuery = `SELECT id, course_name, base64string, description, outcomes FROM course WHERE is_active = 1`;

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

  createModule: async (course_id, module_name, title) => {
    try {
      const [isExists] = await pool.query(
        `SELECT id FROM module WHERE module_name = ? AND course_id = ? AND is_active = 1`,
        [module_name, course_id],
      );

      if (isExists.length > 0)
        throw new Error("The module name already exists");

      const [insertModule] = await pool.query(
        `INSERT INTO module(
            course_id,
            module_name,
            title
        )
        VALUES(?, ?, ?)`,
        [course_id, module_name, title],
      );

      return insertModule.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getModules: async (course_id) => {
    try {
      const queryParams = [];
      let getQuery = `SELECT
                          m.id,
                          m.course_id,
                          c.course_name,
                          m.module_name,
                          m.title
                      FROM
                          module AS m
                      INNER JOIN course AS c ON
                          c.id = m.course_id
                      WHERE m.is_active = 1`;

      if (course_id) {
        getQuery += ` AND m.course_id = ?`;
        queryParams.push(course_id);
      }

      getQuery += ` ORDER BY m.id ASC`;

      const [modules] = await pool.query(getQuery, queryParams);

      return modules;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  insertReview: async (course_id, user_id, rating, review, created_date) => {
    try {
      if (!course_id || !user_id || !rating) {
        throw new Error("Missing required fields");
      }

      const [isExists] = await pool.query(
        `SELECT id FROM reviews WHERE user_id = ? AND course_id = ?`,
        [user_id, course_id],
      );

      if (isExists.length > 0) throw new Error("Review already updated");

      const [insertReview] = await pool.query(
        `INSERT INTO reviews (course_id, user_id, rating, review, created_at)
       VALUES (?, ?, ?, ?, ?)`,
        [course_id, user_id, rating, review, created_date],
      );

      return insertReview.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getReviews: async (course_id) => {
    try {
      const [review] = await pool.query(
        `SELECT 
            COUNT(*) as total_reviews,
            ROUND(AVG(rating), 1) as avg_rating,
            SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as five_star,
            SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as four_star,
            SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) as three_star,
            SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) as two_star,
            SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as one_star
        FROM reviews
        WHERE course_id = ?;`,
        [course_id],
      );

      const data = review[0];

      const total = data.total_reviews || 1; // prevent divide by zero

      const [getReviews] = await pool.query(
        `SELECT
            r.id,
            r.rating,
            r.review,
            r.created_at,
            r.user_id,
            u.user_name
        FROM
            reviews AS r
        INNER JOIN users AS u ON
            r.user_id = u.id
        WHERE r.course_id = ?
        ORDER BY r.id DESC;`,
        [course_id],
      );

      const [getDiscussions] = await pool.query(
        `SELECT
            d.id,
            d.course_id,
            d.user_id,
            u.user_name,
            d.comments,
            d.created_date
        FROM
            discussions AS d
        INNER JOIN users AS u ON
            d.user_id = u.id
        WHERE d.course_id = ?
        ORDER BY d.id DESC;`,
        [course_id],
      );

      const response = {
        average_rating: data.avg_rating || 0,
        total_reviews: data.total_reviews,
        distribution: {
          5: ((data.five_star / total) * 100).toFixed(1),
          4: ((data.four_star / total) * 100).toFixed(1),
          3: ((data.three_star / total) * 100).toFixed(1),
          2: ((data.two_star / total) * 100).toFixed(1),
          1: ((data.one_star / total) * 100).toFixed(1),
        },
        reviews: getReviews,
        discussions: getDiscussions,
      };

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  insertDiscussion: async (course_id, user_id, comments, created_date) => {
    try {
      if (!course_id || !user_id || !comments) {
        throw new Error("Missing required fields");
      }

      const [result] = await pool.query(
        `INSERT INTO discussions(
            course_id,
            user_id,
            comments,
            created_date
        )
        VALUES(?, ?, ?, ?)`,
        [course_id, user_id, comments, created_date],
      );

      return result.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = CourseModel;
