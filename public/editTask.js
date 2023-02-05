
const params = window.location.search
const id = new URLSearchParams(params).get('id')
const taskID = document.querySelector('.taskID')
const taskNameDOM = document.getElementById('task')
const taskCompletedDOM = document.getElementById('checkComplete')
const editBtn = document.getElementById('editBtn')
const formAlert = document.getElementById('formAlert')

let tempName
taskID.textContent = id

const showTask = async () => {
    try {
        const {
            data: { task },
        } = await axios.get(`/api/v1/tasks/${id}`)
        const { _id: taskID, complete, name } = task
        taskID.textContent = taskID
        taskNameDOM.value = name
        tempName = name
        if (complete) {
            taskCompletedDOM.checked = true
        }
    } catch (error) {
        console.log(error)
    }
}

showTask()

editBtn.addEventListener('click', async (e) => {
    editBtn.textContent = 'Loading...'
    e.preventDefault()
    try {
        const taskName = taskNameDOM.value
        const taskCompleted = taskCompletedDOM.checked
        const { data: { task } } = await axios.patch(`/api/v1/tasks/${id}`, { name: taskName, complete: taskCompleted })
        const { _id: taskID, complete, name } = task
        taskID.textContent = taskID
        taskNameDOM.value = name
        tempName = name
        if (complete) {
            taskCompletedDOM.checked = true
        }
        formAlert.style.display = 'block'
        formAlert.textContent = `Success, Task edited`
        formAlert.classList.add('text-success')
    } catch (error) {
        console.error(error)
        taskNameDOM.value = tempName
        formAlert.style.display = 'block'
        formAlert.innerHTML = `Error, Please try again`
    }
    editBtn.textContent = 'Edit'
    setTimeout(() => {
        formAlert.style.display = 'none'
        formAlert.classList.remove('text-success')
    }, 3000)
})



