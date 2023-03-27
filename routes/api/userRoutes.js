
const {
    getUsers,
    createUser,
    getOneUser,
    deleteUser,
    updateUser
} = require('../../controllers/userController');
const router = require('express').Router();

//GET /api/users
router.route('/').get(getUsers)
router.route('/:id').get(getOneUser)
router.route('/').post(createUser)
router.route('/:id').delete(deleteUser)
router.route('/:id').put(updateUser)

module.exports = router;