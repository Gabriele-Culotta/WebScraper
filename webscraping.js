const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.spaziogames.it/"; // -- insert here URL

axios(url)
  .then((response) => {
    const html = response.data;
    //console.log(html);
    const articles = [];
    const $ = cheerio.load(html);
    $(".post_template_standard_text", html).each(function () {
      const title = $(this)
        .find("span")
        .text()
        .trim("\n")
        .replace(/ +(?= )/g, ""); // regex
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
