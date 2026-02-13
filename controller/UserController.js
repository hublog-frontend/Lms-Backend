const { request, response } = require("express");
const UserModel = require("../model/UserModel");

const updateExperience = async (request, response) => {
  const {
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
  } = request.body;
  try {
    const result = await UserModel.updateExperience(
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
    );

    return response.status(201).send({
      message: "Experience updated successfully",
      data: result,
    });
  } catch (error) {
    response.status(500).send({
      message: "Error while updating experience",
      details: error.message,
    });
  }
};

const updateEducation = async (request, response) => {
  const {
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
  } = request.body;
  try {
    const result = await UserModel.updateEducation(
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
    );

    return response.status(201).send({
      message: "Education updated successfully",
      data: result,
    });
  } catch (error) {
    response.status(500).send({
      message: "Error while updating education",
      details: error.message,
    });
  }
};

const updateProject = async (request, response) => {
  const { user_id, project_name, link, description, created_date, project_id } =
    request.body;
  try {
    const result = await UserModel.updateProject(
      user_id,
      project_name,
      link,
      description,
      created_date,
      project_id,
    );

    return response.status(201).send({
      message: "Project updated successfully",
      data: result,
    });
  } catch (error) {
    response.status(500).send({
      message: "Error while updating project",
      details: error.message,
    });
  }
};

const updateCertificate = async (request, response) => {
  const {
    user_id,
    title,
    issuing_organization,
    issued_year,
    description,
    created_date,
    certificate_id,
  } = request.body;
  try {
    const result = await UserModel.updateCertificate(
      user_id,
      title,
      issuing_organization,
      issued_year,
      description,
      created_date,
      certificate_id,
    );

    return response.status(201).send({
      message: "Certificate updated successfully",
      data: result,
    });
  } catch (error) {
    response.status(500).send({
      message: "Error while updating certificate",
      details: error.message,
    });
  }
};

module.exports = {
  updateExperience,
  updateEducation,
  updateProject,
  updateCertificate,
};
