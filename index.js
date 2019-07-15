const axios = require('axios');
const cheerio = require('cheerio');
const url = ['https://www.freecodecamp.org/news/',
'https://frontendfront.com','https://dev.to/','https://hackernoon.com/tagged/software-development'];
const express = require('express');
const path = require('path');
let app = express();
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')))

app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname+'/index.html'));
})
app.get('/news',function (req,res) {
  axios.all([
      axios.get(url[0]),
      axios.get(url[1]),
      axios.get(url[2]),
      axios.get(url[3])
  ])
  .then(axios.spread((fcc,dev,comm,slash) => {
    let itemList=[];
    loadFile('DEV Community',comm,itemList,'.single-article','h3','.index-article-link');
    loadFile('FreeCodeCamp',fcc,itemList,'.post-card-title','a','a');
    loadFile('HACKERNOON',slash,itemList,'.title','a','a');
    loadFile('FrontEndFront',dev,itemList,'.story-title','.story-link','.story-link');
    res.json(itemList);
  }));
})
function loadFile(web,name,itemList,container,className,href) {
  let $=cheerio.load(name.data);
  let h2=$(container);
  for (var i = 0; i < 5; i++) {
    let item = h2.eq(i);
    let title = item.find(className).text().trim();
    let url = item.find(href).attr('href');
    itemList.push({title,url,web});
  }
}
app.listen(process.env.PORT || 8080);
