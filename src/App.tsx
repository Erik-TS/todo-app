import "./App.scss"
import { useState } from 'react'

function App() {

  interface Task {
    id: number
    description: string
    isDone: boolean
  }

  const [taskList, setTaskList]: [Array<Task>, Function] = useState([])

  function addTask() {
    const taskInput: HTMLInputElement = (document.querySelector("#TaskInput") as HTMLInputElement)
    if (taskInput.value != "") {
      const task: Task = {
        id: taskList.length,
        description: taskInput.value,
        isDone: false
      }
      const currentList = [...taskList, task]

      setTaskList(currentList)
      taskInput.value = ""
    }
  }

  function removeTask(taskId: number) {
    let currentList: Array<Task> = taskList.filter(task => task.id != taskId)
    currentList = currentList.map((value, index) => {
      return { id: index, description: value.description, isDone: value.isDone }
    })
    setTaskList(currentList)
  }

  function TaskElement(props: Task) {
    return (
      <div className={"TaskElement"}>
        <div className={props.isDone ? "TaskElementChecked-text" : "TaskElementUnchecked-text"}>
          <p>{props.description}</p>
        </div>
        <input checked={props.isDone ? true : false} onClick={(event) => {
          const isChecked = event.currentTarget.checked
          const updatedTask: Task = { id: props.id, description: props.description, isDone: isChecked }
          let updatedTaskList = [...taskList]
          updatedTaskList.splice(props.id, 1, updatedTask)

          setTaskList(updatedTaskList)

          /* if(isChecked) event.currentTarget.className = "TaskElementChecked-text"
          else event.currentTarget.className = "TaskElementUnchecked-text" */
        }} type="checkbox" name="" id="" />
        <input className={"RemoveButton"} onClick={() => removeTask(props.id)} type="button" value="Remove" />
      </div>
    )
  }

  return (
    <>
      <div className={"TaskFormContainer"}>
        <input type="text" name="" id="TaskInput" />
        <input className={"AddTaskButton"} onClick={addTask} type="button" value="Add Task" />
      </div>
      <div className={"TaskListContainer"}>
        <ul>
          {taskList.map(task => <li key={task.id}><TaskElement id={task.id} description={task.description} isDone={task.isDone} /></li>)}
        </ul>
      </div>
    </>
  )
}

export default App
