const Restaurant = require('./restaurant.model');

const createRestaurant = async (restaurantData) => {
  return Restaurant.create(restaurantData);
};

module.exports = {
  createRestaurant,
};