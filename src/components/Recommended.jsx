import React from "react";
import { useEffect, useState } from "react";
import { API_Key, Valueconv } from "../data";
import './Recommended.css'
import { Link } from "react-router-dom";

const Recommended = ({categoryId})=>{

    const[apidata,setapidata] = useState([]);

    const fetchvideodata = async () => {
        const relatedvideos = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&videoCategoryId=${categoryId}&key=${API_Key}`
        await fetch(relatedvideos).then(response => response.json()).then(data=>setapidata(data.items))
    }
    useEffect(() => {
        fetchvideodata();
    }, []);

    return(
        <div className="recommended">
            {apidata.map((item,index)=>{
                  return(
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`}  key={index} className="side-video-l">
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <div className="vid-info">
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{Valueconv(item.statistics.viewCount)} Views</p>
                    </div>
                </Link>
               )
            })}
                 
        </div>
    )
}
export default Recommended