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

  // Get Earhart information
  const earhartURL = urls.diningCourts[0];
  const earhartInformation = await scraper.scrapeDiningCourtInfo(earhartURL);

  try {
    // Get dining court from database
    let dbDiningCourt = await DiningCourt.findOne({
      name: earhartInformation.name,
    });

    // Create dining court entry if it doesn't exist
    if (!dbDiningCourt) {
      dbDiningCourt = new DiningCourt({
        name: earhartInformation.name,
        address: earhartInformation.address,
        schedule: [],
      });
    }

    // Get today's meal schedule for every meal the dining court serves
    const today = new Date();

    //
    for (const meal of earhartInformation.serves) {
      // Get meal info
      const mealInfo = await scraper.scrapeMealMenu(earhartURL, today, meal);

      // Store basic meal info
      const mealObject = {
        date: mealInfo.date,
        mealType: mealInfo.mealType,
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
        mealObject.stations.push(stationObject);
      }
      dbDiningCourt.schedule.push(mealObject);
    }

    await dbDiningCourt.save();
  } catch (err) {
    console.error(err);
  }

  await scraper.close();
  console.log("Closed");
  process.exit();
}

updateDB(false);
