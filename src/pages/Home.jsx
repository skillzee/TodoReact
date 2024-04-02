import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main'
import toast from 'react-hot-toast'
import TodoItem from '../components/TodoItem'
import { Navigate } from 'react-router-dom'

function Home() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [laoding, setLoading] = useState(false)
  const [tasks, settasks] = useState([])
  const [refresh, setrefresh] = useState(false)
  const {isAuthenticated} = useContext(Context)


  const updateHandler = async (id)=>{
    try {
      const {data} = await axios.put(`${server}/tasks/${id}`,{},{
        withCredentials: true
      })
      toast.success(data.message)
      setrefresh(prev=>!prev)

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const deleteHandler = async(id)=>{
      try {
        const {data} = await axios.delete(`${server}/tasks/${id}`,{
          withCredentials: true
        })
        toast.success(data.message)
        setrefresh(prev=>!prev)
      } catch (error) {
        toast.error(error.response.data.message)

      }
    }
  

  const submitHandler = async(e)=>{
    e.preventDefault()

    try {
      setLoading(true)
      const {data} = await axios.post(`${server}/tasks/new`, {
        title,
        description
      },{
        withCredentials:true,
        headers:{
          "Content-Type": "application/json"
        }
      })

      toast.success(data.message)
      setLoading(false)
      setTitle("")
      setDescription("")
      setrefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }



  useEffect(()=>{
    axios.get(`${server}/tasks/my`,{
      withCredentials:true
    }).then(res=>{
      settasks(res.data.tasks)
    }).catch(error=>{
      toast.error(error.response.data.message)
    })
  }, [refresh])


  if(!isAuthenticated) return <Navigate to={"/login"}/>


  return (
    <div className='container'>
      <div className="login">
        <section>
            <form onSubmit={submitHandler}>
            <input
                value={title} onChange={(e)=>setTitle(e.target.value)}
                type="text" placeholder='Title' required />
            <input
                value={description} onChange={(e)=>setDescription(e.target.value)}
                type="text" placeholder='Description' required />
                <button disabled={laoding} type='submit'>Add Task</button>

        
            </form>
        </section>
    </div>
      <section className="todosContainer">
    {
      tasks.map(i=>(
        <TodoItem title={i.title} descriprition={i.description} isCompleted ={i.isCompleted} updateHandler = {updateHandler} deleteHandler = {deleteHandler}
        id={i._id}
        key={i._id}/>
      ))
    }
      </section>
    </div>
  )
}

export default Home