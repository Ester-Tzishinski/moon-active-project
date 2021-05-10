const promotions = require('../controllers/promotion.controller.js');
module.exports = function (app) {

  app.post('/api/promotions', promotions.makePromotions);

  app.post('/api/promotion', promotions.createPromotion);
  app.get('/api/promotion/:id', promotions.getPromotion);
  app.get('/api/promotions/:index', promotions.promotions);

  app.put('/api/promotion', promotions.updatePromotion);
  app.post('/api/promotion/duplicate', promotions.duplicatePromotion);
  app.delete('/api/promotion/:id', promotions.deletePromotion);
}