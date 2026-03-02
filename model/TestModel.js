const pool = require("../config/config");

const TestModel = {
  createTopic: async (topic_id, topic_name, created_date) => {
    let affectedRow = 0;
    try {
      if (!topic_id) {
        const [insertTopic] = await pool.query(
          `INSERT INTO topics(topic_name, created_date) VALUES(?, ?)`,
          [topic_name, created_date],
        );

        affectedRow += insertTopic.affectedRows;
      } else {
        const [updateTopic] = await pool.query(
          `UPDATE topics SET topic_name = ? WHERE id = ?`,
          [topic_name, topic_id],
        );

        affectedRow += updateTopic.affectedRows;
      }

      return affectedRow;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createTest: async (test_id, topic_id, test_name, created_date) => {
    let affectedRow = 0;
    try {
      if (!test_id) {
        const [insertTest] = await pool.query(
          `INSERT INTO tests(topic_id, test_name, created_date) VALUES(?, ?)`,
          [topic_id, test_name, created_date],
        );

        affectedRow += insertTest.affectedRows;
      } else {
        const [updateTest] = await pool.query(
          `UPDATE tests SET test_name = ? WHERE id = ?`,
          [topic_name, test_id],
        );

        affectedRow += updateTest.affectedRows;
      }

      return affectedRow;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  insertTestResult: async () => {
    try {
      const insertQuery = `INSERT INTO test_result(
                                history_id,
                                question_id,
                                selected_option,
                                mark,
                                created_date
                            )
                            VALUES(?, ?, ?, ?, ?)`;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = TestModel;
