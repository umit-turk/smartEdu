//kategoriyi oluşturmayı silme ve değiştirmeyi fonksiyonel olarak burada yapacağız.
//sonra bu fonksiyonu çağıracak olan route yi yapacağız routes klasörü içinde.
const Category = require("../models/Category");

exports.createCategory = async (req, res) => {

  try {
  const category = await Category.create(req.body);
  
    res.status(201).json({
      status: "success",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};