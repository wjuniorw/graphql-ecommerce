import mongoose from '../connections'

const { Schema } = mongoose
const UserSchema = new Schema({
  name: String,
  email: String,
  admin: Boolean,
  password: { type: String }
},
{
  timestamps: true,
})

const User = mongoose.model(
  'User', UserSchema
)

export default User
