const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');
const Schema = require('./app/models/schema.model');
const { json } = require('body-parser');

mongoose.Promise = global.Promise;

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
let mySchema = [];

Schema.find({}, { '_id': 0 }).then(schemaInfos => {
  mySchema = JSON.stringify(schemaInfos);
  mySchema = JSON.parse(mySchema);
})

require('./app/routes/promotion.router.js')(app);
require('./app/routes/schema.router.js')(app);
const server = app.listen(8080, function () {
  const host = server.address().address
  const port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
})