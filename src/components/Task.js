import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Form from "./Form"
import TaskList from "./TaskList"
import axios from "axios"
// import { URL } from "../App"

const Task = () => {
    const URL = process.env.URL
  const [getTasks, setGetTasks] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    complete: false
  })

  const [editCheck, seteditCheck] = useState(false)
  const [taskId, setTaskId] = useState("")
  const [completedCount, setcompletedCount] = useState("")


  const {name} = formData

  const changeHandle = (e) =>{
    const {name, value} = e.target
    setFormData({...formData, [name]: value})

  }

  const getTask = async () =>{
    try {
      const {data} = await axios.get(`https://mern-app-api-jhym.onrender.com/api/tasks`);
      setGetTasks(data)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() =>{
    getTask()
  }, [])


  const editTask = async (val) =>{
    setFormData({
      name: val.name,
      complete: false
    })
    seteditCheck(true)
    setTaskId(val._id)
  }

  const updateTask = async (e) =>{
    e.preventDefault()

    if(name === ""){
      toast.error("Input is empty")
    }

    try {
      console.log(taskId)
      await axios.put(`https://mern-app-api-jhym.onrender.com/api/tasks/${taskId}`, formData)
      setFormData({...formData, name:""})
      seteditCheck(false)
      getTask()
      // toast.success("Data Edit")

    } catch (error) {
      toast.error(error.message)
    }
  }


  const completedTask = async (val) =>{
    const newFormData = {
      name: val.name,
      complete: true
    }
    try {
      const valid = val._id
      console.log(`https://mern-app-api-jhym.onrender.com/api/tasks/${valid}`)
      await axios.put(`https://mern-app-api-jhym.onrender.com/api/tasks/${valid}`, newFormData)
      getTask()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://mern-app-api-jhym.onrender.com/api/tasks/${id}`)
      getTask()
    } catch (error) {
      toast.error(error.message)
    }
  }
  const createTask = async (e) =>{
    e.preventDefault()
    if (name === '') {
      return toast.error("Input field is empty")
    }
    try {
      await axios.post(`https://mern-app-api-jhym.onrender.com/api/tasks`, formData)
      setFormData({...formData, name: ""})
      toast.success("Data Inserted")
      getTask()


    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    const ctask = getTasks.filter((task) => {
      return task.complete === true
    })
    setcompletedCount(ctask)
  }, [getTasks])
  return (
    <div >
        <h1>Task Manger</h1>
        <Form changeHandle={changeHandle} createTask={createTask} name={name} editCheck={editCheck} updateTask={updateTask}/>
        <div className="record">
          <p><b>Total Tasks: </b>{getTasks.length}</p>
          <p><b>Completed Tasks: </b>{
            completedCount.length
          }</p>
        </div>
        <hr></hr>
        {
          getTasks.map((val, ind) => {
            return(
              <TaskList key={val._id} val= {val} ind={ind} deleteTask={deleteTask} editTask={editTask} completedTask={completedTask}/>
            )
          })
        }
    </div>
  )
}

export default Task
