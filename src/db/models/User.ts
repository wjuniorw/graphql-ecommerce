import mongoose from '../connections'

const { Schema, model } = mongoose

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    role: String,
    password: { type: String, select: false },
  },
  {
    timestamps: true,
  }
)

const User = model('User', UserSchema)

export default User
