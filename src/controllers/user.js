const User = require('../models/user')

module.exports.addNew = async (req, res) => {
   const data = req.body
   const candidate = await User.findOne({email: data.email})

   if (candidate) {
      res.status(409).json({msg: "user with such email already exist"})
   } else {
      const newUser = new User({
         name: data.name,
         email: data.email,
         age: data.age,
         city: data.city,
         phone: data.phone, 
         accessLvl: data.accesslvl,
         addedBy: data.addedBy
      })

      try {
         await newUser.save()
         res.status(201).json({msg: `New user ${newUser.name} was added`})
      } catch(e) {
         console.log(e)
      }
   }
}

module.exports.delete = async (req, res) => {
   const data = req.body;
   const candidate = await User.findOne({email: data.email})

   if (candidate) {
      try {
         await User.deleteOne({_id: candidate._id}) 
         res.status(201).json({msg: `User ${candidate.name} has been removed`})
      } catch(e) {
         console.log(e)
      }
   } else {
      res.status(404).json({msg: 'Such user doesn\'t exist'})
   }
}

module.exports.edit = async (req, res) => {
   const data = req.body
   const candidate = await User.findOne({email: data.email})

   if (candidate) {
      await User.updateOne({_id: candidate._id}, {$set: data})
      res.status(201).json({msg: 'User\'s data updated'})
   } else {
      res.status(404).json({msg: `User with such email not found`})
   }
}