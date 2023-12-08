import { getMultiFactorResolver } from 'firebase/auth'
import React, { useCallback } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import {database} from "../firebase/setup.js"

const Home = (props) => {
    const [news, setNews] = useState([])
    const apiKey = import.meta.env.VITE_API_KEY;
    const getNews = ()=>{
        fetch(`https://newsapi.org/v2/everything?q=${props.menu?props.menu : 'All'}&from=2023-11-21&to=2023-11-21&sortBy=popularity&apiKey=${apiKey}`)
        .then(res=>res.json()).then(json=>setNews(json.articles))
    }

    useEffect(()=>{
        getNews()
    },[props.menu])
    console.log(news)

    const addNews = async(data)=>{
        const newsDoc = doc(database, "News",`${data.url.substr(-15,10)}`)
        try{
            await setDoc(newsDoc,{
                title:data.title,
                description:data.description
            })
        }
        catch(e){
            console.log(e)
        }
    }
  return (
    <div className='mt-20 p-6 grid grid-cols-4'>
        {   
            news.filter(data=>data.title.includes(props.search)).map((data)=>{
                return <>
                <Link onClick={()=>addNews(data)} to="/details" state={{data:data}}>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img className="w-full" src={data.urlToImage} />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{data.title}</div>
                        <p className="text-gray-700 text-base">
                        {data.content}
                        </p>
                    </div>
                    </div>
                    </Link>
                </>

            })
        }
    </div>
  )
}

export default Home