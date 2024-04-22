import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Email is not valid"
    ]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false
  },
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
    minlength: [3, "Fullname must be at least 3 characters long"],
    maxlength: [50, "Fullname must be at most 50 characters long"]
  },
  image: {
    type: String,
    default: 'https://res.cloudinary.com/dhbig9jt8/image/upload/v1713217544/no-avatar_axft7q.png'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// * If you want to use the same model name, you validate that the model exists before using it
const User = models.User || model('User', userSchema)

export default User