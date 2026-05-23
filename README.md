# Restaurant Management API

Robust RESTful API for restaurant discovery and personalized recommendations, built with Node.js, Express, MongoDB, and Mongoose.

The API provides modular workflows for restaurant management, user profiles, follow relationships, nearby search using geospatial queries, and recommendation generation through MongoDB aggregation pipelines.

## Features

- Restaurant management: create restaurants, list restaurants, and fetch by id or slug.
- Nearby search: find restaurants within 1 km using MongoDB geospatial queries.
- User management: create users, list users, and fetch by id or full name.
- Follow system: users can follow restaurants (duplicate follows are prevented).
- Recommendation engine: MongoDB aggregation pipeline returns matched users and recommended restaurants.
- Swagger documentation available at `/api-docs`.
- Input validation on body, params, and query values with `express-validator`.
- Unified success/error response format.
- Seed script to populate sample restaurants, users, and follow relations.
- Unit tests with Jest (User service coverage).

## Tech Stack

- Node.js
- Express 5
- MongoDB
- Mongoose
- Docker

## Project Structure

```text
src/
  app.js
  server.js
  config/
  middlewares/
  modules/
    restaurants/
    users/
    follows/
    recommendations/
  seeds/
  utils/
tests/
  unit/
```

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- MongoDB 7+ (for local run)
- Docker Desktop + Docker Compose (for containerized run)

### Option A) Run with Docker

1. Clone the repository:

```bash
git clone https://github.com/abdallaNasser1432/Restaurant-Management-API
cd Restaurant-Management-API
```

2. Build and start services:

```bash
docker compose up --build
```

3. API will be available at:

```text
http://localhost:3000
```

4. Swagger docs:

```text
http://localhost:3000/api-docs
```

Notes:

- `mongo` container is mapped to host port `27018`.
- `seed` service runs once (`npm run seed`) and exits.
- To rerun seeding manually:

```bash
docker compose run --rm seed
```

### Option B) Run Locally

1. Clone the repository:

```bash
git clone https://github.com/abdallaNasser1432/Restaurant-Management-API
cd Restaurant-Management-API
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` from `.env.example`:

Bash:

```bash
cp .env.example .env
```

4. Start MongoDB locally, then verify `MONGODB_URI` in `.env`.

5. (Optional) Seed sample data:

```bash
npm run seed
```

6. Run the server:

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## Configuration

Create `.env` based on `.env.example`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/restaurant_management
NODE_ENV=development
```

### Environment Variables

| Variable      | Required | Description                                                     |
| ------------- | -------- | --------------------------------------------------------------- |
| `PORT`        | No       | API port (default `3000`)                                       |
| `MONGODB_URI` | Yes      | MongoDB connection URI                                          |
| `NODE_ENV`    | No       | Environment mode (`development` enables stack traces in errors) |

## Available Scripts

| Script               | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `npm start`          | Start API with Node                                  |
| `npm run dev`        | Start API with nodemon                               |
| `npm run seed`       | Clear DB and insert sample restaurants/users/follows |
| `npm test`           | Run Jest tests                                       |
| `npm run test:watch` | Run Jest in watch mode                               |

## API Documentation

Swagger UI is available at:

```text
http://localhost:3000/api-docs
```

Base API URL:

```text
http://localhost:3000/api
```

## Endpoint Overview

### System

- `GET /`

### Restaurants

- `POST /api/restaurants`
- `GET /api/restaurants`
- `GET /api/restaurants/:identifier`
- `GET /api/restaurants/nearby?lng=31.2357&lat=30.0444`

Validation rules:

- `slug` must be lowercase letters, numbers, and hyphens.
- `cuisines` must contain 1 to 3 items.
- `location.coordinates` must be `[longitude, latitude]`.

### Users

- `POST /api/users`
- `GET /api/users`
- `GET /api/users/:identifier`

Validation rules:

- `fullName` is required.
- `favoriteCuisines` must be a non-empty string array.

### Follows

- `POST /api/follows`
- `GET /api/follows/users/:userId/restaurants`
- `GET /api/follows/restaurants/:identifier/users`

Validation rules:

- `userId` and `restaurantId` must be valid MongoDB ObjectIds.
- duplicate follow relation is rejected (`409`).

### Recommendations

- `GET /api/recommendations/users/:userId/restaurants`

Aggregation flow:

1. Find users sharing favorite cuisines with the target user.
2. Aggregate restaurants followed by those matched users.
3. Return both arrays in one response.

## Example Requests

Create restaurant:

```http
POST /api/restaurants
Content-Type: application/json

{
  "name": {
    "ar": "KFC",
    "en": "KFC"
  },
  "slug": "kfc",
  "cuisines": ["Fried", "Burgers"],
  "location": {
    "type": "Point",
    "coordinates": [31.2357, 30.0444]
  }
}
```

Get recommendations:

```http
GET /api/recommendations/users/665f4b7c2f1a9c0012a54321/restaurants
```

## Response Format

Success:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "fullName",
      "message": "Full name is required"
    }
  ]
}
```

## Testing

Run tests:

```bash
npm test
```

Current tests focus on `User` service behavior (normalization, query behavior, and not-found handling).

## Data and Indexing Notes

- Restaurant `location` has a `2dsphere` index for geospatial queries.
- Follow relationship has a unique compound index on `{ user, restaurant }`.
- Seed script clears existing data before insertion.

## Troubleshooting

1. MongoDB connection fails:
   - check `MONGODB_URI`.
   - confirm MongoDB is running.
2. Nearby search returns no results:
   - verify coordinate order is `[lng, lat]`.
3. Duplicate resource errors (`409`):
   - restaurant slug already exists, or user already follows the restaurant.
