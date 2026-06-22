const propertyModel = require('../models/propertyModel')


// exports.addProperty = async(req, res) => {
//   try {
//     const property =  new propertyModel({
//       title: req.body.title,
//       description: req.body.description,
//       location: req.body.location,
//       type: req.body.type,
//       image: req.file.filename
//     })

//     const saveProperty = await property.save();
//     if(saveProperty) {
//       res.json({success:true, message: 'property added successfully', data: saveProperty})
//     }
//   } catch (error) {
//     console.log(error)
//     res.json({success:false, message: error.message})
//   }
// }

exports.addProperty = async (req, res) => {
  try {

    

    if (!req.file) {
      return res.json({ success: false, message: "Image missing" });
    }
    
    if (!req.user) {
      return res.json({
        success: false,
        message: "Unauthorized user"
      });
    }
    const property = new propertyModel({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      type: req.body.type,
      images: req.file.filename,
      expense: req.body.expense,
      bedroom: req.body.bedroom,
      bathroom: req.body.bathroom,
      ownerId: req.user.id
    });


    const saveProperty = await property.save();

    return res.json({
      success: true,
      message: "property added successfully",
      data: saveProperty
    });

  } catch (error) {
    console.log("ERROR:", error);
    return res.json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllProperties = async (req,res) => {
  try {
    const property = await propertyModel.find();
    res.json({success: true, data: property})
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
  }
}

exports.getPropertyById = async (req, res) => {
  try {
    const property = await propertyModel.findById(req.params.id);

    if (!property) {
      return res.json({
        success: false,
        message: "Property not found"
      });
    }

    res.json({
      success: true,
      data: property
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// exports.deleteProperty = async (req, res) => {
//   try {
//     const property = await propertyModel.findById(req.params.id);
//     if(!property){
//       res.json({success: false, message: "property not found"})
//     }
//     await propertyModel.findByIdAndDelete(req.params.id);
//     res.json({success: true, message: "property deleted successfully"})
//   } catch (error) {
//     console.log(error);
//     res.json({success: false, message: error.message})
//   }
// }

exports.getPropertyStats = async (req, res) => {
  try {
    const apartments = await propertyModel.countDocuments({
      type: "apartment",
    });

    const villas = await propertyModel.countDocuments({
      type: "villa",
    });

    const houses = await propertyModel.countDocuments({
      type: "house",
    });

    const offices = await propertyModel.countDocuments({
      type: "office",
    });

    res.json({
      success: true,
      stats: {
        apartments,
        villas,
        houses,
        offices,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyProperties = async (req, res) => {
  try {
    const properties = await propertyModel.find({ ownerId: req.user.id });

    res.json({
      success: true,
      data: properties
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.getAllPropertiesAdmin = async (req, res) => {
  try {

    const properties = await propertyModel.find()
      .populate("ownerId", "name email");

    res.json({
      success: true,
      data: properties
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

exports.updateProperty = async (req, res) => {
  try {

    const property = await propertyModel.findById(req.params.id);

    if (!property) {
      return res.json({
        success: false,
        message: "Property not found"
      });
    }

    if (property.ownerId.toString() !== req.user.id) {
      return res.json({
        success: false,
        message: "Unauthorized"
      });
    }

    const updatedProperty =
      await propertyModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json({
      success: true,
      data: updatedProperty
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteProperty = async (req, res) => {
  try {

    const property = await propertyModel.findById(req.params.id);

    if (!property) {
      return res.json({
        success: false,
        message: "Property not found"
      });
    }

    if (property.ownerId.toString() !== req.user.id) {
      return res.json({
        success: false,
        message: "Unauthorized"
      });
    }

    await propertyModel.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Property deleted"
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
