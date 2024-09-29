const dotenv = require('dotenv');
const {google} = require('googleapis');

dotenv.config();

const customsearch = google.customsearch("v1");

//popular blog and article sites
const sites = ["medium.com", "wordpress.com", "blogspot.com", "tumblr.com", "squarespace.com", "wix.com", "weebly.com", "ghost.org", "typepad.com", "livejournal.com", "blogger.com", "hubpages.com", "dev.to", "substack.com", "linkedin.com/pulse", "theguardian.com", "forbes.com", "nytimes.com", "huffpost.com", "wired.com", "techcrunch.com", "mashable.com", "theverge.com"];

const getGoogleSearchResult = async(req, res)=>{
    
    try{

        const query = req.query.search;
        const startPage = parseInt(req.query.startPage);


        const options = {
            auth: process.env.GOOGLE_API_KEY,
            cx: process.env.SEARCH_ENGINE_ID,
            q: query+" site:"+sites.join(" OR site:"),
            start: startPage
        }

        const response = await customsearch.cse.list(options);

        if(response.data){
            if(response.data.items.length > 0){
                const result = [];

                response.data.items.map((item)=>{
                    const obj = {
                        title: item.htmlTitle,
                        link: item.link,
                        snippet: item.snippet,
                    };

                    result.push(obj);


                });


                res.json({result: result, startIndex: response.data.queries.request[0].startIndex, nextIndex: response.data.queries.nextPage[0].startIndex});
                return;
            }
        }

        res.json({msg: "Not Found"});
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {getGoogleSearchResult}
