import "./App.scss"
import { useState } from 'react'

function App() {

  interface Task {
    id: number
    description: string
  }

  const [taskList, setTaskList]: [Array<Task>, Function] = useState([])

  function addTask() {
    const taskInput: HTMLInputElement = (document.querySelector("#TaskInput") as HTMLInputElement)
    if (taskInput.value != "") {
      const task: Task = {
        id: taskList.length,
        description: taskInput.value
      }
      const currentList = [...taskList, task]

      setTaskList(currentList)
      taskInput.value = ""
    }
  }

  function removeTask(taskId: number) {
    let currentList: Array<Task> = taskList.filter(task => task.id != taskId)
    currentList = currentList.map((value, index) => {
      return { id: index, description: value.description }
    })
    setTaskList(currentList)
  }

  function TaskElement(props: { id: number, description: string }) {
    return (
      <div className={"TaskElement"}>
        <div className={"TaskElement-text"}>
          <p>{props.description}</p>
        </div>
        <input type="checkbox" name="" id="" />
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
          {taskList.map(task => <li key={task.id}><TaskElement id={task.id} description={task.description} /></li>)}
        </ul>
      </div>
    </>
  )
}

export default App
