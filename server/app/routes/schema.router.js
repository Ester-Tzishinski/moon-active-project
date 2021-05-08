module.exports = function (app) {

    var schema = require('../controllers/schema.controller.js');
    app.get('/api/schema', schema.schema);
}