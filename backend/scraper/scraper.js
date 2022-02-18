const axios = require('axios');
const cheerio = require('cheerio');
const MongoClient = require('mongodb').MongoClient;
const puppeteer = require('puppeteer');


const url = "mongodb+srv://admin:1234@cluster0.ggera.mongodb.net/boilerplate?retryWrites=true&w=majority"; 
const DINING_PAGE_URL = 'https://dining.purdue.edu/menus/'
MongoClient.connect(url, async (err, dbt) => {
    if (err) throw err;
    console.log('connected to database');
    const db = dbt.db("boilerplate");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(DINING_PAGE_URL);
    let html = await page.content();
    const $ = cheerio.load(html);
    const dining_menu = $('#app > div > div > div.MuiGrid-root.menus__home-content--container.MuiGrid-container > div > div > div:nth-child(1) > div > ul > a:nth-child(1) > li > div.MuiListItemText-root.MuiListItemText-multiline > span');
    console.log(dining_menu.contents().text())

    // console.log(html)
    // let q = await page.evaluate(() => {return document.querySelector('#app > div > div > div.MuiGrid-root.menus__home-content--container.MuiGrid-container > div > div > div:nth-child(1) > div > ul > a:nth-child(1) > li > div.MuiListItemText-root.MuiListItemText-multiline > span').innerText});
    // console.log(q);
    await browser.close();
    
    console.log("done")



    
    // let page = await get_page(DINING_PAGE_URL);
    // console.log(page);
    // const $ =  cheerio.load(page);


    // let earhart = $.html();
    // console.log(earhart)
    dbt.close();
});
