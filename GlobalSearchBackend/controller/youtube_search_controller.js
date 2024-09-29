const dotenv = require('dotenv');
const {google} = require('googleapis');


dotenv.config();

const youtube = google.youtube({
    version: "v3",
    auth: process.env.GOOGLE_API_KEY
});

const getYoutubeSearchResult = async(req, res)=>{

    try{

        const query = req.query.search;

        const pageToken = req.query.pageToken;
        const order = req.query.order;

        console.log(pageToken);

        const options = {
            part: "snippet",
            q: query,
            type: "video",
            order: order,
            maxResults: 10,
        };

        if(pageToken){
            options["pageToken"] = pageToken;
        }

        const response = await youtube.search.list(options);
        
        const videoIds = [];
        if(response.data){
            if(response.data.items.length > 0){
                response.data.items.map((item)=>{
                    videoIds.push(item.id.videoId);
                });
            }
        }

        if(videoIds.length == 0){
            res.json({msg: "Not Found"});
            return;
        }

        const response2 = await getVideoDetails(videoIds);

        if(response2 == undefined){
            res.json({msg: "Not Found"});
        }
        const result = [];

        response2.items.map((item)=>{
            const obj = {
                title: item.snippet.title,
                link: "https://www.youtube.com/watch?v="+item.id,
                thumbnail: item.snippet.thumbnails.high.url,
                likes: item.statistics.likeCount,
                views: item.statistics.viewCount
            };

            result.push(obj);
        });


        res.json({items: result, nextPageToken: response.data.nextPageToken, prevPageToken: response.data.prevPageToken});

    }
    catch(e){
        console.log(e);
    }

}

//util functions

const getVideoDetails = async(videoIds)=>{
    const options = {
        part: "snippet,statistics",
        id: videoIds.join(","),
    };
    const response = await youtube.videos.list(options);

    if(response.data){
        return response.data;
    }

    return undefined;
}

module.exports = {getYoutubeSearchResult}
