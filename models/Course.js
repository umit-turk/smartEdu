const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

//veri tabanımızda oluşacak olan kurs dökümanlarının yapısının ne olacağını buradaki şablon sayesinde belirliyorduk.
const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  }
});

CourseSchema.pre('validate', function(next){
  this.slug = slugify(this.name, {
    lower:true,
    strict:true
  })
  next();
})

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
