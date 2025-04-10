import React from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import {API_Key} from '../data';
import {Valueconv} from '../data';

const Feed = ({category}) => {

     const[data, setData] = useState([]);

   const fetchData = async () => {
     const video_list = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_Key}`
      await fetch(video_list).then(response => response.json()).then(data=>setData(data.items))
     }

     useEffect(() => {
       fetchData();
     }, [category]);

    return(
        <div className='feed'>

          {data.map((item,index)=>{
               return(
                    <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{Valueconv(item.statistics.viewCount)} views : {moment(item.snippet.publishedAt).fromNow()}</p>
                  </Link>  
               )
          })}


         {/* static data which i have taken */}
         
          {/* <div className='card'>
               <img src={thumbnail2} alt="" />
               <h2>Best channel to learn coding that help you to be a web developer</h2>
               <h3>Greatstack</h3>
               <p>15k views : 2days ago</p>
          </div>
          <div className='card'>
               <img src={thumbnail3} alt="" />
               <h2>Best channel to learn coding that help you to be a web developer</h2>
               <h3>Greatstack</h3>
               <p>15k views : 2days ago</p>
          </div> */}
        
        
   
        </div>
    )
}
export default Feed;
