const pool = require("../config/config");

const CompanyModel = {
  addCompanyQuestions: async (
    company_id,
    company_name,
    company_logo,
    skills,
    created_date,
    attachment_title,
    attachment,
  ) => {
    try {
      let affectedRows = 0;
      if (!company_id) {
        const query = `INSERT INTO company_questions (company_name, company_logo, skills, created_date) VALUES (?, ?, ?, ?)`;
        const [insertQuestion] = await pool.query(query, [
          company_name,
          company_logo,
          JSON.stringify(skills),
          created_date,
        ]);
        affectedRows += insertQuestion.affectedRows;

        if (attachment) {
          const query = `INSERT INTO company_attachments (company_id, title, attachment) VALUES (?, ?, ?)`;
          const [insertAttachment] = await pool.query(query, [
            insertQuestion.insertId,
            attachment_title,
            attachment,
          ]);
          affectedRows += insertAttachment.affectedRows;
        }
      } else {
        const query = `UPDATE company_questions SET company_name = ?, company_logo = ?, skills = ? WHERE company_id = ?`;
        const [updateQuestion] = await pool.query(query, [
          company_name,
          company_logo,
          JSON.stringify(skills),
          company_id,
        ]);
        affectedRows += updateQuestion.affectedRows;

        if (attachment) {
          const query = `UPDATE company_attachments SET title = ?, attachment = ? WHERE company_id = ?`;
          const [updateAttachment] = await pool.query(query, [
            attachment_title,
            attachment,
            company_id,
          ]);
          affectedRows += updateAttachment.affectedRows;
        }
      }
      return affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCompanyQuestions: async (company_name, skills) => {
    try {
      let query = `SELECT
                        id,
                        company_name,
                        company_logo,
                        skills,
                        is_active,
                        created_date
                    FROM
                        company_questions
                    WHERE 1 = 1`;
      if (company_name) {
        query += ` AND company_name LIKE '%${company_name}%'`;
      }
      if (skills) {
        query += ` AND skills LIKE '%${skills}%'`;
      }
      query += ` ORDER BY created_date DESC`;
      const [result] = await pool.query(query);

      const ids = [...new Set(result.map((item) => item.id))];

      let attachmentsMap = new Map();
      if (ids.length > 0) {
        const [attachments] = await pool.query(
          `SELECT id, company_id, title, attachment FROM company_attachments WHERE company_id IN (?)`,
          [ids],
        );
        attachments.forEach((attachment) => {
          attachmentsMap.set(attachment.company_id, attachment);
        });
      }

      const combinedResult = result.map((item) => {
        const attachment = attachmentsMap.get(item.id) || null;
        return {
          ...item,
          skills: JSON.parse(item.skills),
          attachment: attachment ? attachment.attachment : null,
          attachment_title: attachment ? attachment.title : null,
        };
      });
      return combinedResult;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteCompanyQuestion: async (company_id) => {
    try {
      const query = `DELETE FROM company_questions WHERE id = ?`;
      const result = await pool.query(query, [company_id]);
      return result.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  addToFavorite: async (company_id, user_id) => {
    try {
      const [isAlreadyFavorite] = await pool.query(
        `SELECT id FROM company_favorites WHERE company_id = ? AND user_id = ?`,
        [company_id, user_id],
      );
      if (isAlreadyFavorite.length > 0) {
        return 0;
      }
      const query = `INSERT INTO company_favorites (company_id, user_id) VALUES (?, ?)`;
      const result = await pool.query(query, [company_id, user_id]);
      return result.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  removeFromFavorite: async (company_id, user_id) => {
    try {
      const query = `DELETE FROM company_favorites WHERE company_id = ? AND user_id = ?`;
      const result = await pool.query(query, [company_id, user_id]);
      return result.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getFavoriteCompanies: async (user_id) => {
    try {
      const query = `SELECT
                        cf.id AS favorite_id,
                        cf.company_id,
                        cf.user_id,
                        cq.company_name,
                        cq.company_logo,
                        cq.skills,
                        cq.created_date
                    FROM company_favorites AS cf
                    INNER JOIN company_questions AS cq ON
                        cf.company_id = cq.id
                    WHERE
                        cf.user_id = ?`;
      const [result] = await pool.query(query, [user_id]);

      const companyIds = [...new Set(result.map((item) => item.company_id))];

      let attachmentsMap = new Map();
      if (companyIds.length > 0) {
        const [attachments] = await pool.query(
          `SELECT id, company_id, title, attachment FROM company_attachments WHERE company_id IN (?)`,
          [companyIds],
        );
        attachments.forEach((attachment) => {
          attachmentsMap.set(attachment.company_id, attachment);
        });
      }

      const combinedResult = result.map((item) => {
        const attachment = attachmentsMap.get(item.company_id) || null;
        return {
          ...item,
          skills: JSON.parse(item.skills),
          attachment: attachment ? attachment.attachment : null,
          attachment_title: attachment ? attachment.title : null,
        };
      });
      return combinedResult;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  addCategory: async (category_id, category_name) => {
    try {
      let affectedRows = 0;
      if (!category_id) {
        const [isCategory] = await pool.query(
          `SELECT id FROM question_category WHERE category_name = ?`,
          [category_name],
        );
        if (isCategory.length > 0) {
          throw new Error("Category already exists");
        }
        const query = `INSERT INTO question_category (category_name) VALUES (?)`;
        const [result] = await pool.query(query, [category_name]);
        affectedRows += result.affectedRows;
      } else {
        const query = `UPDATE question_category SET category_name = ? WHERE id = ?`;
        const [result] = await pool.query(query, [category_name, category_id]);
        affectedRows += result.affectedRows;
      }
      return affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCategory: async (category_name) => {
    try {
      let query = `SELECT id, category_name FROM question_category WHERE is_active = 1`;
      if (category_name) {
        query += ` AND category_name LIKE '%${category_name}%'`;
      }
      query += ` ORDER BY category_name ASC`;
      const [result] = await pool.query(query);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteCategory: async (category_id) => {
    try {
      const query = `DELETE FROM question_category WHERE id = ?`;
      const result = await pool.query(query, [category_id]);
      return result.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = CompanyModel;
