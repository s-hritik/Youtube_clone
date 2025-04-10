import React from 'react';
import './Playvideo.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import video1 from '../assets/video.mp4';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import share from '../assets/share.png';
import save from '../assets/save.png';
import jack from '../assets/jack.png';
import user_profile from '../assets/user_profile.jpg';
import { API_Key } from '../data';
import { Valueconv } from '../data';
import moment from 'moment';

const Playvideo = () => {

    const {videoId} = useParams();

    const [apidata,setapidata] = useState(null);
    const[channelID, setchannelID] = useState(null);
    const [commentID, setcommentID] = useState([]);
    
    const fetchvideodata = async () => {
        //fetching video data from youtube api
        const videodetails = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_Key}`
        await fetch(videodetails).then(response => response.json()).then(data=>setapidata(data.items[0]))
    }


    // const anotherfetch = async () => {
    //     // fetching channel data from youtube api
    //     const channeldata = `GET https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_Key}`
    //     await fetch(channeldata).then(response => response.json()).then(data=>setchannelID(data.items))


    //     // fetching video comments from youtube api
    //     const commentdata = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_Key}`
    //     await fetch(commentdata).then(response => response.json()).then(data=>setcommentID(data.items))

    // }


    const anotherfetch = async () => {
        if (!apidata || !apidata.snippet || !apidata.snippet.channelId) return;
    
        try {
            // Fetching channel data from YouTube API
            const channeldata = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_Key}`;
            const channelRes = await fetch(channeldata);
            const channelJson = await channelRes.json();
            setchannelID(channelJson.items[0]);
    
            // Fetching video comments from YouTube API
            const commentdata = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_Key}`;
            const commentRes = await fetch(commentdata);
            const commentJson = await commentRes.json();
            setcommentID(commentJson.items);
        } catch (error) {
            console.error("Error fetching channel or comments:", error);
        }
    };
    

    useEffect(() => {
        fetchvideodata();
    }, [videoId]);

    useEffect(() => {
        if (apidata) {
            anotherfetch();
        }
    }, [apidata]);
  

    return(
        <div className='play-video'>

            {/* it was static video which is not commented.  */}
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  referrerPolicy="strict-origin-when-cross-origin"
             allowFullScreen></iframe>


            <h3>{apidata?apidata.snippet.title:"Title here"}</h3>
            <div className="play-video-info">
                <p>{apidata?Valueconv(apidata.statistics.viewCount):"16k"} Views : {apidata?moment(apidata.snippet.publishedAt).fromNow():""}</p>
                <div>
                    <span><img src={like} alt="" />{apidata?Valueconv(apidata.statistics.likeCount):555}</span>
                    <span><img src={dislike} alt="" />12</span>
                    <span><img src={share} alt="" />50</span>
                    <span><img src={save} alt="" />10</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelID?channelID.snippet.thumbnails.default.url:" "} alt="" />
                <div>
                    <p>{apidata?apidata.snippet.channelTitle:" "}</p>
                    <span>{channelID?Valueconv(channelID.statistics.subscriberCount):"2M"} Subscribers</span>
                </div>
                <button>Suscribe</button>
            </div>    
                <div className="video-description">
                    <p>{apidata?apidata.snippet.description.slice(0,200):" Description"}</p>
                    
                    <hr />
                   
                    <h4>{apidata?Valueconv(apidata.statistics.commentCount):"130"} Comments</h4>

                    {commentID.map((item,index) => {
                        return(
                            <div key = {index}className="comments">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className="comment-action">
                                    <img src={like} alt="" />
                                    <span>{Valueconv(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                    <img src={dislike} alt="" />
                                    <span>32</span>
                                </div>
                            </div>
                        </div>     
                        )
                    }
                )}
                   
                </div>           
            </div>
       
    )
}
export default Playvideo;