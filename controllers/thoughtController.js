const {
  Thought,
  User,
  Reaction
} = require('../models');

// TODO: Create a new post
const postThoughts = async (req, res) => {
  try {
    let newThought = await Thought.create(req.body)
    let user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: newThought._id } },
      { new: true }
    );
    return res.json(newThought)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Update to a new post
const updateThought = async (req, res) => {
  try {
    let thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    !thought
      ? res.statuse(404).json({ message: "That thought doesn't exist!" })
      : res.json(thought)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
}

// Get all of the posts
function getThoughts(req, res) {
  Thought.find()
    .then((thoughts) => {
      return res.json(thoughts);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

// Getting a specific post
function getOneThought(req, res) {
  Thought.findOne({
    _id: req.params.id
  })
    .then((thoughts) => {
      return res.json(thoughts);
    })
    .catch((err) => {
      console.log(err):
      return res.status(500).json(err);
    });
}

// Delete a post
function deleteThought(req, res) {
  Thought.findOneAndDelete({
    _id: req.params.id
  })
    .then((thought) =>
      !thought ?
        res.status(404).json({
          message: 'No thought with that ID'
        }) :
        User.deleteMany({
          _id: {
            $in: thought.User
          }
        })
    )
    .then(() => res.json({
      message: 'Thought is Deleted!'
    }))
    .catch((err) => res.status(500).json(err));
}
// Reactions are a sin
function deleteReaction(req, res) {
  console.log(req.params.id)
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.id } } },
  )
    .then((reaction) =>
      !reaction ?
        res.status(404).json({
          message: 'No reaction with that ID'
        }) :
        Thought.deleteMany({
          _id: {
            $in: reaction.Reaction
          }
        })
    )
    .then(() => res.json({
      messsage: 'Reaction is deleted!'
    }))
    .catch((err) => res.status(500));
}

// Reactions are a sin against nature
function getReaction(req, res) {
  Reaction.find()
    .then((reactions) => {
      return res.json(reactions);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

// Reactions are the worst
const createReaction = async (req, res) => {
  try {
    let newReaction = await Reaction.create(req.body)
    let user = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reactions: newReaction } },
      { new: true }
    );
    console.log(newReaction)
    return res.json(newReaction)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  postThoughts,
  getThoughts,
  getOneThought,
  deleteThought,
  updateThought,
  getReaction,
  createReaction,
  deleteReaction
}
