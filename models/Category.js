const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

//veri tabanımızda oluşacak olan kurs dökümanlarının yapısının ne olacağını buradaki şablon sayesinde belirliyorduk.
const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
 
  slug: {
    type: String,
    unique: true,
  }
});

CategorySchema.pre('validate', function(next){
  this.slug = slugify(this.name, {
    lower:true,
    strict:true
  })
  next();
})

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
