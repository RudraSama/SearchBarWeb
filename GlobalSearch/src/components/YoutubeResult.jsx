import React from 'react';

const YoutubeResult = (props)=>{

    const handleOrderChange = (event)=>{
        props.handleSearch("", "", event.target.value);
    }

    return (
        <div className="youtubeResultDiv">
            <div>
                <button onClick={()=>{props.handleSearch(props.prevPageToken, "")}}>Prev</button>
                &nbsp;&nbsp;
                <button onClick={()=>{props.handleSearch("", props.nextPageToken)}}>Next</button>
                &nbsp;&nbsp;
                <select onChange={handleOrderChange}>
                    <option value="">Filters</option>
                    <option value="date">Date</option>
                    <option value="viewCount">View Count</option>
                    <option value="relevance">Relevance</option>
                </select>
            </div>

            <div>
                {props.items.map((item, index)=>{
                    return (<YoutubeTile key={index} title={item.title} thumbnail = {item.thumbnail} likes={item.likes} views={item.views} link={item.link}/>);
                })}
            </div>
        </div>

    );
}

const YoutubeTile = (props)=>{

    const goToYoutube = (link)=>{
       window.open(link ,'_blank'); 
    }

    return (
        <div className="youtubeTile" onClick={()=>{goToYoutube(props.link)}}>
            <img src={props.thumbnail} alt=""/>
            <div>
                <p>{props.title}</p>
                <div>
                    <p style={{color: "#ef233c"}}>Views: &nbsp; {props.views}</p>
                    <p style={{color: "#ef233c"}}>Likes: &nbsp; {props.likes}</p>
                </div>
            </div>
        </div>
    );
}

export default YoutubeResult;
