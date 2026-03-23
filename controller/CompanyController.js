const CompanyModel = require("../model/CompanyModel");

const addCompanyQuestion = async (req, res) => {
  try {
    const {
      company_id,
      company_name,
      company_logo,
      skills,
      created_date,
      attachment_title,
      attachment,
    } = req.body;
    const result = await CompanyModel.addCompanyQuestions(
      company_id,
      company_name,
      company_logo,
      skills,
      created_date,
      attachment_title,
      attachment,
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
    const { company_id } = req.query;
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
    const { company_id, user_id } = req.query;
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

const addCategory = async (req, res) => {
  try {
    const { category_id, category_name } = req.body;
    const result = await CompanyModel.addCategory(category_id, category_name);
    return res
      .status(200)
      .json({ message: "Category added successfully", data: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const { category_name } = req.query;
    const result = await CompanyModel.getCategory(category_name);
    return res
      .status(200)
      .json({ message: "Category fetched successfully", result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { category_id } = req.query;
    const result = await CompanyModel.deleteCategory(category_id);
    return res
      .status(200)
      .json({ message: "Category deleted successfully", result });
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
  addCategory,
  getCategory,
  deleteCategory,
};
