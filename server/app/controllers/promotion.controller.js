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
  const index = req.params.index;
  const i = Number.parseInt(index)
  console.log("index", i);
  console.log((i - 1) * 30, i * 30);
  await Promotion.find().select('-__v').skip((i - 1) * 30).limit(i * 30).then(promotionInfos => {
    res.status(200).json(promotionInfos);
  }).catch(error => {
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
  const promotionId = req.params.id
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

exports.makePromotions = (req, res) => {
  Schema.find({}, { '_id': 0 }).then(schemaInfos => {
    const mySchema = JSON.parse(JSON.stringify(schemaInfos));
    res.status(200);
    for (const i = 0; i < 100; i++) {
      let promotion = {};
      for (let j = 0; j < mySchema.length; j++) {
        const myName = mySchema[j].fieldName;
        switch (mySchema[j].type) {
          case 'Number':
            promotion[myName] = Math.floor((Math.random() + 1) * 10);
            break;
          case 'String': {
            promotion[myName] = myName + ' ' + i.toString();
          }
            break;
          case 'Date':
            promotion[myName] = new Date();
            break;
          case 'enum':
            e = Math.floor((Math.random()) * 3);
            switch (e) {
              case 0:
                promotion[myName] = mySchema[j].enum[0]
                break;
              case 1:
                promotion[myName] = mySchema[j].enum[2]
                break;
              case 2:
                promotion[myName] = mySchema[j].enum[2]
                break;
            }
            break;
        }
      }
      promotion = new Promotion(promotion);
      promotion.save().then(data => {
        res.status(200)
      })
    }
  })
}