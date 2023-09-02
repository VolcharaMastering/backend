const mongoose = require('mongoose');
const validMail = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator(val) {
        return validMail.isEmail(val);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Minimum 6 characters'],
    select: false,
  },

  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Minimum 2 characters'],
    maxlength: [120, 'Maximum 120 characters'],
  },
});

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
