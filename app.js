require('dotenv').config();

var express = require("express");
var app = express();

var apicalypse = require('apicalypse').default;

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
})

app.get("/games/:name", async (req, res, next) => {

try{

    const response = await apicalypse({
        headers: {"user-key": process.env.IGDB_USER_KEY},
        queryMethod: "body" // Optional: By default, the apicalypse query is put in the request body. Use 'url' to put the query in the request URL.
    })
        .fields(["game.name", "game.summary"]) // fetches only the name and movies fields
    
        .limit(1)
    
        .search('"'+ req.params.name +'"') // search for a specific name (search implementations can vary)

        .request("https://api-v3.igdb.com/search"); // execute the query and return a response object

        res.send(response.data[0].game.summary)
} catch(err) {
    console.log(err);
    next(err);
}
})