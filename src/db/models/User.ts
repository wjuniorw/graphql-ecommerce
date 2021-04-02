import mongoose from '../connections'

const { Schema } = mongoose

const UserSchema = new Schema({
  name: String,
  email: String,
  role: String,
  password: { type: String, select: false }
},
{
  timestamps: true,
})

const User = mongoose.model(
  'User', UserSchema
)

export default User
