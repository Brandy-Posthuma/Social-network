const {
  postThoughts,
  getThoughts,
  getOneThought,
  deleteThought,
  updateThought,
  getReaction,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');
const router = require('express').Router();

//GET /api/thoughts
router.route('/').post(postThoughts)
router.route('/:id').get(getOneThought)
router.route('/').get(getThoughts)
router.route('/:id').delete(deleteThought)
router.route('/:id').put(updateThought)
router.route('/:id/reaction').post(createReaction)
router.route('/:id/reaction').get(getReaction)
router.route('/:thoughtId/reaction/:id').delete(deleteReaction)

module.exports = router;