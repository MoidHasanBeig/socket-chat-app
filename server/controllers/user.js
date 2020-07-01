import User from '../models/User.js';

export default {
  onGetAllUsers: async (req, res) => { },
  onGetUserById: async (req, res) => { },
  onCreateUser: async (req, res) => {
    try {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type
      });

      newUser.save()
        .then(() => res.status(200).json('User added!'))
        .catch(err => res.status(400).json('Error:' + err));
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },
  onDeleteUserById: async (req, res) => { },
}
