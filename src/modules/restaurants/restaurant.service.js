const Restaurant = require('./restaurant.model');
const ApiError = require('../../utils/ApiError');

const normalizeRestaurantData = (restaurantData) => {
  return {
    ...restaurantData,
    slug: restaurantData.slug.toLowerCase().trim(),
    cuisines: restaurantData.cuisines.map((cuisine) => cuisine.trim()),
    location: {
      type: 'Point',
      coordinates: restaurantData.location.coordinates.map(Number),
    },
  };
};

const createRestaurant = async (restaurantData) => {
  const normalizedData = normalizeRestaurantData(restaurantData);

  const existingRestaurant = await Restaurant.findOne({
    slug: normalizedData.slug,
  });

  if (existingRestaurant) {
    throw new ApiError(409, 'Restaurant slug already exists');
  }

  return Restaurant.create(normalizedData);
};

module.exports = {
  createRestaurant,
};