const express = require('express');
const cors = require('cors');
const notFound = require('./middlewares/notFound.middleware');
const errorHandler = require('./middlewares/error.middleware');

const restaurantRoutes = require('./modules/restaurants/restaurant.routes');
const userRoutes = require('./modules/users/user.routes');
const followRoutes = require('./modules/follows/follow.routes');
const recommendationRoutes = require('./modules/recommendations/recommendation.routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

// swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

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
app.use('/api/recommendations', recommendationRoutes);


app.use(notFound);
app.use(errorHandler);

module.exports = app;