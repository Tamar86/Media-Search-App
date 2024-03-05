//importing axios library
const axios = require("axios");

//async function responsible for handling search requests
async function searchController(req, res) {
  //try-catch block
  try {
    //extracts the searchTerm query from parameter from the requested URL
    const searchTerm = req.query.searchTerm;
    //extracts mediaType query from the requested URL
    const mediaType = req.query.mediaType;
    //HTTP GET request to the iTunes search API, using axios library
    const response = await axios.get(
      `https://itunes.apple.com/search?term=${searchTerm}&mediaType=${mediaType}`
    );
    //mapping over the results array in the response data and extracts albumName, artistName, etc...
    const searchResults = response.data.results.map((result) => ({
      albumName: result.collectionName,
      artistName: result.artistName,
      albumCoverImage: result.artworkUrl100,
      releaseDate: result.releaseDate,
    }));
    //sending JSON response containing the search result back to client that made the search request
    res.json(searchResults);
    //logs error
  } catch (error) {
    console.error("Error searching media", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = searchController;
