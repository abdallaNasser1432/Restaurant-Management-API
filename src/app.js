const express = require('express');
const notFound = require('./middlewares/notFound.middleware');
const errorHandler = require('./middlewares/error.middleware');

const restaurantRoutes = require('./modules/restaurants/restaurant.routes');
const userRoutes = require('./modules/users/user.routes');
const followRoutes = require('./modules/follows/follow.routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Restaurant Management API is running',
  });
});

// API Routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/follows', followRoutes);


app.use(notFound);
app.use(errorHandler);

module.exports = app;