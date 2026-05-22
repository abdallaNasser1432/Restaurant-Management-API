const mongoose = require('mongoose');
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

const getRestaurants = async (filters) => {
  const query = {};

  if (filters.cuisine) {
    query.cuisines = {
      $regex: `^${filters.cuisine}$`,
      $options: 'i',
    };
  }

  return Restaurant.find(query).sort({ createdAt: -1 });
};

const getRestaurantByIdentifier = async (identifier) => {
  let restaurant;

  if (mongoose.Types.ObjectId.isValid(identifier)) {
    restaurant = await Restaurant.findById(identifier);
  } else {
    restaurant = await Restaurant.findOne({
      slug: identifier.toLowerCase(),
    });
  }

  if (!restaurant) {
    throw new ApiError(404, 'Restaurant not found');
  }

  return restaurant;
};

const getNearbyRestaurants = async ({ lng, lat }) => {
  const longitude = Number(lng);
  const latitude = Number(lat);

  return Restaurant.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: 1000, // 1KM in meters
      },
    },
  });
};

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantByIdentifier,
  getNearbyRestaurants,
};