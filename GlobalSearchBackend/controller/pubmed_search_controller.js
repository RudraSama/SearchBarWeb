const axios = require('axios');
const https = require('https');

const {XMLParser} = require('fast-xml-parser');

const baseURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";


//using IPV4 
const agent = new https.Agent({family: 4});

const getPubmedSearchResult = async(req, res)=>{

    try{

        const query = req.query.search;
        const pageNo = req.query.pageNo;

        const response = await axios.get(baseURL + "esearch.fcgi", {

            httpsAgent: agent,
            params: {
                db: "pubmed",
                term: query,
                retmax: 20,
                retstart: pageNo,
                useHistory: "y",
                retmode: "json"
            }
        });

        const idList = response.data.esearchresult.idlist;

        if(idList == undefined || idList.length == 0){
            res.json({msg: "No Articles Found"});
            return;
        }

        const articles = await getAllArticles(idList);

        if(articles.length == 0){
            res.json({msg: "No Articles Found"});
            return;
        }

        res.json({result: articles, pageNo: response.data.esearchresult.retstart});

    }
    catch(e){
        console.log(e);
    }
}


//util functions

const getAllArticles = async(idList)=>{

    const response = await axios.get(baseURL + "efetch.fcgi", {
        httpsAgent: agent,
        params: {
            db: "pubmed",
            id: idList.join(","),
            retmode: "xml"
        }
    });
    const parser = new XMLParser();
    
    const result = [];

    

    if(response.data){
        const json = parser.parse(response.data);
        const articles = json.PubmedArticleSet.PubmedArticle;


        articles.map((article)=>{
            const obj = {
                articleTitle: article.MedlineCitation.Article.ArticleTitle,
                date: article.MedlineCitation.DateRevised.Day + "/" + article.MedlineCitation.DateRevised.Month + "/" + article.MedlineCitation.DateRevised.Year,
                url: `https://pubmed.ncbi.nlm.nih.gov/${article.MedlineCitation.PMID}/`
            };

            result.push(obj);
        });

    }

    return result; 
}



module.exports = {getPubmedSearchResult}
