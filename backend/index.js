/**
 * index.js
 * entry point of the API Server
 * 
 * @author Ashton Statz, Dawson Smith, Arjan Mobin
 */

 const express = require('express');
 const fs = require('fs');
 const MongoClient = require('mongodb').MongoClient;
 const url = "mongodb://localhost:27017/"; // Change url as needed, this is default if hosting locally
 const requireDatabase = true; // If false, disables startup of database
 const importJSONs = false; // If false, will restrict the importing of JSON files into the database
 const exportJSONs = false; // If false, will restrict the exporting of the database collections as a JSON

// Create an Express application
const app = express();

// Ensure database exists
try {
  if (requireDatabase) {
    MongoClient.connect(url, function(err, dbt) {
      if (err) throw err;
      var db = dbt.db("boilerplate");
      db.createCollection("users", function(err, res) {});
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
      db.createCollection("replies", function(err, res) {});
      db.createCollection("reply_reports", function(err, res) {dbt.close();});
    });
  }
}
catch (error) {
 // ignore
}

// This function will export all tables into the respective files in ../data
function exportTables() {
  if (exportJSONs) {
    MongoClient.connect(url, function(err, dbt) {
      if (err) throw err;
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
      db.collection("reply_reports").find({}).toArray(function(err, res) {fs.writeFileSync('./data/reply_reports.json', JSON.stringify(res));});
      db.collection("universities").find({}).toArray(function(err, res) {fs.writeFileSync('./data/universities.json', JSON.stringify(res));});
      db.collection("visits").find({}).toArray(function(err, res) {fs.writeFileSync('./data/visits.json', JSON.stringify(res)); dbt.close();});
    });
  }
}

// This function will import all files in ../data to each respective table
function importTables() {
  if (importJSONs) {
    MongoClient.connect(url, function(err, dbt) {
      if (err) throw err;
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
      data = JSON.parse(fs.readFileSync('./data/visits.json').toString());
      db.collection("visits").insertMany(data ,function(err, res) {dbt.close();});
    });
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