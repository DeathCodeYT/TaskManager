const allTasksDOM = document.getElementById('allTasks')
const loadingDOM = document.getElementById('loading')
const formAlertDOM = document.getElementById('formAlert')
const formInputDOM = document.getElementById('task')
const createBtn = document.getElementById('create')


const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const { data:{tasks} } = await axios.get('/api/v1/tasks')
    console.log(tasks)
    if (tasks.length < 1) {
      allTasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = tasks.map((task) => {
      const { complete, _id: taskID, name } = task
      let com=''
      if(!complete){
        com = 'inComplete'
      }else{
        com = 'complete'
      }
      return `<div class="task">
      <div id="taskFront">
          <i id="complete" class="fa-sharp fa-solid fa-circle-check ${com}"></i>
          <span id="taskName">${name}</span>
      </div>
      <div class="icon">
          <a href="/taskEdit.html?id=${taskID}">
          <i id="1-edit" class="fa-regular fa-pen-to-square editIcon"></i></a>
          <i id="${taskID}" class="fa-solid fa-trash-can delete"></i>
      </div>
  </div>`
    }).join('')
    allTasksDOM.innerHTML = allTasks
    loadingDOM.style.visibility = 'hidden'
  } catch (error) {
    allTasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
}

showTasks()

allTasksDOM.addEventListener('click',async (e)=>{
  const el = e.target
  if(el.getAttribute('class').includes('delete')){
    console.log("delete")
    loadingDOM.style.visibility = 'visible'
    const id = el.id
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

createBtn.addEventListener('click',async (e)=>{
  e.preventDefault()
  const name = formInputDOM.value
  try {
    await axios.post('/api/v1/tasks', { name })
    showTasks()
    formInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `Task added successfully`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `Error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})


