import express from "express";
import { createProfile, selectProfile, updateProfile, userLogin } from "../controllers/profileController.js";
import { authVerify } from "../middleware/AuthVerify.js";
import { todoCreate, todoRemove, todoSelect, todoUpdate, todoUpdateStatus } from "../controllers/todoListController.js";

const router = express.Router()


router.post("/create", createProfile)
router.post("/login", userLogin)
router.get("/profile", authVerify, selectProfile)
router.post("/update", authVerify, updateProfile)
router.post("/createTodo", authVerify, todoCreate)
router.get("/selectTodo", authVerify, todoSelect)
router.post("/updateTodo", authVerify, todoUpdate)
router.post("/updateTodoStatus", authVerify, todoUpdateStatus )
router.post("/removeTodo", authVerify, todoRemove )
export default router