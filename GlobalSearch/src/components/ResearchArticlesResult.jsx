import React from 'react';


const ResearchArticlesResult = (props)=>{

   return (
        <div className="researchArticleResultDiv">
            <div>
                <button disabled={props.pageNo == "0"} onClick={()=>{props.handleSearch(parseInt(props.pageNo)-1)}}>Prev</button>
                &nbsp;&nbsp;
                <button onClick={()=>{props.handleSearch(parseInt(props.pageNo)+1)}}>Next</button>

            </div>


            <div>
                {props.items.map((item, index)=>{
                    return (
                        <SearchResultTile key={index} title={item.articleTitle} date={item.date} link={item.url}/>
                    )
                })} 
            </div>
        </div>
    );

}

const SearchResultTile = (props)=>{
    return (
        <div className="researchArticleResultTile">
            <p dangerouslySetInnerHTML={{__html: props.title}}/>
            <p>{props.date}</p>
            <a href={props.link} target="_blank">Read</a>
        </div>
    );
}

export default ResearchArticlesResult;


