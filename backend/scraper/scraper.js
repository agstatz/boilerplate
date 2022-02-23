const axios = require('axios');
const cheerio = require('cheerio');
const MongoClient = require('mongodb').MongoClient;
const puppeteer = require('puppeteer');
const selectors = require('./selectors');

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
    let page_details = await page.evaluate(() => {return document});
    let $ = cheerio.load(html);

    for (const [dining_court, selector] of Object.entries(selectors.dining_court_links)) {
        const menu_link = page_details.location.origin +  $(selector).attr('href');
        console.log(menu_link)

        await get_stations(browser, menu_link)
    }


    await browser.close();
    dbt.close();
});


async function get_stations(browser, menu_link) {
    const page = await browser.newPage();
    await page.goto(menu_link);
    const $ = cheerio.load(await page.content());
    let stations_html = $('.station-container')

    const page_details = await page.evaluate(() => {return document});
    
    for (const station of stations_html) {
        let station_name = $(station).find('.station-name').text()
        console.log('STATION: ', station_name)

        for (const item of $(station).find('.station-item')) {
            let item_link  = page_details.location.origin + $(item).attr('href')
            let item_name = $(item).find('.station-item-text').text()
            console.log(item_link)
            await get_nutrition_facts(browser, item_link)
        }
        console.log('\n')

        // console.log(station.children[0].children[0].data)
    }

}

async function get_nutrition_facts(browser, item_link) {
    console.log('getting facts!')
    const page = await browser.newPage();
    await page.goto(item_link);
    const $ = cheerio.load(await page.content());
    let nutrition_facts = {}

    const nutrition = $('.nutrition')

    const serving_size = $(nutrition).find('.nutrition-feature-servingSize-quantity').text() + ' ' + $(nutrition).find('.nutrition-feature-servingSize-unit').text()
    const calories = nutrition.find('.nutrition-feature-calories-quantity').text()
    console.log(serving_size, calories)

    for (const row of nutrition.find('.nutrition-table-row')) {
        const label = $(row).find('.table-row-label').text()
        const value = $(row).find('.table-row-labelValue').text()
        const daily_value = $(row).find('.table-row-dailyValue').text()

        nutrition_facts[label] = {
            value: value,
            daily_value: daily_value
        }
    }
    console.log(nutrition_facts)

    //TAGS
    allergens = []
    const tags = $('.item-widget-allergens')
    for (const tag of $(tags).find('.allergen-name')) {
        allergens.append($(tag).text())
    }

    console.log(allergens)

    const ingredients = $('.nutrition-ingredient-list').children('div').text()
    console.log(ingredients)
}