const CompanyModel = require("../model/CompanyModel");

const addCompanyQuestion = async (req, res) => {
  try {
    const { company_name, company_logo, skills } = req.body;
    const result = await CompanyModel.addCompanyQuestion(
      company_name,
      company_logo,
      skills,
    );
    return res
      .status(200)
      .json({ message: "Company question added successfully", result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCompanyQuestions = async (req, res) => {
  try {
    const { company_name, skills } = req.query;
    const result = await CompanyModel.getCompanyQuestions(company_name, skills);
    return res
      .status(200)
      .json({ message: "Company questions fetched successfully", result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCompanyQuestion = async (req, res) => {
  try {
    const { company_id } = req.params;
    const result = await CompanyModel.deleteCompanyQuestion(company_id);
    return res
      .status(200)
      .json({ message: "Company question deleted successfully", result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addToFavorite = async (req, res) => {
  try {
    const { company_id, user_id } = req.body;
    const result = await CompanyModel.addToFavorite(company_id, user_id);
    return res
      .status(200)
      .json({ message: "Company added to favorite successfully", result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeFromFavorite = async (req, res) => {
  try {
    const { company_id, user_id } = req.body;
    const result = await CompanyModel.removeFromFavorite(company_id, user_id);
    return res
      .status(200)
      .json({ message: "Company removed from favorite successfully", result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getFavoriteCompanies = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await CompanyModel.getFavoriteCompanies(user_id);
    return res
      .status(200)
      .json({ message: "Favorite companies fetched successfully", result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCompanyQuestion,
  getCompanyQuestions,
  deleteCompanyQuestion,
  addToFavorite,
  removeFromFavorite,
  getFavoriteCompanies,
};
