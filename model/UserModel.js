const pool = require("../config/config");

const UserModel = {
  updateExperience: async (
    user_id,
    company_name,
    job_title,
    year_of_experience,
    location,
    start_month,
    start_year,
    end_month,
    end_year,
    is_present,
    responsibility,
    created_date,
    experience_id,
  ) => {
    try {
      let affectedRows = 0;
      const insertQuery = `INSERT INTO experiences(
                                user_id,
                                company_name,
                                job_title,
                                years_of_experience,
                                location,
                                start_month,
                                start_year,
                                end_month,
                                end_year,
                                responsibility,
                                is_present_company,
                                created_date
                            )
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const insertValues = [
        user_id,
        company_name,
        job_title,
        year_of_experience,
        location,
        start_month,
        start_year,
        end_month,
        end_year,
        responsibility,
        is_present,
        created_date,
      ];

      const updateQuery = `UPDATE
                                experiences
                            SET
                                company_name = ?,
                                job_title = ?,
                                years_of_experience = ?,
                                location = ?,
                                start_month = ?,
                                start_year = ?,
                                end_month = ?,
                                end_year = ?,
                                responsibility = ?,
                                is_present_company = ?
                            WHERE id = ?`;

      const updateValues = [
        company_name,
        job_title,
        year_of_experience,
        location,
        start_month,
        start_year,
        end_month,
        end_year,
        responsibility,
        is_present,
        experience_id,
      ];

      if (!experience_id) {
        const [insertResult] = await pool.query(insertQuery, insertValues);

        affectedRows += insertResult.affectedRows;
      } else if (experience_id) {
        const [updateResult] = await pool.query(updateQuery, updateValues);

        affectedRows += updateResult.affectedRows;
      }

      return affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateEducation: async (
    user_id,
    education,
    register_number,
    passed_year,
    college_name,
    board_name,
    percentage,
    branch,
    backlog,
    year_gap,
    created_date,
    education_id,
  ) => {
    try {
      let affectedRows = 0;
      const insertQuery = `INSERT INTO educations(
                                user_id,
                                education,
                                register_number,
                                passed_year,
                                college_name,
                                board_name,
                                percentage,
                                branch,
                                backlog,
                                year_gap,
                                created_date
                            )
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const insertValues = [
        user_id,
        education,
        register_number,
        passed_year,
        college_name,
        board_name,
        percentage,
        branch,
        backlog,
        year_gap,
        created_date,
      ];

      const updateQuery = `UPDATE
                                educations
                            SET
                                education = ?,
                                register_number = ?,
                                passed_year = ?,
                                college_name = ?,
                                board_name = ?,
                                percentage = ?,
                                branch = ?,
                                backlog = ?,
                                year_gap = ?
                            WHERE
                                id = ?`;

      const updateValues = [
        education,
        register_number,
        passed_year,
        college_name,
        board_name,
        percentage,
        branch,
        backlog,
        year_gap,
        education_id,
      ];

      if (!education_id) {
        const [insertResult] = await pool.query(insertQuery, insertValues);

        affectedRows += insertResult.affectedRows;
      } else if (education_id) {
        const [updateResult] = await pool.query(updateQuery, updateValues);

        affectedRows += updateResult.affectedRows;
      }

      return affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateProject: async (
    user_id,
    project_name,
    link,
    description,
    created_date,
    project_id,
  ) => {
    try {
      let affectedRows = 0;
      const insertQuery = `INSERT INTO projects(
                                user_id,
                                project_name,
                                link,
                                description,
                                created_date
                            )
                            VALUES(?, ?, ?, ?, ?)`;

      const insertValues = [
        user_id,
        project_name,
        link,
        description,
        created_date,
      ];

      const updateQuery = `UPDATE
                                projects
                            SET
                                project_name = ?,
                                link = ?,
                                description = ?
                            WHERE
                                id = ?`;

      const updateValues = [project_name, link, description, project_id];

      if (!project_id) {
        const [insertResult] = await pool.query(insertQuery, insertValues);

        affectedRows += insertResult.affectedRows;
      } else if (project_id) {
        const [updateResult] = await pool.query(updateQuery, updateValues);

        affectedRows += updateResult.affectedRows;
      }

      return affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateCertificate: async (
    user_id,
    title,
    issuing_organization,
    issued_year,
    description,
    created_date,
    certificate_id,
  ) => {
    try {
      let affectedRows = 0;
      const insertQuery = `INSERT INTO projects(
                                user_id,
                                title,
                                issuing_organization,
                                issued_year,
                                description,
                                created_date
                            )
                            VALUES(?, ?, ?, ?, ?, ?)`;

      const insertValues = [
        user_id,
        title,
        issuing_organization,
        issued_year,
        description,
        created_date,
      ];

      const updateQuery = `UPDATE
                                projects
                            SET
                                title = ?,
                                issuing_organization = ?,
                                issued_year = ?,
                                description = ?
                            WHERE
                                id = ?`;

      const updateValues = [
        title,
        issuing_organization,
        issued_year,
        description,
        certificate_id,
      ];

      if (!certificate_id) {
        const [insertResult] = await pool.query(insertQuery, insertValues);

        affectedRows += insertResult.affectedRows;
      } else if (certificate_id) {
        const [updateResult] = await pool.query(updateQuery, updateValues);

        affectedRows += updateResult.affectedRows;
      }

      return affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = UserModel;
