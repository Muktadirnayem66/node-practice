import mongoose from "mongoose";

const todolistSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  todoName: {
    type: String,
  },
  todoDescription: {
    type: String,
  },
  todoStatus: {
    type: String,
  },
  todoCreateDate: {
    type: Date,
  },
  todoUpdateDate: {
    type: Date,
  },
});

export const todolistModel =
  mongoose.models.todolist || mongoose.model("todolist", todolistSchema);
