const express = require("express")

const router = express.Router()

const Task = require('../models/Task')

const {createTask,getSingleTask,getAllTasks,updateTask,deleteTask} = require('../controllers/task.controllers')

router.post('/tasks',createTask)

router.get('/tasks',getAllTasks)

router.get('/tasks/:taskId',getSingleTask)

router.put("/tasks/:taskId",updateTask)

router.delete("/tasks/:taskId",deleteTask)

module.exports = router