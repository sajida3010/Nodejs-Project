const Bootcamp = require('../models/Bootcamp')

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
      status: true,
      result: bootcamps.length,
      data: bootcamps
    })
  } catch(err) {
    res.status(400).json({status: false});
  }
}

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp) {
      return res.status(400).json({status: false});
    }

    res.status(200).json({
      status: true,
      data: bootcamp
    })
  } catch(err) {
    next(err);
    // res.status(400).json({status: false});
  }
}

exports.createBootcamp = async (req, res, next) => {
  try{
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch(err) {
    res.status(400).json({status: false});
  }
}

exports.updateBootcamp = async (req, res, next) => {
  try{
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if(!bootcamp) {
      return res.status(400).json({status: false});
    }

    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch(err) {
    res.status(400).json({status: false});
  }
}

exports.deleteBootcamp = async (req, res, next) => {
  try{
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if(!bootcamp) {
      return res.status(400).json({status: false});
    }
    
    res.status(201).json({
      success: true,
      data: {}
    });
  } catch(err) {
    res.status(400).json({status: false});
  }
}