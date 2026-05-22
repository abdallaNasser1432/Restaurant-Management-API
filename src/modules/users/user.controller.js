const { createUser,getUsers,getUserByIdentifier  } = require('./user.service');
const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../utils/response');

const createUserController = asyncHandler(async (req, res) => {
  const user = await createUser(req.body);

  sendSuccess(res, 201, 'User created successfully', user);
});

const getUsersController = asyncHandler(async (req, res) => {
  const users = await getUsers();

  sendSuccess(res, 200, 'Users fetched successfully', users);
});

const getUserByIdentifierController = asyncHandler(
  async (req, res) => {
    const user = await getUserByIdentifier(
      req.params.identifier
    );

    sendSuccess(res, 200, 'User fetched successfully', user);
  }
);

module.exports = {
  createUserController,
  getUsersController,
  getUserByIdentifierController,
};