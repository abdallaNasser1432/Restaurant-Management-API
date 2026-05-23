jest.mock('../../src/modules/users/user.model', () => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findOne: jest.fn(),
}));

const User = require('../../src/modules/users/user.model');
const userService = require('../../src/modules/users/user.service');
const ApiError = require('../../src/utils/ApiError');

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should trim fullName and favorite cuisines before creating user', async () => {
      const userData = {
        fullName: '  Abdalla Nasser  ',
        favoriteCuisines: [' Asian ', ' Burgers '],
      };

      const createdUser = {
        _id: '665f4b7c2f1a9c0012a54321',
        fullName: 'Abdalla Nasser',
        favoriteCuisines: ['Asian', 'Burgers'],
      };

      User.create.mockResolvedValue(createdUser);

      const result = await userService.createUser(userData);

      expect(User.create).toHaveBeenCalledWith({
        fullName: 'Abdalla Nasser',
        favoriteCuisines: ['Asian', 'Burgers'],
      });

      expect(result).toEqual(createdUser);
    });
  });

  describe('getUsers', () => {
    it('should return users sorted by newest first', async () => {
      const users = [
        {
          _id: '665f4b7c2f1a9c0012a54321',
          fullName: 'Abdalla Nasser',
          favoriteCuisines: ['Asian'],
        },
      ];

      const sortMock = jest.fn().mockResolvedValue(users);
      User.find.mockReturnValue({ sort: sortMock });

      const result = await userService.getUsers();

      expect(User.find).toHaveBeenCalled();
      expect(sortMock).toHaveBeenCalledWith({ createdAt: -1 });
      expect(result).toEqual(users);
    });
  });

  describe('getUserByIdentifier', () => {
    it('should find user by MongoDB ObjectId', async () => {
      const userId = '665f4b7c2f1a9c0012a54321';

      const user = {
        _id: userId,
        fullName: 'Abdalla Nasser',
        favoriteCuisines: ['Asian', 'Burgers'],
      };

      User.findById.mockResolvedValue(user);

      const result = await userService.getUserByIdentifier(userId);

      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(User.findOne).not.toHaveBeenCalled();
      expect(result).toEqual(user);
    });

    it('should find user by fullName when identifier is not ObjectId', async () => {
      const fullName = 'Abdalla Nasser';

      const user = {
        _id: '665f4b7c2f1a9c0012a54321',
        fullName,
        favoriteCuisines: ['Asian', 'Burgers'],
      };

      User.findOne.mockResolvedValue(user);

      const result = await userService.getUserByIdentifier(fullName);

      expect(User.findOne).toHaveBeenCalledWith({
        fullName: {
          $regex: `^${fullName}$`,
          $options: 'i',
        },
      });

      expect(User.findById).not.toHaveBeenCalled();
      expect(result).toEqual(user);
    });

    it('should throw ApiError when user is not found', async () => {
      const fullName = 'Unknown User';

      User.findOne.mockResolvedValue(null);

      await expect(
        userService.getUserByIdentifier(fullName)
      ).rejects.toThrow(ApiError);

      await expect(
        userService.getUserByIdentifier(fullName)
      ).rejects.toMatchObject({
        statusCode: 404,
        message: 'User not found',
      });
    });
  });
});