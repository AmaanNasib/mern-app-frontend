import { FiEdit, FiDelete, FiCheckCircle } from 'react-icons/fi';
const TaskList = ({val, ind, deleteTask, editTask, completedTask}) => {
  return (
    <div className={val.complete ? "task_list completed" : "task_list"}>
        <p>
          <b>{ind + 1}. </b>
           {val.name} 
        </p>
        <div className="task_icon">
          <FiCheckCircle color='green' onClick={() => {completedTask(val)}}/>
          <FiEdit color='#A435F0' onClick={() => {editTask(val)}}/>
          <FiDelete color='red' onClick={() => {deleteTask(val._id)}}/>
        </div>
    </div>
  )
}

export default TaskList