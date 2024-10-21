import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
});

const profileModel =
  mongoose.models.profile || mongoose.model("profile", profileSchema);
export default profileModel;
