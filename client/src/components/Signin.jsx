import React from 'react'
import front from "../images/front2.jpg"
import { signInWithPopup } from 'firebase/auth'
import {auth, googleProvider} from '../firebase/setup.js'
import { useNavigate } from 'react-router-dom'
const Signin = () => {
    const navigate = useNavigate()
    const googleSignin = async ()=>{
        
        try{
            await signInWithPopup(auth,googleProvider)
            auth.currentUser && navigate("/")
        }
        catch(err){
            console.error(err)
        }
        console.log(auth)
    }
    
  return (
    <div className='grid grid-cols-2 bg-black h-screen'>
        <div className='text-center'>
            {/* <img className='h-14 ml-20' src={logo} /> */}
            <h1 className='mt-20 text-white text-3xl font-semibold' >Sign in </h1>
            <button onClick={googleSignin} className="mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-14 w-96">
                Sign in 
            </button>
            <h2 className='mt-5 text-blue-600 underline'>Sign in now</h2>
        </div>
        <div>
        <img className='h-screen' src={front}/>
        </div>
    </div>
  )
}

export default Signin;