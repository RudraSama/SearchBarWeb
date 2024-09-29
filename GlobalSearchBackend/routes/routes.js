const router = require('express').Router();

const {getYoutubeSearchResult} = require('../controller/youtube_search_controller');


const {getPubmedSearchResult} = require('../controller/pubmed_search_controller');

const {getGoogleSearchResult} = require('../controller/google_search_controller');
//Youtube Search
router.get("/youtubeSearch", getYoutubeSearchResult);

//Pubmed Search (research paper)
router.get("/pubmedSearch", getPubmedSearchResult);

//Google Blog and Article Search
router.get("/googleSearch", getGoogleSearchResult);

module.exports = router;
