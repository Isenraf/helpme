// const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide your phonr number'],
    unique: true
  },
  photo: String,
  address: {
    type: String,
    required: [true, 'A user must have an address']
  },
  role: {
    type: String,
    enum: ['headOfStaff', 'prospector', 'collector', 'watchdog', 'admin'],
    default: 'prospector'
  },
  town: {
    type: mongoose.Schema.ObjectId,
    ref: 'Town'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // Only works on SAVE and CREATE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not they same'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product'
    }
  ],
  returns: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Return'
    }
  ],
  accounts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Account'
    }
  ]
});

userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // hash the password with cist of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete passwordConfirm
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.pre(/^find/, function(next) {
  this.populate({ path: 'town', select: 'name region' });
  next();
});

// instance methods
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // false means not changed
  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
