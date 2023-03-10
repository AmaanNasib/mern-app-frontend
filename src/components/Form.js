import React from 'react'

const Form = ({name, changeHandle, createTask, editCheck, updateTask}) => {
  return (
    <form className='task_form' onSubmit={editCheck ? updateTask : createTask}>
      <input  type="text" placeholder='Add Task' name="name" value={name} onChange={changeHandle}/>
      <button type='submit'>{editCheck ? "Edit" : "Add"}</button>
    </form>
  )
}

export default Form