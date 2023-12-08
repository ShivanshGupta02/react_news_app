import React from 'react'
import logo from "../images/logo.jpg"
import user from "../images/user64.png"
import lens from "../images/lens.png"
import {auth} from "../firebase/setup"
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
const Navbar = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            setIsLoggedIn(user);
        });
        return ()=> unsubscribe();
    }, []);
    const logout = async()=>{
        try{
            await auth.signOut();
        }
        catch(err){
            console.error(err);
        }
    }
  return (
    <div className='grid grid-cols-3 bg-black text-white fixed'>
        
        <div className='flex'>
            <img src={logo} className= 'items-center h-14 m-3' />
            { isLoggedIn?
            <button onClick={logout} className='text-white items-center flex hover:border border-white p-2 w-48'>
                Logout
            </button>
            :
            <Link to="/signin">
                <button className='text-white items-center flex hover:border border-blue-600 p-2'>
                    <img src={user} />
                    Sign In
                    
                </button>
            </Link>
            }           
            
        </div>
        <div className='flex '>
            <button onClick={()=>props.setMenu("All")} className='font-semibold text-sm text-white'>
            Home  
            </button>
            <button onClick={()=>props.setMenu("Science")} className='ml-7 font-semibold text-sm text-white'>
            Science
            </button>
            <button onClick={()=>props.setMenu("Movies")} className='ml-7 font-semibold text-sm text-white'>
            Movies
            </button>
            <button onClick={()=>props.setMenu("Food")} className='ml-7 font-semibold text-sm text-white'>
            Food
            </button>
            <button onClick={()=>props.setMenu("Travel")} className='ml-7 font-semibold text-sm text-white'>
            Travel
            </button>
            <button onClick={()=>props.setMenu("Worklife")} className='ml-7 font-semibold text-sm text-white'>
            Worklife
            </button>
            <button onClick={()=>props.setMenu("Future")} className='ml-7 font-semibold text-sm text-white'>
            Future
            </button>
            <button onClick={()=>props.setMenu("Culture")} className='ml-7 font-semibold text-sm text-white'>
            Culture
            </button>
        </div>
        <div className='ml-60 flex p-4'>
            <img src={lens} className='h-10'/>
            <input onChange={(e)=>props.setSearch(e.target.value)} className='flex bg-gray-800 text-center' placeholder='Search'/> 
        </div>
    </div> 
  )
}

export default Navbar