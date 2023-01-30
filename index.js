const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();
app.use(express.json());
const port = 8000
app.get('/*',(req,res)=>{return res.status(404).json({"msg":"Not Found!"})})
app.post('/save-website', async(req, res) => {
    try {
        const { data: html } = await axios.get(req.body.websiteUrl);
        const $ = cheerio.load(html);
        const text = $('body').text();
        fs.writeFileSync(`${new URL(req.body.websiteUrl).hostname.replace(/^www\./i, '').split('.')[0]}.txt`, text);
        res.json({ message: 'Website content saved successfully!' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving website content' });
      }
    });
app.listen(port, () => console.log(`Example app listening on port ${port}!`))