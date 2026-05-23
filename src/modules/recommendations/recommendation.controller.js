const {
  getRestaurantRecommendations,
} = require('./recommendation.service');

const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../utils/response');

const getRestaurantRecommendationsController = asyncHandler(
  async (req, res) => {
    const recommendations =
      await getRestaurantRecommendations(req.params.userId);

    sendSuccess(
      res,
      200,
      'Restaurant recommendations fetched successfully',
      recommendations
    );
  }
);

module.exports = {
  getRestaurantRecommendationsController,
};