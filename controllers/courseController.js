const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createCourse = async (req, res) => {

  try {
  const course = await Course.create({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    user: req.session.userID
  });
  
    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

// Tüm kursları sıralama işlemi yapacağız
exports.getAllCourses = async (req, res) => {

  try {


  const categorySlug = req.query.categories; //query'den gelen parametreyi yakalayacak.

  const category = await Category.findOne({slug:categorySlug})

  let filter = {};

  if(categorySlug) {
    filter = {category:category._id}
  }

  const courses = await Course.find(filter).sort('-createdAt');

  const categories = await Category.find()
  
    res.status(200).render('courses', {//views 'ın içerisndeki courses.ejs yi render edeceğiz içerisine yakalamış olduğumuz coursesleri göndereceğiz.
      courses,
      categories,
      page_name: 'courses',
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

//tekil kurs için
exports.getCourse = async (req, res) => {

  try {
  const course = await Course.findOne({slug: req.params.slug}).populate('user')
  
    res.status(200).render('course', {//views 'ın içerisndeki courses.ejs yi render edeceğiz içerisine yakalamış olduğumuz coursesleri göndereceğiz.
      course,
      page_name: 'courses',
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

///

exports.enrollCourse = async (req, res) => {

  try {
    
    const user = await User.findById(req.session.userID);
    await user.courses.push({_id:req.body.course_id})//user'ın kurslar alnına yeni bir kurs yerleştiriyoruz
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
