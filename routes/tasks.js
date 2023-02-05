const express = require("express")
const {getAllTask,createTask,getTask,updateTask,deleteTask} = require('../controller/tasks')
const routes = express.Router()

routes.route('/').get(getAllTask).post(createTask);
routes.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)


module.exports = routes