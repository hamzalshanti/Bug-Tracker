const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({
      message: 'not found',
    });

  next();
};

const isExist = (model) => {
  return async (req, res, next) => {
    const doc = await mongoose.model(model).findById(req.params.id);
    if (doc) return next();
    return res.status(404).json({
      message: `${model.toLowerCase()} not found`,
    });
  };
};

module.exports = {
  validateObjectId,
  isExist,
};
