const express = require("express");
const pageRoute = require('./routes/pageRoute');

const app = express();

//Template Engine 
app.set("view engine", "ejs");

//Middlewears
app.use(express.static("public"))//static dosyaları ğublic klosöründe olacak.

//Routes
app.use("/", pageRoute);// / ile ilgili istek geldiğinde bunu pageRote yönlendir.



const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
