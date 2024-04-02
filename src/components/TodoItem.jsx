import React from 'react'

const TodoItem = ({title, descriprition,isCompleted, updateHandler, deleteHandler,id}) =>{
  return (
    <div className='todo'>
        <div>
            <h4>{title}</h4>
            <p>{descriprition}</p>
        </div>
        <div>
            <input onChange={()=>updateHandler(id)} type="checkBox" checked={isCompleted} />
            <button onClick={()=>deleteHandler(id)} className='btn'>Delete</button>
        </div>
    </div>
  )
}

export default TodoItem