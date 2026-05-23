require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = require('../config/db');

const Restaurant = require('../modules/restaurants/restaurant.model');
const User = require('../modules/users/user.model');
const Follow = require('../modules/follows/follow.model');

const restaurantsSeed = require('./restaurants.seed');
const usersSeed = require('./users.seed');
const followsSeed = require('./follows.seed');

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Connected to MongoDB');

    // clear existing data
    await Follow.deleteMany();
    await Restaurant.deleteMany();
    await User.deleteMany();

    console.log('Existing data cleared');

    // seed restaurants
    const restaurants = await Restaurant.insertMany(
      restaurantsSeed
    );

    console.log('Restaurants seeded');

    // seed users
    const users = await User.insertMany(usersSeed);

    console.log('Users seeded');

    // create lookup maps
    const restaurantMap = {};
    const userMap = {};

    restaurants.forEach((restaurant) => {
      restaurantMap[restaurant.slug] = restaurant._id;
    });

    users.forEach((user) => {
      userMap[user.fullName] = user._id;
    });

    // prepare follows
    const follows = [];

    followsSeed.forEach((follow) => {
      const userId = userMap[follow.user];

      follow.restaurants.forEach((restaurantSlug) => {
        follows.push({
          user: userId,
          restaurant: restaurantMap[restaurantSlug],
        });
      });
    });

    // seed follows
    await Follow.insertMany(follows);

    console.log('Follows seeded');

    console.log('Database seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedDatabase();