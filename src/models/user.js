const mongoose = require('mongoose')
const Schema = mongoose.Schema
  
const userSchema = new Schema({
   id: {
      type: Schema.Types.ObjectID
   },
   name: {
      type: String,
      default: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   age: {
      type: Number,
      default: 17
   },
   city: {
      type: String,
      default: null
   },
   phone: {
      type: Number,
      default: null,
      unique: true
   },
   accessLvl: {
      type: String,
      default: "basic"
   },
   addedBy: {
      type: String,
      required: true
   }
})

module.exports = mongoose.model('users', userSchema)