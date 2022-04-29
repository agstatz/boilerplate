const axios = require("axios");
const initScraper = require("./scraper");

const connectDB = require("../config/db");

// Require models
const Food = require("../models/Food");
const DiningCourt = require("../models/DiningCourt");
const { exists } = require("../models/Food");

async function updateDB(alwaysUpdateFood) {
  // Connect to database
  connectDB();

  // Create the scraper, get homepage URLs
  const scraper = await initScraper();
  const urls = await scraper.scrapeMenuURLs();

  // Get On-The-GO! information
  console.log("Urls obtained");
  console.log(urls);

  // Update all dining courts
  for (let c = 0; c < urls.onTheGo.length; c++) {
    const otgURL = urls.onTheGo[c];
    console.log("Updating: " + otgURL);
    const otgInformation = await scraper.scrapeDiningCourtInfo(otgURL);

    try {
      // Get dining court from database
      let dbDiningCourt = await DiningCourt.findOne({
        name: otgInformation.name,
      });

      // Create dining court entry if it doesn't exist
      if (!dbDiningCourt) {
        dbDiningCourt = new DiningCourt({
          name: otgInformation.name,
          address: otgInformation.address,
          schedule: [],
        });
      }

      // Get today's meal schedule for every meal the dining court serves
      const today = new Date();

      // Get the next week's meal schedule
      for (let i = 0; i < 7; i++) {
        let menuDate = new Date(today);
        menuDate.setDate(menuDate.getDate() + i);
        console.log("Getting menu for: " + menuDate);

        // Parse date for database
        const day = menuDate.getDate();
        const month = menuDate.getMonth() + 1;
        const year = menuDate.getFullYear();
        const dateString = month + "/" + day + "/" + year;

        // Create menu day
        const menuDay = {
          date: dateString,
          menus: [],
        };

        // Build the menus this dining court serves
        for (const meal of otgInformation.serves) {
          // Get meal info
          const mealInfo = await scraper.scrapeMealMenu(otgURL, today, meal);

          // Store basic meal info
          const menuObject = {
            menuType: mealInfo.mealType,
            timeServed: mealInfo.timeServed,
            stations: [],
          };

          // Get station info
          for (const station of mealInfo.stations) {
            const stationObject = {
              name: station.name,
              foods: [],
            };

            // Get food information
            for (const food of station.foods) {
              let dbFood = await Food.findOne({ name: food.foodName });

              // Scrape the food if it doesn't exist, or if we want to update everything we come across.
              if (!dbFood) {
                // NEW FOOD
                console.log("Adding food: " + food.foodName);
                const foodInfo = await scraper.scrapeFoodInfo(food.foodURL);

                // "Wedge salad bowl" prevention. When a "nonexistant" food is actually in the database under a different alias.
                dbFood = await Food.findOne({ name: foodInfo.name });

                if (!dbFood) {
                  dbFood = new Food(foodInfo);
                  let doc = await dbFood.save();
                  stationObject.foods.push(doc._id);
                } else {
                  dbFood = await Food.findOneAndUpdate(
                    { name: foodInfo.name },
                    foodInfo,
                    { new: true }
                  );

                  stationObject.foods.push(dbFood._id);
                }
              } else if (alwaysUpdateFood) {
                // UPDATE FOODS
                const foodInfo = await scraper.scrapeFoodInfo(food.foodURL);
                dbFood = await Food.findOneAndUpdate(
                  { name: food.foodName },
                  foodInfo,
                  { new: true }
                );
                stationObject.foods.push(dbFood._id);
              } else {
                // DON'T UPDATE FOODS
                stationObject.foods.push(dbFood._id);
              }
            }
            // Push station info onto meal info
            menuObject.stations.push(stationObject);
          }
          menuDay.menus.push(menuObject);
        }

        dbDiningCourt.schedule.push(menuDay);
      }

      await dbDiningCourt.save();
    } catch (err) {
      console.error(err);
    }
  }
  await scraper.close();
  console.log("Closed");
  process.exit();
}

updateDB(false);
