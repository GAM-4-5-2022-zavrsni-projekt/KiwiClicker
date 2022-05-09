const fs = require("fs")
const express = require("express")
const app = require('express')();
const http = require('http').createServer(app);
const ngrok = require('ngrok');
(async function() {
	
	const url = await ngrok.connect({"addr":42069, "authtoken":"1YeyvUlUPPvCIMrcAupdK28b0bg_5iYfGKPE6RgPAc7bt1WJK"});
	console.log(url)
})();
app.use('/assets', express.static('assets'))
app.get('/', async (req, res) => {
    fs.readFile("client.html", function(er, data){
        res.end(data)
    })
})
app.get('/filelist', async (req, res) => {
    try {
        const files = await fs.promises.readdir("assets");
        res.status(200).json(files);
    } catch (err) {
        res.status(500).json(err);
    }

});
http.listen(42069, ()=>{});
