const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const DINING_HOMEPAGE = "https://dining.purdue.edu";

(async () => {
  // Create headless browser
  const browser = await puppeteer.launch();

  // Create page object
  const page = await browser.newPage();

  // Load menus homepage
  await page.goto(DINING_HOMEPAGE + "/menus", { waitUntil: "networkidle2" });

  // html content
  const html = await page.content();

  // Load html into cheerio
  let $ = cheerio.load(html);

  // Get links of all dining courts
  let header = $("h2:contains('Dining Courts')");
  const linkObjects = header.parent().find("a");
  const links = [];
  linkObjects.each((index, element) => {
    links.push(DINING_HOMEPAGE + $(element).attr("href"));
  });

  // Build all dining courts
  for (const diningCourtLink of links) {
    const diningCourt = await buildDiningCourt(browser, diningCourtLink);
  }

  // Close browser
  await browser.close();
})();

const buildDiningCourt = async (browser, url) => {
  // Build dining court object
  const diningCourt = {
    name: "",
    address: "",
    menu: [],
  };

  // Setup scraper for this url
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  let html = await page.content();
  let $ = cheerio.load(html);

  // Get name
  diningCourt.name = $(".c-menus__location-title--title").text();

  // FEEDBACK
  console.log("Getting dining court information for: " + diningCourt.name);

  // Get address
  const addressStreet = $(".address-street").text();
  const addressInfo = $(".address-info").text();
  diningCourt.address = addressStreet + ", " + addressInfo;

  // Get day, month, and year
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  // Remove date from URL
  const datePattern = /\/[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}/g;
  const court_url = url.substring(0, datePattern.exec(url).index);

  // Wonky way to see if the court serves late lunch
  let servesLateLunch = false;
  if ($("div:contains('Late Lunch')").text() !== "") servesLateLunch = true;

  // Get today's menu
  diningCourt.menu = await buildMenuForDate(
    browser,
    court_url,
    day,
    month,
    year,
    servesLateLunch
  );
  console.log(diningCourt);
};

const buildMenuForDate = async (
  browser,
  url,
  day,
  month,
  year,
  servesLateLunch
) => {
  const menu = {
    date: "",
    breakfast: {},
    lunch: {},
    lateLunch: {},
    dinner: {},
  };

  // Set the date of the menu
  menu.date = month + "-" + day + "-" + year;

  // FEEDBACK
  console.log("Getting menu information for " + menu.date);

  // Base URL for today's date
  const BASE_URL = url + "/" + year + "/" + month + "/" + day;

  // Get breakfast menu
  console.log("Getting breakfast menu");
  const breakfastURL = BASE_URL + "/Breakfast";
  menu.breakfast = await buildMealMenu(browser, breakfastURL);

  // Get lunch menu
  console.log("Getting lunch menu");
  const lunchURL = BASE_URL + "/Lunch";
  menu.lunch = await buildMealMenu(browser, lunchURL);

  // Wonky way to see if the court serves late lunch
  if (servesLateLunch) {
    // Get late lunch menu
    console.log("Getting late lunch menu");
    const lateLunchURL = BASE_URL + "/Late%20Lunch";
    menu.lateLunch = await buildMealMenu(browser, lateLunchURL);
  } else {
    console.log("This location does not serve late lunch");
  }

  // Get dinner menu
  console.log("Getting dinner menu");
  const dinnerURL = BASE_URL + "/Dinner";
  menu.dinner = await buildMealMenu(browser, dinnerURL);

  return menu;
};

const buildMealMenu = async (browser, url) => {
  // Declare menu object
  const menuObject = {
    time: "",
    stations: [],
  };

  // Setup scraper for this url
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  let html = await page.content();
  let $ = cheerio.load(html);

  // Get the time this meal is being served
  const time = $(".mealpicker-meal-times").text();
  menuObject.time = time;

  // If the dining court is closed for this meal, return.
  if (time === "Closed") return menuObject;

  // Find the station containers
  const htmlStations = $(".station-container");

  // FOR EVERY STATION: Build station object for every station found
  for (const station of htmlStations) {
    let stationObject = {
      name: "",
      foods: [],
    };

    // Get the station name
    let name = $(station).find(".station-name").text();
    stationObject.name = name;

    // Get the foods being served at the station
    // Get all item links
    let itemURLs = [];
    const itemObjects = $(station).find(".station-items").find("a");
    itemObjects.each((index, item) => {
      let itemURL = DINING_HOMEPAGE + $(item).attr("href");
      itemURLs.push(itemURL);
    });

    // Get all food infromation from every URL and add to station's food list
    for (const itemURL of itemURLs) {
      const foodItem = await getFoodInfo(browser, itemURL);
      stationObject.foods.push(foodItem);
    }

    // Add the station to the menu
    menuObject.stations.push(stationObject);
  }

  return menuObject;
};

const getFoodInfo = async (browser, url) => {
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

  // Setup scraper for this url
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  let html = await page.content();
  let $ = cheerio.load(html);

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
};

const camelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};
