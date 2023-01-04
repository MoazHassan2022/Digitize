const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب أن يمتلك المستخدم اسم"],
    trim: true, // Remove all the white space in the beginning or end of the field
    maxLength: [40, "يجب أن يحتوي اسم المستخدم على 40 حرفًا أو أقل"],
    minLength: [2, "يجب أن يحتوي اسم المستخدم على أكثر من أو يساوي 2 أحرف"],
  },
  email: {
    type: String,
    required: [true, "يجب أن يكون لدى المستخدم بريد إلكتروني"],
    unique: [true, "يجب أن يكون لدى المستخدم بريد إلكتروني فريد"],
    trim: true, // Remove all the white space in the beginning or end of the field
    lowercase: true,
    validate: [validator.isEmail, "يرجى تقديم عنوان بريد إلكتروني صالح"],
  },
  password: {
    type: String,
    required: [true, "يجب أن يكون لدى المستخدم كلمة مرور"],
    maxLength: [40, "يجب أن تحتوي كلمة مرور المستخدم على 40 حرفًا أو أقل"],
    minLength: [
      8,
      "يجب أن تحتوي كلمة مرور المستخدم على أكثر من أو يساوي 8 أحرف",
    ],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "يجب أن يكون لدى المستخدم كلمة مرور مؤكدة"],
    maxLength: [
      40,
      "يجب أن يحتوي تأكيد كلمة مرور المستخدم على 40 حرفًا أو أقل",
    ],
    minLength: [
      8,
      "يجب أن يحتوي تأكيد كلمة مرور المستخدم على أكثر من أو يساوي 8 أحرف",
    ],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "يجب أن يكون تأكيد كلمة المرور مساويًا لكلمة المرور الخاصة بك",
    },
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  isActive: {
    type: Boolean,
    default: 1,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: 0,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; // subtract 1 second to be older than the date of giving the token
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if(process.env.SEEDS != "YES")
    this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // We use passwordConfirm only to check that tge user didn't input different passwords then we don't need this
  next();
});

userSchema.pre(/^find/, async function (next) {
  // this poinst to current query
  this.find({ isActive: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (candidate, real) {
  return await bcrypt.compare(candidate, real);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt)
    return parseInt(this.passwordChangedAt.getTime() / 1000) > JWTTimestamp;
  return 0;
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes with millis
  console.log(this.passwordResetToken);
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
