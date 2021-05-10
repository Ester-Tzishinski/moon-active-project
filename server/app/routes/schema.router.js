const schema = require('../controllers/schema.controller.js');
module.exports = function (app) {

    app.get('/api/schema', schema.schema);
}