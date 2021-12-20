 
const request = require("request-promise");
const cheerio = require("cheerio");
const fs =require("fs");

const json2csv =require("json2csv").Parser;

const website = "https://en.wikipedia.org/wiki/R";

(async() => {
    let letter = [];
    const response = await request({
        uri: website ,
        headers: {
           accept:  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
           "accept-encoding": "gzip, deflate, br",
           "accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
        }, 
        gzip: true
    });
    let $ = cheerio.load(response);
    let history_head = $('div[class="mw-parser-output"] > h2 > span[id="History"]').text();
    let history_text = $('div[class="mw-parser-output"] >  p:eq(9) , p:eq(10) ,p:eq(11),p:eq(12),p:eq(13)').text();
    let Pronunciation_and_use_head = $('div[class="mw-parser-output"] > h2 > span[id="Pronunciation_and_use"]').text();
    let Pronunciation_and_use_text = $('div[class="mw-parser-output"] > p:eq(15) ,p:eq(16)').text();
    let other_system_head = $('div[class="mw-parser-output"] > h3 > span[id="Other_systems"]').text();
    let other_system_text = $('div[class="mw-parser-output"] >  p:eq(17) ').text();

    letter.push({
        history_head,
        history_text,
        Pronunciation_and_use_head,
        Pronunciation_and_use_text,
        other_system_head,
        other_system_text

    
       
    });
    console.log(history_head,history_text, Pronunciation_and_use_head,Pronunciation_and_use_text,other_system_head,other_system_text);


    const j2cp =new json2csv()
    const csv = j2cp.parse(letter)
    fs.writeFileSync("./college.csv",csv, "utf-8")
})();




