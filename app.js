const express = require("express");
const mongoose = require('mongoose')
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');


const app = express();

//Connect db
 mongoose.connect('mongodb://localhost/smartedu-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('DB connected Successfuly')
});

//Template Engine 
app.set("view engine", "ejs");

//Middlewears
app.use(express.static("public"))//static dosyaları ğublic klosöründe olacak.
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Routes
app.use("/", pageRoute);// / ile ilgili istek geldiğinde bunu pageRote yönlendir.
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);



const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
