const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId(),
      default: () => new Types.ObjectId(),
    },
    reactionText: {
      type: String,
      require: true,
      minlength: 1,
      maslength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
  }, {
  toJson: {
    getters: true,
  },
});

module.exports = reactionSchema;
