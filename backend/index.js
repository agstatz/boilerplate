/**
 * index.js
 * entry point of the API Server
 * 
 * @author Ashton Statz, Dawson Smith, Arjan Mobin
 */

// require prerequisites
 const express = require('express');
 const fs = require('fs');
 const cors = require("cors");
 const mongoose = require("mongoose");
 const bodyParser = require("body-parser");
 const dbm = require("./models");
 const PrivilegeClass = dbm.privilege_classes;
 const MongoClient = require('mongodb').MongoClient;
 const connectDB = require('./config/db');
 const app = express();

 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 


// require routes
require('./api/authRoutes')(app);

// internal config
 const url = "mongodb+srv://boilerplate:boilerPlate407!!@cluster0.ggera.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; // Change url as needed, this is default if hosting locally
 //const url = "mongodb://localhost:27017"
 const tableUrl = "mongodb://localhost:27017/boilerplate"; // likewise to above
 const requireDatabase = true; // If false, disables startup of database
 const importJSONs = false; // If false, will restrict the importing of JSON files into the database
 const exportJSONs = false; // If false, will restrict the exporting of the database collections as a JSON

//connectDB();


// Create an Express application
 const corsOptions ={
    origin: "*",
    credentials:true,
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Food route
app.use('/api/foods', require('./routes/foods'));
app.use('/api/meal-plans', require('./routes/mealplans'));
app.use('/api/dining-locations', require('./routes/diningLocations'));

// allows requests from host
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // change address to frontend host if needed
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/test", (req, res) => {
  res.json({ message: "working" });
});
const PORT = process.env.PORT || 3001;
console.log(PORT);
app.listen(PORT, () => { });


app.get('/Foods', (req, res) => {
  let search = req.query.search
  let tags = req.query.tags
  let include = req.query.include
  let exclude = req.query.exclude
  let diet = req.query.diet
  let group = req.query.group
  let cuisine = req.query.cuisine

  if (search == null || search === "undefined") {
    search = "";
  }

  if (diet == null || diet === "any" || diet === "undefined") {
    diet = "";
  }

  if (group == null || group === "any" || group === "undefined") {
    group = "";
  }
  if (cuisine == null || cuisine === "any" || cuisine === "undefined") {
    cuisine = "";
  }

  if (tags == null || tags === "undefined" || tags === "") {
    tags = [];
    console.log("null")
  } else {
    tags = tags.split(",")
    console.log(tags)
  }

  if (include == null || include === "undefined" || include === "") {
    include = [];
  }
  if (exclude == null || exclude === "undefined" || include === "") {
    exclude = []
  }


  console.log(include);

  MongoClient.connect(url, function(err, dbt) {
    if (err) throw err;
    let db = dbt.db("boilerplate");
    db.collection("foods").find({}).toArray(function(err, result) {
      if (err) throw err;
      result2 = result.map(s => [
          s.name, //0
          s.totalfat, //1
          s.saturatedFat, //2
          s.cholesterol, //3
          s.sodium, //4
          s.totalCarbohydrate, //5
          s.sugar, //6
          s.addedSugar, //7
          s.dietaryFiber, //8
          s.protein, //9
          s.calcium, //10
          s.iron, //11
          s.dietaryTags //12
      ])
      result = result.map(a => a.name); //filters only the names of foods
      result = result.filter(s => s.toLowerCase().includes(search.toLowerCase())); //filters foods accordingly to search

      for (let i = 0; i < result2.length; i++) {
        let food = result2[i]

        if (include.includes("Total Fat")) {
          if (food[1] == null || food[1] === "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (exclude.includes("Total Fat")) {
          if (food[1] != null && food[1] !== "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (include.includes("Saturated Fat")) {
          if (food[2] == null || food[2] === "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (exclude.includes("Saturated Fat")) {
          if (food[2] != null && food[2] !== "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (include.includes("Cholesterol")) {
          if (food[3] == null || food[3] === "0mg") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (exclude.includes("Cholesterol")) {
          if (food[3] != null && food[3] !== "0mg") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (include.includes("Sodium")) {
          if (food[4] == null || food[4] === "0mg") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (exclude.includes("Sodium")) {
          if (food[4] != null && food[4] !== "0mg") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (include.includes("Carbohydrate")) {
          if (food[5] == null || food[5] === "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (exclude.includes("Carbohydrate")) {
          if (food[5] != null && food[5] !== "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }

        if (include.includes("Sugar")) {
          if (food[6] == null || food[6] === "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (exclude.includes("Sugar")) {
          if (food[6] != null && food[6] !== "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (include.includes("Added Sugar")) {
          if (food[7] == null || food[7] === "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (exclude.includes("Added Sugar")) {
          if (food[7] != null && food[7] !== "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (include.includes("Dietary Fiber")) {
          if (food[8] == null || food[8] === "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (exclude.includes("Dietary Fiber")) {
          if (food[8] != null && food[8] !== "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (include.includes("Protein")) {
          if (food[9] == null || food[9] === "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (exclude.includes("Protein")) {
          if (food[9] != null && food[9] !== "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (include.includes("Calcium")) {
          if (food[10] == null || food[10] === "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (exclude.includes("Calcium")) {
          if (food[10] != null && food[10] !== "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (include.includes("Iron")) {
          if (food[11] == null || food[11] === "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        if (exclude.includes("Iron")) {
          if (food[11] != null && food[11] !== "0g") {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
        for (let j = 0; j < tags.length; j++) {
          if (!food[12].includes(tags[j])) {
            if (result.indexOf(food[0]) !== -1) result.splice(result.indexOf(food[0]), 1);
          }
        }
      }
      result = result.sort((a, b) => a.localeCompare(b)); //sorts tags alphabetically
      console.log(result)
      res.send(result);
    });
  });
  console.log('/foods sent');
})
app.get('/Food', (req, res) => {
  let queryName = req.query.name
  queryName = queryName.split('_').join(' ');
  console.log(queryName);

  MongoClient.connect(url, function(err, dbt) {
    if (err) throw err;
    let db = dbt.db("boilerplate");
    db.collection("foods").find({ name : queryName }).toArray(function(err, result) {
      console.log(result)
      if (err) throw err;
      res.send(result);
    });
  });
  console.log('/food sent');
})


app.get('/Nutrition', (req, res) => {

  MongoClient.connect(url, function(err, dbt) {
    if (err) throw err;
    let db = dbt.db("boilerplate");
    db.collection("filters").find({ name:"nutritions" }).toArray(function(err, result) {
      if (err) throw err;
      result = result.map(a => a.list); //filters only the names of foods
      result = result[0];
      result = result.sort((a, b) => a.localeCompare(b)); //sorts names alphabetically
      console.log(result);
      res.send(result);
    });
  });
  console.log('/nutrition sent');
})

app.get('/Diet', (req, res) => {

  MongoClient.connect(url, function(err, dbt) {
    if (err) throw err;
    let db = dbt.db("boilerplate");
    db.collection("filters").find({ name:"diets" }).toArray(function(err, result) {
      if (err) throw err;
      result = result.map(a => a.list); //filters only the names of foods
      result = result[0];
      result = result.sort((a, b) => a.localeCompare(b)); //sorts names alphabetically
      result.unshift("Any");
      console.log(result);
      res.send(result);
    });
  });
  console.log('/Diet sent');
})

app.get('/Group', (req, res) => {

  MongoClient.connect(url, function(err, dbt) {
    if (err) throw err;
    let db = dbt.db("boilerplate");
    db.collection("filters").find({ name:"groups" }).toArray(function(err, result) {
      if (err) throw err;
      result = result.map(a => a.list); //filters only the names of foods
      result = result[0];
      result = result.sort((a, b) => a.localeCompare(b)); //sorts names alphabetically
      result.unshift("Any");
      console.log(result);
      res.send(result);
    });
  });
  console.log('/Group sent');
})

app.get('/Cuisine', (req, res) => {

  MongoClient.connect(url, function(err, dbt) {
    if (err) throw err;
    let db = dbt.db("boilerplate");
    db.collection("filters").find({ name:"cuisines" }).toArray(function(err, result) {
      if (err) throw err;
      result = result.map(a => a.list); //filters only the names of foods
      result = result[0];
      //result = result.sort((a, b) => a.localeCompare(b)); //sorts names alphabetically
      result.unshift("Any");
      console.log(result);
      res.send(result);
    });
  });
  console.log('/Cuisine sent');
})

app.get('/Tags', (req, res) => {

  MongoClient.connect(url, function(err, dbt) {
    if (err) throw err;
    let db = dbt.db("boilerplate");
    db.collection("filters").find({ name:"tags" }).toArray(function(err, result) {
      if (err) throw err;
      result = result.map(a => a.list); //filters only the names of tags
      console.log(result);
      result = result[0];
      result = result.sort((a, b) => a.localeCompare(b)); //sorts tags alphabetically
      console.log(result);
      console.log('done');
      res.send(result);
    });
  });
  console.log('/tags sent');
})

//Send list of all dining courts
app.get('/Dining_Courts', (req, res) => {
  MongoClient.connect(url, function(err, dbt) {
    if (err) throw err;
    let db = dbt.db("boilerplate");

    db.collection("locations").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      console.log('done');
      res.send(result)
    });
  });
  console.log('/Dining_Courts sent');
})

app.get('/Dining_Court', (req, res) => {

  let name = req.query.name
  let date = req.query.date
  let meal = req.query.meal

  MongoClient.connect(url, function(err, dbt) {
    if (err) throw err;
    let db = dbt.db("boilerplate");
    db.listCollections({name: name + "_Schedule"})
        .next(function(err, collinfo) {
          if (collinfo) {//Dining court exists
            console.log(date + "_" + meal);
            db.collection(name + "_Schedule").find({ name:date + "_" + meal}).toArray(function(err, result) {
              if (err) throw err;
              if (result.length === 0) {//schedule does not exist
                res.status(404).send("Schedule does not exist")
              } else {
                res.send(result)
              }
            });
          } else {//Dining court does not exist
            res.status(404).send("Dining court " + name + "does not exist")
          }
        });
  });
  console.log('/Dining_Courts sent');
})

app.get('/Picture', (req, res) => {
  console.log(__dirname + "\\data\\" + req.query.picturename + ".jpg");
  res.sendFile(__dirname + "\\data\\Pictures\\" + req.query.picturename + ".jpg")
  console.log('/Picture sent');
  console.log(__dirname)
})

// Ensure database exists
try {
  if (requireDatabase) {
    MongoClient.connect(url, function(err, dbt) {
      console.log('conected')
      if (err) throw err;
      var db = dbt.db("boilerplate");
      db.createCollection("users", function(err, res) {});
      db.createCollection("privilege_classes", function(err, res) {});
      db.createCollection("foods", function(err, res) {});
      db.createCollection("food_categories", function(err, res) {});
      db.createCollection("visits", function(err, res) {});
      db.createCollection("intake_plans", function(err, res) {});
      db.createCollection("meal_plans", function(err, res) {});
      db.createCollection("universities", function(err, res) {});
      db.createCollection("locations", function(err, res) {});
      db.createCollection("course_schedules", function(err, res) {});
      db.createCollection("comments", function(err, res) {});
      db.createCollection("comment_reports", function(err, res) {});
      db.createCollection("tags", function(err, res) {});
      db.createCollection("misc", function(err, res) {});
      db.createCollection("replies", function(err, res) {});
      db.createCollection("reply_reports", function(err, res) {dbt.close();});
    });
  }
}
catch (error) {
 console.log(error);
}

// This function will export all tables into the respective files in ../data
function exportTables() {
  if (exportJSONs) {
    MongoClient.connect(url, function(err, dbt) {
      if (err) throw err;
      console.log("exporting")
      var db = dbt.db("boilerplate");
      db.collection("users").find({}).toArray(function(err, res) {fs.writeFileSync('./data/users.json', JSON.stringify(res));});
      db.collection("comment_reports").find({}).toArray(function(err, res) {fs.writeFileSync('./data/comment_reports.json', JSON.stringify(res));});
      db.collection("comments").find({}).toArray(function(err, res) {fs.writeFileSync('./data/comments.json', JSON.stringify(res));});
      db.collection("course_schedules").find({}).toArray(function(err, res) {fs.writeFileSync('./data/course_schedules.json', JSON.stringify(res));});
      db.collection("food_categories").find({}).toArray(function(err, res) {fs.writeFileSync('./data/food_categories.json', JSON.stringify(res));});
      db.collection("foods").find({}).toArray(function(err, res) {fs.writeFileSync('./data/foods.json', JSON.stringify(res));});
      db.collection("intake_plans").find({}).toArray(function(err, res) {fs.writeFileSync('./data/intake_plans.json', JSON.stringify(res));});
      db.collection("locations").find({}).toArray(function(err, res) {fs.writeFileSync('./data/locations.json', JSON.stringify(res));});
      db.collection("meal_plans").find({}).toArray(function(err, res) {fs.writeFileSync('./data/meal_plans.json', JSON.stringify(res));});
      db.collection("replies").find({}).toArray(function(err, res) {fs.writeFileSync('./data/replies.json', JSON.stringify(res));});
      db.collection("misc").find({}).toArray(function(err, res) {fs.writeFileSync('./data/misc.json', JSON.stringify(res));});
      db.collection("tags").find({}).toArray(function(err, res) {fs.writeFileSync('./data/tags.json', JSON.stringify(res));});
      db.collection("reply_reports").find({}).toArray(function(err, res) {fs.writeFileSync('./data/reply_reports.json', JSON.stringify(res));});
      db.collection("universities").find({}).toArray(function(err, res) {fs.writeFileSync('./data/universities.json', JSON.stringify(res));});
      db.collection("visits").find({}).toArray(function(err, res) {fs.writeFileSync('./data/visits.json', JSON.stringify(res)); dbt.close();});
    });
  }
}

// This function will import all files in ../data to each respective table
function importTables() {
  if (importJSONs) {
    console.log("importing")
    MongoClient.connect(url, function(err, dbt) {
      var db = dbt.db("boilerplate");
      var data = JSON.parse(fs.readFileSync('./data/users.json').toString());
      db.collection("users").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/comment_reports.json').toString());
      db.collection("comment_reports").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/comments.json').toString());
      db.collection("comments").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/course_schedules.json').toString());
      db.collection("course_schedules").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/food_categories.json').toString());
      db.collection("food_categories").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/foods.json').toString());
      db.collection("foods").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/intake_plans.json').toString());
      db.collection("intake_plans").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/locations.json').toString());
      db.collection("locations").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/meal_plans.json').toString());
      db.collection("meal_plans").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/replies.json').toString());
      db.collection("replies").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/reply_reports.json').toString());
      db.collection("reply_reports").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/universities.json').toString());
      db.collection("universities").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/misc.json').toString());
      db.collection("misc").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/tags.json').toString());
      db.collection("tags").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/visits.json').toString());
      db.collection("visits").insertMany(data ,function(err, res) {dbt.close();});
      console.log("import done")
    });
  } else {
    console.log("not importing")
  }
}

// This function will import all files in ../data to each respective table after clearing them
function overrideTables() {
  if (importJSONs) {
    MongoClient.connect(url, function(err, dbt) {
      if (err) throw err;
      var db = dbt.db("boilerplate");
      var data = JSON.parse(fs.readFileSync('./data/users.json').toString());
      db.collection("users").deleteMany({}, function(err, res) {});
      db.collection("users").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/comment_reports.json').toString());
      db.collection("comment_reports").deleteMany({}, function(err, res) {});
      db.collection("comment_reports").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/comments.json').toString());
      db.collection("comments").deleteMany({}, function(err, res) {});
      db.collection("comments").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/course_schedules.json').toString());
      db.collection("course_schedules").deleteMany({}, function(err, res) {});
      db.collection("course_schedules").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/food_categories.json').toString());
      db.collection("food_categories").deleteMany({}, function(err, res) {});
      db.collection("food_categories").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/foods.json').toString());
      db.collection("foods").deleteMany({}, function(err, res) {});
      db.collection("foods").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/intake_plans.json').toString());
      db.collection("intake_plans").deleteMany({}, function(err, res) {});
      db.collection("intake_plans").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/locations.json').toString());
      db.collection("locations").deleteMany({}, function(err, res) {});
      db.collection("locations").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/meal_plans.json').toString());
      db.collection("meal_plans").deleteMany({}, function(err, res) {});
      db.collection("meal_plans").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/replies.json').toString());
      db.collection("replies").deleteMany({}, function(err, res) {});
      db.collection("replies").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/tags.json').toString());
      db.collection("tags").deleteMany({}, function(err, res) {});
      db.collection("tags").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/misc.json').toString());
      db.collection("misc").deleteMany({}, function(err, res) {});
      db.collection("misc").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/reply_reports.json').toString());
      db.collection("reply_reports").deleteMany({}, function(err, res) {});
      db.collection("reply_reports").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/universities.json').toString());
      db.collection("universities").deleteMany({}, function(err, res) {});
      db.collection("universities").insertMany(data ,function(err, res) {});
      data = JSON.parse(fs.readFileSync('./data/visits.json').toString());
      db.collection("visits").deleteMany({}, function(err, res) {});
      db.collection("visits").insertMany(data ,function(err, res) {dbt.close();});
    });
  }
}