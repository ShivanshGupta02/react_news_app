import React, { useEffect } from 'react'
import { addDoc, doc, getDocs, collection } from 'firebase/firestore'
import { useState } from 'react'
import { database, auth } from '../firebase/setup'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Comments = (props) => {
    const [newsComments, setNewsComments] = useState([])
    const [comments, setComments] = useState("")
    const addComments = async()=>{
        const newsDoc = doc(database, "News", `${props.url.substr(-15,10)}`)
        const commentsRef = collection(newsDoc,"Comments")
        auth.currentUser == null && toast.warning("Please login")
        try{
            auth.currentUser && await addDoc(commentsRef,{
                comments:comments,
                name : auth.currentUser.displayName,
                profileImg : auth.currentUser.photoURL
            })
            auth.currentUser && toast.success("Comment added successfully")
        }
        catch(err){
            console.error(err)
        }
    }

    const showComments = async()=>{
        const newsDoc = doc(database, "News", `${props.url.substr(-15,10)}`)
        const commentsRef = collection(newsDoc, "Comments")
        try{
            const data = await getDocs(commentsRef)
            const filteredData = data.docs.map((doc)=>({
                ...doc.data(),
                id:doc.id 
            }))
            setNewsComments(filteredData)
        }
        catch(e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        showComments();
    },[newsComments])
  return (
    <div className='grid grid-rows-2'>
        <div className='p-5'>
            <label for="Add Comments" class="block mb-2 text-sm font-medium text-gray-900 ">Add Comments</label>
            <div className='flex'>
            <input onChange={(e)=>setComments(e.target.value)} type="text" id="Add Comments" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Comments" required />
            <button onClick={addComments} class="ml-2  bg-gray-500 hover:bg-slate-500 text-white text-sm py-2 px-4 rounded">
                Add
            </button>
            </div>
        </div>
        <div className='h-2 p-5'>
            {
                newsComments.map((data)=>{
                    return <>
                    <div className='flex'>
                    <img src={data.profileImg} className=' rounded-full w-5 h-5' />
                    <h3 className='font-semibold text-xs text-slate-500 ml-2'>{data.name.toUpperCase()}</h3>
                    </div>
                    <h4 className='ml-7'>{data.comments}</h4>
                    </>
                })
            }
        </div>
        <ToastContainer autoClose={3000}/>
    </div>
    
  )
}

export default Comments