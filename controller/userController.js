const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.userRegister = async (req,res) => {
 try {
   const {name, email, password, role} = req.body;

  if(!name || !email || !password){
    return res.json({success:false, message: 'fill all the field'})
  }

  const existUser = await User.findOne({email})
  if(existUser){
    return res.json({success:false, message: 'user already exist'})
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({
    name, 
    email, 
    password: hashedPassword,
    role: role || 'user'
  });

  const token = jwt.sign(
    {id: newUser._id, role: newUser.role},
    process.env.JWT_SECRET,
    {expiresIn: '3h'}
  )


  res.json({
    success:true,
    message: 'user created successfully',
    token, 
    user:{
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  })
 } catch (error) {
  console.log(error)
  res.json({success:false, message: error.message})
 }
};

// exports.userLogin = async (req,res) => {
//   try {
//     const {email, password} = req.body;

//     console.log(req.body);
//     console.log(email);

//     const user = await User.findOne({email});
//     if(!user) return res.json({success: false, message: 'user Not found'})
    
//     const isMatch = await bcrypt.compare(password, user.password)

//     if(!isMatch) return res.json({success:false, message: "user Not found"})

//      const token = jwt.sign(
//     {id: newUser._id, role: newUser.role},
//     process.env.JWT_SECRET,
//     {expiresIn: '3h'}
//   )

//   res.json({success: true, message: "user login successfully", 
//     user:{
//       id: newUser._id,
//       name: newUser.name,
//       email: newUser.email,
//       role: newUser.role
//     }
//   })
    
//   } catch (error) {
//     console.log(error);
//     res.json({success:false, message: error.message})
//   }
// }

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "user Not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password or email"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.json({
      success: true,
      message: "user login successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json({success: true, users}) 
  } catch (error) {
    
  }
}

exports.deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.json({
        success: false,
        message: "user not found"
      });
    }


    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "user deleted"
    });

  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    });
  }
};

exports.adminLogin = async (req,res) => {
  try {
    const {email, password} = req.body;

    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
      return res.json({success: false, message: 'wrong email or password'})
    }

    const token = jwt.sign({role: 'admin'}, process.env.JWT_SECRET, {expiresIn: '1h'})

    res.json({success:true, message: 'login success', token})
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    });
  }
}

// exports.adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
//       return res.json({ success: false, message: 'wrong email or password' });
//     }

//     // 🚨 FIX: Include the role explicitly in the token payload matrix
//     const token = jwt.sign(
//       { role: 'admin' }, 
//       process.env.JWT_SECRET, 
//       { expiresIn: '1h' }
//     );

//     // 🚨 FIX: Return a structured 'user' object matching your standard signup/login signature
//     return res.json({
//       success: true,
//       message: 'login success',
//       token,
//       user: {
//         name: "System Administrator",
//         email: email,
//         role: "admin" // This is what the frontend will look for
//       }
//     });

//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       message: error.message
//     });
//   }
// };