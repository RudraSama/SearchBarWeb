import React from 'react';

const BlogResult = (props)=>{

   return (
        <div className="blogResultDiv">
            <div>
                <button disabled={props.startIndex == 1} onClick={()=>{props.handleSearch(parseInt(props.startIndex)-10)}}>Prev</button>
                &nbsp;&nbsp;
                <button onClick={()=>{props.handleSearch(parseInt(props.startIndex)+10)}}>Next</button>
            </div>


            <div>
                {props.items.map((item, index)=>{
                    return (
                        <SearchResultTile key={index} title={item.title} link={item.link} snippet={item.snippet}/>
                    )
                })} 
            </div>
        </div>
    );
}


const SearchResultTile = (props)=>{
    return (
        <div className="blogResultTile">
            <p dangerouslySetInnerHTML={{__html: props.title}}/>
            <p>{props.snippet}</p>
            <a href={props.link} target="_blank">Visit</a>
        </div>
    );
}

export default BlogResult;
