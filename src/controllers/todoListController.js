import { todolistModel } from "../models/ToDoListModel.js";

const todoCreate = async (req, res) => {
  try {
    let userName = req.headers["userName"]
    let todoName = req.body["todoName"];
    let todoDescription = req.body["todoDescription"];
    let todoStatus = "New";
    let todoCreateDate = Date.now();
    let todoUpdateDate = Date.now();

    const postBody = {
      userName,
      todoName,
      todoDescription,
      todoStatus,
      todoCreateDate,
      todoUpdateDate,
    };

    const todo = await todolistModel.create(postBody);

    res.status(201).json({ success: true, message: todo });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

const todoSelect = async (req, res) => {
  try {
    const userName = req.headers.userName;
    const todo = await todolistModel.find({ userName });
    if (!todo) {
      res.status(400).json({ success: false, message: "todo not found" });
    } else {
      res.status(201).json({ success: true, message: todo });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

const todoUpdate = async (req, res) => {
  try {
    const _id = req.body._id;
    const todoName = req.body.todoName;
    const todoDescription = req.body.todoDescription;
    let todoUpdateDate = Date.now();

    const postBody = {
      todoName,
      todoDescription,
      todoUpdateDate,
    };
    let todo = await todolistModel.findByIdAndUpdate(_id, { $set: postBody });

    if (!todo) {
      res.status(400).json({ success: false, message: "todo not found" });
    } else {
      res.status(201).json({ success: true, message: todo });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

const todoUpdateStatus = async (req, res) => {
  try {
    const _id = req.body["_id"];
    const todoStatus = req.body.todoStatus;
    let todoUpdateDate = Date.now();
    const postBody = {
      todoStatus,
      todoUpdateDate,
    };

    let todo = await todolistModel.updateOne({ _id }, { $set: postBody });

    if (!todo) {
      res.status(400).json({ success: false, message: "todo not found" });
    } else {
      res.status(201).json({ success: true, message: todo });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

const todoRemove = async (req, res) => {
  try {
    const _id = req.body._id;
    const result = await todolistModel.deleteOne({ _id });
    if (result.deletedCount === 0) {
      res.status(400).json({ success: false, message: "todo not found" });
    } else {
      res
        .status(201)
        .json({ success: true, message: "todo deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

export { todoCreate, todoSelect, todoUpdate, todoUpdateStatus, todoRemove };
