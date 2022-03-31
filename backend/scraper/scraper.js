const axios = require("axios");
const cheerio = require("cheerio");
const MongoClient = require("mongodb").MongoClient;
const puppeteer = require("puppeteer");
const selectors = require("./selectors");

// ConnectDB
const connectDB = require("../config/db.js");

// Import schemas
const Food = require("../models/Food");

// const url = "mongodb+srv://admin:1234@cluster0.ggera.mongodb.net/boilerplate?retryWrites=true&w=majority";
const DINING_PAGE_URL = "https://dining.purdue.edu/menus/";

// Connect to Database
connectDB(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(DINING_PAGE_URL);
  let html = await page.content();
  let page_details = await page.evaluate(() => {
    return document;
  });
  let $ = cheerio.load(html);

  for (const [dining_court, selector] of Object.entries(
    selectors.dining_court_links
  )) {
    const menu_link = page_details.location.origin + $(selector).attr("href");
    console.log(menu_link);

    await get_stations(browser, menu_link);
  }

  await browser.close();
});

async function get_stations(browser, menu_link) {
  const page = await browser.newPage();
  await page.goto(menu_link);
  const $ = cheerio.load(await page.content());
  let stations_html = $(".station-container");

  const page_details = await page.evaluate(() => {
    return document;
  });

  for (const station of stations_html) {
    let station_name = $(station).find(".station-name").text();
    console.log("\nSTATION: ", station_name);

    for (const item of $(station).find(".station-item")) {
      let item_link = page_details.location.origin + $(item).attr("href");
      let item_name = $(item).find(".station-item-text").text();
      console.log("FOOD: " + item_name);
      await get_nutrition_facts(browser, item_name, item_link);
    }
    // console.log(station.children[0].children[0].data)
  }
}

async function get_nutrition_facts(browser, item_name, item_link) {
  console.log("getting facts for " + item_name);
  const page = await browser.newPage();
  await page.goto(item_link);
  const $ = cheerio.load(await page.content());
  let nutrition_facts = {};

  // Begin building/updating food model with the name

  try {
    let foodItem = await Food.findOne({ name: item_name });

    if (!foodItem) foodItem = new Food({ name: item_name });

    // console.log("Food item 1: " + foodItem)

    const nutrition = $(".nutrition");

    const serving_size = $(nutrition)
      .find(".nutrition-feature-servingSize-quantity")
      .text(); //+ ' ' + $(nutrition).find('.nutrition-feature-servingSize-unit').text()
    const calories = nutrition
      .find(".nutrition-feature-calories-quantity")
      .text();
    // console.log("Serving size: " + serving_size)
    // console.log("Calories: " + calories)

    // Add serving size and calorie fields to foodItem
    foodItem.set({
      servingSize: serving_size,
      calories: calories,
    });
    // console.log("Food item 2: " + foodItem)

    for (const row of nutrition.find(".nutrition-table-row")) {
      const label = $(row).find(".table-row-label").text();
      const value = $(row).find(".table-row-labelValue").text();
      // const daily_value = $(row).find('.table-row-dailyValue').text()

      // Dynamically add nutrition field to foodItem
      const field = camelCase(label);
      foodItem.set({
        [field]: value,
      });
      // console.log("Food item 3: " + foodItem)

      // nutrition_facts[label] = {
      //     value: value,
      //     daily_value: daily_value
      // }
    }

    // console.log('Nutritional Facts: ', nutrition_facts)

    //TAGS
    allergens = [];
    const tags = $(".item-widget-allergens");
    for (const tag of $(tags).find(".allergen-name")) {
      allergens.push($(tag).text());
    }

    // Add allergens to db object
    foodItem.set({
      dietaryTags: allergens,
    });

    const ingredients = $(".nutrition-ingredient-list").children("div").text();

    // Add ingredients string to object
    foodItem.set({
      ingredients: ingredients,
    });

    foodItem.set({
      foodTags: [],
    });

    await foodItem.save();

    // console.log("Food item: " + foodItem)

    // console.log('Ingredients: ', ingredients)
  } catch (err) {
    console.log("Error storing food item");
  }
}

// Function to convert a string into a camel cased string to match schema fields.
function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
