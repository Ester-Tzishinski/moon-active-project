const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
// Configuring the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');
const Promotion = require('./app/models/promotion.model.js');
const Schema = require('./app/models/schema.model');
const getSchema = require('./app/controllers/schema.controller')
const { json } = require('body-parser');
mongoose.Promise = global.Promise;
//////////////////////
app.get('/promotion', function (req, res) {
  res.header("Content-Type", 'application/json');
  res.send(JSON.stringify(promotion));
})
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Successfully connected to MongoDB.");
  }).catch(err => {
    console.log('Could not connect to MongoDB.', err);
    process.exit();
  });
let names = [], types = [], o = [], myPromotions = [], mySchema = [];

// const mySchema = await Schema.find({}, { '_id': 0, 'type': 0 });
// return mySchema;
Schema.find({}, { '_id': 0 }).then(schemaInfos => {
  mySchema = JSON.stringify(schemaInfos);
  mySchema = JSON.parse(mySchema);
  // for (let i = 0; i < 2; i++) {
  //   let promotion = {};
  //   for (let j = 0; j < mySchema.length; j++) {
  //     const myName = mySchema[j].fieldName;
  //     console.log("name", myName);
  //     switch (mySchema[j].type) {
  //       case 'Number':
  //         promotion[myName] = Math.floor((Math.random() + 1) * 10);
  //         break;
  //       case 'String': {
  //         // promotion[names[j]] = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7);
  //         promotion[myName] = (i + 1).toString();
  //       }
  //         break;
  //       case 'Date':
  //         promotion[myName] = new Date();
  //         break;
  //       case 'enum':
  //         e = Math.floor((Math.random()) * 3);
  //         switch (e) {
  //           case 0:
  //             promotion[myName] = 'Basic'
  //             break;
  //           case 1:
  //             promotion[myName] = 'Common'
  //             break;
  //           case 2:
  //             promotion[myName] = 'Epic'
  //             break;
  //         }
  //         break;
  //     }
  //   }
  //   promotion = new Promotion(promotion);
  //   console.log("new promotion", promotion);
  //   promotion.save();
  //   // Promotion.create([myPromotions])
  // }
})

require('./app/routes/promotion.router.js')(app);
require('./app/routes/schema.router.js')(app);
var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
})