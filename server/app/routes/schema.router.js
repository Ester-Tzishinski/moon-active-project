module.exports = function (app) {

    const schema = require('../controllers/schema.controller.js');
    app.get('/api/schema', schema.schema);
}