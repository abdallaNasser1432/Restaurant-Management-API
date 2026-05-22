const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      ar: {
        type: String,
        required: true,
        trim: true,
      },
      en: {
        type: String,
        required: true,
        trim: true,
      },
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    cuisines: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return value.length >= 1 && value.length <= 3;
        },
        message: 'Restaurant must have between 1 and 3 cuisines',
      },
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

restaurantSchema.index({ location: '2dsphere' });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;