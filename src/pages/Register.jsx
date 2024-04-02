import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../main'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { Context } from '../main'


function Register() {

    const [name, setName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const {isAuthenticated, setisAuthenticated, loading, setLoading } = useContext(Context);

    const submitHandler = async (e)=>{
        e.preventDefault();
        setLoading(true);
    
        try {
            const {data} = await axios.post(`${server}/users/new`, {
                name, email, password
            },{
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
    
            toast.success(data.message)
            setisAuthenticated(true)
            setLoading(false)
        } catch (error) {
            toast.error("Some error")
            console.log(error);
            setisAuthenticated(false)
            setLoading(false)
        }
    }


    if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className="login">
        <section>
            <form onSubmit={submitHandler}>
                <input value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder='Name' name="" id="" required/>


                <input
                value={email} onChange={(e)=>setemail(e.target.value)}
                type="email" placeholder='Email' required />

                <input type="password" 
                value={password} onChange={(e)=>setpassword(e.target.value)} 
                placeholder='Password' name="" id="" required/>
                <button type='submit' disabled={loading}>Sign Up</button>
                <h4>Or</h4>
                <Link to="/login">Log In</Link>
            </form>
        </section>
    </div>
  )
}

export default Register