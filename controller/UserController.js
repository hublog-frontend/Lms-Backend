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

const updateUser = async (request, response) => {
  const {
    user_name,
    email,
    password,
    phone_code,
    phone,
    whatsapp_code,
    whatsapp_number,
    guardian_phone_code,
    guardian_phone,
    gender,
    dob,
    linked_in,
    instagram,
    current_state,
    current_city,
    native_state,
    native_city,
    permanent_address,
    pincode,
    academic_gap,
    enrolled_mode,
    ready_for_relocate,
    github_link,
    portfolio_link,
    portfolio_title,
    summary,
    skills,
    hobbies,
    languages,
    service_agreement,
    placed,
    profile_image,
    resume,
    user_id,
  } = request.body;
  try {
    const result = await UserModel.updateUser(
      user_name,
      email,
      password,
      phone_code,
      phone,
      whatsapp_code,
      whatsapp_number,
      guardian_phone_code,
      guardian_phone,
      gender,
      dob,
      linked_in,
      instagram,
      current_state,
      current_city,
      native_state,
      native_city,
      permanent_address,
      pincode,
      academic_gap,
      enrolled_mode,
      ready_for_relocate,
      github_link,
      portfolio_link,
      portfolio_title,
      summary,
      JSON.stringify(skills),
      JSON.stringify(hobbies),
      JSON.stringify(languages),
      service_agreement,
      placed,
      profile_image,
      resume,
      user_id,
    );

    return response.status(201).send({
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    response.status(500).send({
      message: "Error while updating user",
      details: error.message,
    });
  }
};

const getUserById = async (request, response) => {
  const { user_id } = request.query;
  try {
    const user = await UserModel.getUserById(user_id);

    return response.status(200).send({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    response.status(500).send({
      message: "Error while fetching user",
      details: error.message,
    });
  }
};

module.exports = {
  updateExperience,
  updateEducation,
  updateProject,
  updateCertificate,
  updateUser,
  getUserById,
};
