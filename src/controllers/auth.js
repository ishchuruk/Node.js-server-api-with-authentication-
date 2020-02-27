const jwt =require('jsonwebtoken')
const bcrypt = require('bcrypt')
const keys = require('../config/config')

const Admin = require('../models/admin');

module.exports.login = async (req, res) => {
   const data = req.body

   const candidate = await Admin.findOne({email: data.email})

   if (candidate) {
      const passwordResult = bcrypt.compareSync(data.password, candidate.password)

      if (passwordResult) {
         const token = jwt.sign({
            email: candidate.email,
            adminID: candidate._id
         }, keys.jwt, {expiresIn: 60 * 60})
         req.session.currentToken = `Bearer ${token}`
         res.status(200).json({msg: "Successfuly authorized", token: req.session.currentToken})
      } else {
         res.status(401).json({msg: "Password doesn't match"})
      }
   } else {
      res.status('404').json({msg: "Admin not found"})
   }
} 

module.exports.register = async function(req, res) {
   const data = req.body

   const candidate = await Admin.findOne({email: data.email})

   if (candidate) {
      res.status(409).json({msg: "Such email already exist in list of admins"})
   } else {
      const salt = bcrypt.genSaltSync(10);

      const newAdmin = new Admin({
         name: data.name,
         email: data.email,
         password: bcrypt.hashSync(data.password, salt),
         role: data.role
      }) 
      console.log(newAdmin)

      try {
         await newAdmin.save()
         res.status(201).json(newAdmin)
      } catch (error) {
         console.log(error)
      }
   }
}