const Promotion = require('../models/promotion.model.js');
const Schema = require('../models/schema.model.js');

exports.createPromotion = (req, res) => {
  const promotion = new Promotion(req.body);
  promotion.save().then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).json({
      message: "Fail!",
      error: err.message
    });
  });
};
exports.promotions = async (req, res) => {
  const item = req.params.index;
  let i = Number.parseInt(item)
  await Promotion.find().select('-__v').skip(i).limit(30).then(promotionInfos => {
    // await Promotion.find().select('-__v').limit(i + 10).then(promotionInfos => {
    res.status(200).json(promotionInfos);
  }).catch(error => {
    // log on console
    console.log(error);
    res.status(500).json({
      message: "Error!",
      error: error
    });
  });
};
exports.getPromotion = (req, res) => {
  Promotion.findById(req.params.id).select('-__v')
    .then(promotion => {
      res.status(200).json(promotion);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Promotion not found with id " + req.params.id,
          error: err
        });
      }
      return res.status(500).send({
        message: "Error retrieving Promotion with id " + req.params.id,
        error: err
      });
    });
};
exports.duplicatePromotion = (req, res) => {
  delete req.body._id;
  const promotion = new Promotion(req.body);
  // Save a Promotion in the MongoDB
  promotion.save().then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).json({
      message: "Fail!",
      error: err.message
    });
  });
}
exports.updatePromotion = (req, res) => {
  Promotion.findByIdAndUpdate(req.body._id, req.body
  ).select('-__v')
    .then(promotion => {
      if (!promotion) {
        return res.status(404).send({
          message: "Error -> Can NOT update a promotion with id = " + req.body._id,
          error: "Not Found!"
        });
      }

      res.status(200).json(promotion);
    }).catch(err => {
      return res.status(500).send({
        message: "Error -> Can not update a promotion with id = " + req.body._id,
        error: err.message
      });
    });
};
exports.deletePromotion = (req, res) => {
  let promotionId = req.params.id

  Promotion.findByIdAndRemove(promotionId).select('-__v -_id')
    .then(promotion => {
      if (!promotion) {
        res.status(404).json({
          message: "Does Not exist a Promotion with id = " + promotionId,
          error: "404",
        });
      }
      res.status(200).json({});
    }).catch(err => {
      return res.status(500).send({
        message: "Error -> Can NOT delete a promotion with id = " + promotionId,
        error: err.message
      });
    });
};
