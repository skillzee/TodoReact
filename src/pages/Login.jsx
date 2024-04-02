import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { Context } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../main';

const Login = () => {

    
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const {isAuthenticated, setisAuthenticated, loading ,setLoading} = useContext(Context);



    const submitHandler = async (e)=>{
        e.preventDefault();
        setLoading(true);
    
        try {
            const {data} = await axios.post(`${server}/users/login`, {
                email, password
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
            toast.error(error.response.data.message)
            console.log(error);
            setisAuthenticated(false)
        }
    }


    if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className="login">
        <section>
            <form onSubmit={submitHandler}>
            <input
                value={email} onChange={(e)=>setemail(e.target.value)}
                type="email" placeholder='Email' required />

                <input type="password" 
                value={password} onChange={(e)=>setpassword(e.target.value)} 
                placeholder='Password' name="" id="" required/>
                <button type='submit' disabled={loading}>Login</button>
                <h4>Or</h4>
                <Link to="/register">Sign Up</Link>
            </form>
        </section>
    </div>
  )
}

export default Login