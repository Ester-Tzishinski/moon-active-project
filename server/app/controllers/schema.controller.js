const Schema = require('../models/schema.model.js');
exports.schema = (req, res) => {
    Schema.find().select('-__v').then(schemaInfos => {
        return  res.status(200).json(schemaInfos);
    }).catch(error => {
        // log on console
        console.log(error);
        return res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};
