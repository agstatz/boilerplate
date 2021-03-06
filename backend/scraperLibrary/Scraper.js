const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { camelCase } = require("./utils");

const DINING_HOMEPAGE = "https://dining.purdue.edu";

async function scraper() {
  // Create browser object
  const browser = await puppeteer.launch();

  // Create page for browsing
  const page = await browser.newPage();

  /*

    */
  async function scrapeMenuURLs() {
    // Get menu URL
    const menusURL = DINING_HOMEPAGE + "/menus";

    // Setup scraper
    await page.goto(menusURL, { waitUntil: "networkidle2" });
    const html = await page.content();
    const $ = cheerio.load(html);

    // Declare URLs object
    const urls = {
      diningCourts: [],
      onTheGo: [],
    };

    // Get links of all dining courts
    let header = $("h2:contains('Dining Courts')");
    let linkObjects = header.parent().find("a");
    linkObjects.each((index, element) => {
      urls.diningCourts.push(DINING_HOMEPAGE + $(element).attr("href"));
    });

    // TODO: Scrape On The Go
    header = $("h2:contains('On-the-GO!')");
    linkObjects = header.parent().find("a");
    linkObjects.each((index, element) => {
      urls.onTheGo.push(DINING_HOMEPAGE + $(element).attr("href"));
    });

    return urls;
  }

  async function scrapeDiningCourtInfo(diningCourtURL) {
    // Setup scraper
    await page.goto(diningCourtURL, { waitUntil: "networkidle2" });
    const html = await page.content();
    const $ = cheerio.load(html);

    // Declare dining court object
    const diningCourt = {
      name: "",
      address: "",
      serves: [],
    };

    // Get the name of the dining court
    diningCourt.name = $(".c-menus__location-title--title").text();

    // Get address
    const addressStreet = $(".address-street").text();
    const addressInfo = $(".address-info").text();
    diningCourt.address = addressStreet + ", " + addressInfo;

    // Get the meals this dining court serves
    const times = $(".location-hours-section-meals").first();
    for (const row of times.find(".hours-section-row")) {
      const label = $(row).find(".hours-section-row-label").text();
      diningCourt.serves.push(label);
    }

    return diningCourt;
  }

  async function scrapeMealMenu(diningCourtURL, date, mealType) {
    // Trim off date of dining court url if it exists
    const datePattern = /\/[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}/g;
    const index = datePattern.exec(diningCourtURL).index;
    const trimmedURL = diningCourtURL.substring(
      0,
      index || diningCourtURL.length
    );

    // Get date information
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Build URL for given day and meal type
    if (mealType === "Breakfast/Lunch") mealType = "";
    const newURL =
      trimmedURL + "/" + year + "/" + month + "/" + day + "/" + mealType;

    // Setup scraper
    await page.goto(newURL, { waitUntil: "networkidle2" });
    const html = await page.content();
    const $ = cheerio.load(html);

    // Build menu object
    const menu = {
      date: "",
      mealType: "",
      timeServed: "",
      stations: [],
    };

    // Set the date of the menu
    menu.date = month + "-" + day + "-" + year;

    // Set the meal type of the menu
    menu.mealType = mealType;

    // Get the time this meal is served on this date
    const time = $(".mealpicker-meal-times").text();
    menu.timeServed = time;
    if (time === "Closed") return menu;

    // Get the station information
    const htmlStations = $(".station-container");

    // FOR EVERY STATION: Build station object for every station found
    for (const station of htmlStations) {
      const stationObject = {
        name: "",
        foods: [],
      };

      // Get the station name
      const stationName = $(station).find(".station-name").text();
      stationObject.name = stationName;

      // Get all foods and their links
      for (const item of $(station).find(".station-item")) {
        const itemName = $(item).find(".station-item-text").text();
        const itemLink = DINING_HOMEPAGE + $(item).attr("href");

        const foodObject = {
          foodName: itemName,
          foodURL: itemLink,
        };

        stationObject.foods.push(foodObject);
      }

      // Add the station to the menu
      menu.stations.push(stationObject);
    }
    return menu;
  }

  async function scrapeFoodInfo(foodURL) {
    // Setup scraper
    await page.goto(foodURL, { waitUntil: "networkidle2" });
    const html = await page.content();
    const $ = cheerio.load(html);

    // Declare food object
    const foodObject = {
      name: "",
      servingSize: "",
      calories: "",
      totalFat: "",
      saturatedFat: "",
      cholesterol: "",
      sodium: "",
      totalCarbohydrate: "",
      sugar: "",
      addedSugar: "",
      dietaryFiber: "",
      protein: "",
      calcium: "",
      iron: "",
      dietaryTags: [],
      ingredients: "",
    };

    // Get food name
    const name = $("#main").text();
    foodObject.name = name;

    // Get serving size
    const servingSizeBoth = $(".nutrition-feature-servingSize-quantity").text();
    const servingSizeUnit = $(".nutrition-feature-servingSize-unit").text();
    const servingSize =
      servingSizeBoth.substring(0, servingSizeBoth.indexOf(servingSizeUnit)) +
      " " +
      servingSizeUnit;

    foodObject.servingSize = servingSize;

    // Get calories
    const calories = $(".nutrition-feature-calories-quantity").text();
    if (calories === "") {
      await page.screenshot({ path: "screenshot.png" });
    }
    foodObject.calories = calories;

    // Get nutrition table
    const nutritionTable = $(".nutrition-table");

    // Read nutrition table
    for (const row of nutritionTable.find(".nutrition-table-row")) {
      const label = $(row).find(".table-row-label").text();
      let value = $(row).find(".table-row-labelValue").text();

      // Calcium and Iron go off of daily value
      if (label === "Calcium" || label === "Iron") {
        value = $(row).find(".table-row-dailyValue").text();
      }

      // Set the object field dynamically
      const field = camelCase(label);
      foodObject[field] = value;
    }

    // Get dietary tags
    const dietaryTags = [];
    const tags = $(".item-widget-allergens");
    for (const tag of $(tags).find(".allergen-name")) {
      dietaryTags.push($(tag).text());
    }
    foodObject.dietaryTags = dietaryTags;

    // Get ingredients string
    const ingredients = $(".nutrition-ingredient-list").children("div").text();
    foodObject.ingredients = ingredients;

    return foodObject;
  }

  async function close() {
    await browser.close();
  }

  return Object.freeze({
    scrapeMenuURLs,
    scrapeDiningCourtInfo,
    scrapeMealMenu,
    scrapeFoodInfo,
    close,
  });
}

module.exports = scraper;
