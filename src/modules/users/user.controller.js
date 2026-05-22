const { createUser } = require('./user.service');
const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../utils/response');

const createUserController = asyncHandler(async (req, res) => {
  const user = await createUser(req.body);

  sendSuccess(res, 201, 'User created successfully', user);
});

module.exports = {
  createUserController,
};