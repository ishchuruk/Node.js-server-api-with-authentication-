const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const adminSchema = new Schema({
   id: {
      type: Schema.Types.ObjectId
   },
   name: {
      type: String
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      required: true
   }
});

module.exports = mongoose.model('admins', adminSchema)