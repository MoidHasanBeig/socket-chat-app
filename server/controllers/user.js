import User from '../models/User.js';

export default {
  onGetAllUsers: async (req, res) => {
    try {
      await User.find({}, function(error,users) {
        if(error) {
          res.status(400).json('Error:' + error);
        } else {
          if (users) {
            res.status(200).json(users);
          } else {
            res.status(400).json('No user found');
          }
        }
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },
  onGetUserById: async (req, res) => {
    try {
      await User.findById(req.params.id, function(error,user) {
        if(error) {
          res.status(400).json('Error:' + error);
        } else {
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(400).json('No user found');
          }
        }
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },
  onCreateUser: async (req, res) => {
    try {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type
      });

      await newUser.save()
        .then(() => res.status(200).json('User added!'))
        .catch(error => res.status(400).json('Error:' + error));
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id, function(error) {
        if (error) {
          res.status(400).json('Error:' + error);
        } else {
          res.status(200).json('User deleted!');
        }
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },
}
