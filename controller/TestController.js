const { request, response } = require("express");
const TestModel = require("../model/TestModel");

const createTopic = async (request, response) => {
  const { topic_id, topic_name, created_date } = request.body;
  try {
    const result = await TestModel.createTopic(
      topic_id,
      topic_name,
      created_date,
    );

    return response.status(201).send({
      message: "Topic updated successfully",
      data: result,
    });
  } catch (error) {
    response.status(500).send({
      message: "Error while updating topic",
      details: error.message,
    });
  }
};

const createTest = async (request, response) => {
  const { test_id, topic_id, test_name, created_date } = request.body;
  try {
    const result = await TestModel.createTest(
      test_id,
      topic_id,
      test_name,
      created_date,
    );

    return response.status(201).send({
      message: "Test updated successfully",
      data: result,
    });
  } catch (error) {
    response.status(500).send({
      message: "Error while updating test",
      details: error.message,
    });
  }
};
module.exports = {
  createTopic,
  createTest,
};
