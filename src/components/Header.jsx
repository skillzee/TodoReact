import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import axios from 'axios';
import { server } from '../main';
import toast from 'react-hot-toast';

function Header() {

    const {isAuthenticated, setisAuthenticated, loading, setLoading } = useContext(Context);
    console.log(isAuthenticated);



    const logoutHandler = async (e)=>{

        setLoading(true);
    
        try {
            const {data} = await axios.post(`${server}/users/logout`, {
                withCredentials: true
            })
    
            toast.success(data.message)
            setisAuthenticated(false);
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
            setisAuthenticated(true)
            setLoading(false)
        }
    }


  return (
    <nav className='header'>
        <div>
            <h2>Todo App.</h2>
        </div>
        <article>
            <Link to={"/"} >Home</Link>
            <Link to={"/profile"} >Profile</Link>
            {
                isAuthenticated?<button className='btn' onClick={logoutHandler} disabled={loading} >LogOut</button>:<Link to={"/login"} >Login</Link>
            }
            
            
           
        </article>
    </nav>
  )
}

export default Header