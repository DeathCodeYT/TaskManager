const Task = require('../model/Task')
const { asyncWrapper } = require('../middleware/async-Wrapper')
const {createCustomError} = require('../errors/custom-error')


const getAllTask = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(201).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {

    const task = await Task.create(req.body)
    res.status(201).json({ task })

})
const getTask = asyncWrapper(async (req, res, next) => {

    const { id: TASK_ID } = req.params
    const task = await Task.findOne({ _id: TASK_ID })
    if (!task) {
        return next(createCustomError(404,`No Task with id : ${TASK_ID}`))
    }
    res.status(201).json({ task })

})
const updateTask = asyncWrapper(async (req, res, next) => {

    const { id: TASK_ID } = req.params
    const task = await Task.findOneAndUpdate({ _id: TASK_ID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomError(404,`No Task with id : ${TASK_ID}`))
    }
    res.status(201).json({ task })

})
const deleteTask = asyncWrapper(async (req, res, next) => {

    const { id: TASK_ID } = req.params
    const task = await Task.findOneAndDelete({ _id: TASK_ID })
    if (!task) {
        return next(createCustomError(404,`No Task with id : ${TASK_ID}`))
    }
    res.status(201).json({ task })

})

module.exports = {
    getAllTask,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}