module.exports = function (app) {

  var promotions = require('../controllers/promotion.controller.js');

  app.post('/api/promotion', promotions.createPromotion);
  // app.post('/api/promotions', promotions.promotionsScroll);
  app.get('/api/promotion/:id', promotions.getPromotion);
  app.get('/api/promotions', promotions.promotions);

  app.get('/api/promotions/:index', promotions.promotions);

  app.put('/api/promotion', promotions.updatePromotion);
  app.post('/api/promotion/duplicate', promotions.duplicatePromotion);
  app.delete('/api/promotion/:id', promotions.deletePromotion);
}