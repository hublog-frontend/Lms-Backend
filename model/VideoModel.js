const pool = require("../config/config");

const VideoModel = {
  createContent: async (module_id, title, contentData) => {
    try {
      const { type, fileName, originalname, size, mimetype, path, content } =
        contentData;

      const query = `INSERT INTO course_videos (module_id, content_type, title, filename, original_name, size, mime_type, file_path, content_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      const values = [
        module_id,
        type,
        title,
        fileName,
        originalname,
        size,
        mimetype,
        path,
        content,
      ];

      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      throw new Error("Error while uploading content: " + error.message);
    }
  },

  deleteContent: async (id) => {
    try {
      const query = `UPDATE course_videos SET is_deleted = 1 WHERE id = ?`;
      const [result] = await pool.query(query, [id]);
      return result[0];
    } catch (error) {
      throw new Error("Error deleting content: " + error.message);
    }
  },

  async getVideosByCourse(courseId, module_id) {
    try {
      const [videos] = await pool.query(
        `SELECT
            cv.id,
            cv.filename,
            cv.original_name,
            cv.size,
            cv.file_path,
            cv.created_at,
            c.course_name,
            cv.content_data,
            cv.mime_type,
            cv.content_type,
            cv.title,
            m.module_name,
            m.title AS module_title
        FROM
            course_videos cv
        INNER JOIN module AS m ON
            m.id = cv.module_id
        INNER JOIN course c ON
            m.course_id = c.id
        WHERE
            c.id = ? AND cv.is_deleted = 0 AND m.id = ?
        ORDER BY
            cv.created_at
        DESC
    `,
        [courseId, module_id],
      );
      return videos;
    } catch (error) {
      throw new Error("Error while fetching videos: " + error.message);
    }
  },
};

module.exports = VideoModel;
