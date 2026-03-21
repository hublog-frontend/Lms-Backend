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
        const result = await pool.query(query, [
          company_name,
          company_logo,
          JSON.stringify(skills),
          created_date,
        ]);
        affectedRows += result.affectedRows;

        if (attachment) {
          const query = `INSERT INTO company_attachments (company_id, title, attachment) VALUES (?, ?, ?)`;
          const result = await pool.query(query, [
            result.insertId,
            attachment_title,
            attachment,
          ]);
          affectedRows += result.affectedRows;
        }
      } else {
        const query = `UPDATE company_questions SET company_name = ?, company_logo = ?, skills = ? WHERE company_id = ?`;
        const result = await pool.query(query, [
          company_name,
          company_logo,
          JSON.stringify(skills),
          company_id,
        ]);
        affectedRows += result.affectedRows;

        if (attachment) {
          const query = `UPDATE company_attachments SET title = ?, attachment = ? WHERE company_id = ?`;
          const result = await pool.query(query, [
            attachment_title,
            attachment,
            company_id,
          ]);
          affectedRows += result.affectedRows;
        }
      }
      return affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCompanyQuestions: async (company_name, skills) => {
    try {
      const queryParams = [];
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
        query += ` AND company_name = ?`;
        queryParams.push(company_name);
      }
      if (skills) {
        query += ` AND skills LIKE ?`;
        queryParams.push(`%${skills}%`);
      }
      query += ` ORDER BY created_date DESC`;
      const result = await pool.query(query, queryParams);
      return result;
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
                        id,
                        company_id,
                        user_id,
                        created_date
                    FROM
                        company_favorites
                    WHERE user_id = ?`;
      const result = await pool.query(query, [user_id]);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = CompanyModel;
