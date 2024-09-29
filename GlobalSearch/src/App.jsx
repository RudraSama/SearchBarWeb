import { useState } from 'react'
import axios from 'axios'
import './App.css'


import YoutubeResult from './components/YoutubeResult';
import BlogResult from './components/BlogResult';
import ResearchArticlesResult from './components/ResearchArticlesResult';

const App = ()=> {


    const [search, setSearch] = useState("");
    const [youtubeResult, setYoutubeResult] = useState({});
    const [blogResult, setBlogResult] = useState({});
    const [researchArticleResult, setResearchArticleResult] = useState({});


    const [msg, setMsg] = useState("");

    const [loading, setLoading] = useState(false);

    const API_URL = "http://localhost:5000/";


    const handleSearchInput = (event)=>{
        setSearch(event.target.value);
    }



    const handleYoutubeSearch = async(prevPageToken, nextPageToken, order)=>{

        prevPageToken = prevPageToken || "";
        nextPageToken = nextPageToken || "";
        order = order || "";

        setResearchArticleResult({});
        setBlogResult({});


        try{

            setLoading(true);

            const params = {
                search: search,
                order: order === ""?"date":order
            }

            if(nextPageToken !== ""){
                params["pageToken"] = nextPageToken;
            }

            if(prevPageToken !== ""){
                params["pageToken"] = prevPageToken;
            }

            console.log(params);


            const response = await axios.get(API_URL+"api/youtubeSearch", {
                params: {
                    search: search
                }
            });
            
            setLoading(false);

            if(response.data.msg){
                setMsg(response.data.msg);
                return;
            }

            if(response.data){
                setMsg("");
                setYoutubeResult(response.data);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const handleBlogSearch = async(startIndex)=>{
        
        setYoutubeResult({});
        setResearchArticleResult({});

        try{

            setLoading(true);

            const params = {
                search: search,
                startPage: startIndex
            };
            const response = await axios.get(API_URL+"api/googleSearch", {
                params: params
            });

            setLoading(false);

            if(response.data.msg){
                setMsg(response.data.msg);
                return;
            }


            if(response.data){

                setMsg("");
                setBlogResult({items: response.data.result, startIndex: response.data.startIndex});
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const handleResearchSearch = async(pageNo)=>{

        pageNo = pageNo || "0";

        setYoutubeResult({});
        setBlogResult({});

        try{
            setLoading(true);

            const params = {
                search: search,
                pageNo: pageNo === ""?0:pageNo
            };


            const response = await axios.get(API_URL+"api/pubmedSearch", {
                params: params
            });

            setLoading(false);

            if(response.data.msg){
                setMsg(response.data.msg);
                return;
            }


            if(response.data){
                setMsg("");
                setResearchArticleResult({items: response.data.result, pageNo: response.data.pageNo});
            }
        }
        catch(e){
            console.log(e);
        }

    }



    return (
        <main className="container">
            <div className="searchBox">
                <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                <input type="text" placeholder="Search..." onChange={handleSearchInput}/>
            </div>

            <div className="searchButtonDiv">
                <button onClick={()=>{handleYoutubeSearch("", "", "")}}>
                    <i className="fa-brands fa-youtube"></i>
                    &nbsp;
                    Youtube
                </button>

                <button onClick={()=>{handleBlogSearch(1)}}>
                    <i className="fa-solid fa-newspaper"></i>
                    &nbsp;
                    Blogs/Articles
                </button>

                <button onClick={()=>{handleResearchSearch("0")}}>
                    <i className="fa-solid fa-book"></i>
                    &nbsp;
                    Research Papers
                </button>

            </div>


            <div className="resultDiv">

                {loading == true?
                    (
                        <div className="loader"></div>
                    )
                    :""
                }
        
                {msg !== ""?msg:""}

                {Object.keys(youtubeResult).length > 0?
                    <YoutubeResult items = {youtubeResult.items} prevPageToken={youtubeResult.prevPageToken} nextPageToken={youtubeResult.nextPageToken} handleSearch={handleYoutubeSearch}/>
                :""}

                {Object.keys(blogResult).length > 0?
                    <BlogResult items = {blogResult.items} startIndex={blogResult.startIndex} handleSearch={handleBlogSearch}/>
                :""}

                {Object.keys(researchArticleResult).length > 0?
                    <ResearchArticlesResult items = {researchArticleResult.items} pageNo={researchArticleResult.pageNo} handleSearch={handleResearchSearch}/>
                :""}
            </div>

        </main>
    );
}


export default App
