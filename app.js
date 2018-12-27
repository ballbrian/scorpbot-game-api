require('dotenv').config();

var express = require("express");
var app = express();

var apicalypse = require('apicalypse').default;

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
})

app.get("/games/:name", async (req, res, next) => {

try{

    const MAX_CHAT_STRING_LENGTH = 300;

    const response = await apicalypse({
        headers: {"user-key": process.env.IGDB_USER_KEY},
        queryMethod: "body" // Optional: By default, the apicalypse query is put in the request body. Use 'url' to put the query in the request URL.
    })
        .fields(["game.name", "game.summary", "game.url"]) // fetches only the name and movies fields
    
        .limit(1)
    
        .search('"'+ req.params.name +'"') // search for a specific name (search implementations can vary)

        .request("https://api-v3.igdb.com/search"); // execute the query and return a response object

        var urlString = `... Read more: ${response.data[0].game.url}`;

        var responseString = response.data[0].game.summary.substring(0, MAX_CHAT_STRING_LENGTH-urlString.length) + urlString

        res.send(responseString);
} catch(err) {
    console.log(err);
    next(err);
}
})