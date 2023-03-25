const { User, Thought } = require('../models');

//How to update an existing user
const updateUser = async (req, res) => {
  try {
    let user = awate User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    console.log(user)
    !user
      ? res.status(404).json({ message: "That thought doesn't exist!" })
      : res.json(user)

  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
}

module.exports = {
  //get all of the users
  getUsers(req, res) {
    User.find({}).populate("thoughts", {
      thoughtText: 1,
      username: 1,
      createdAt: 1
    })
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then(newUser => {
        if (!newUser) {
          return res.status(400).json("The User wasn't created!")
        }
        res.json(newUser)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a singe user by ID
  getOneUser(req, res) {
    User.findOne({ _id: req.params.id }).populate("thoughts", {
      thoughtText: 1,
      username: 1,
      createdAt: 1
    })
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //Delete a specific user by an ID
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user with that ID" })
        }
        return Thought.deleteMany({ _id: { $in: user.thoughts } })
      })
      .then(() => res.json({ message: 'User deleted! ' }))
      .catch((err) => res.status(500).json(err));
  },


  //this will export updateUser function that used the async/await syntax
  updateUser
}
