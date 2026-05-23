const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

followSchema.index(
  { user: 1, restaurant: 1 },
  { unique: true }
);

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;