const mongoose = require('mongoose');
const mongooseURL = "mongodb+srv://amany29074:22124006@khanakhojo.xizkwpq.mongodb.net/KhanaKhojoMERN?retryWrites=true&w=majority&appName=KhanaKhojo";   //KhanaKhojoMERN

const mongoDB = async () => {
  try {
    await mongoose.connect(mongooseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
    
    const food_items = await mongoose.connection.db.collection("food_items").find({}).toArray();
    const food_category = await mongoose.connection.db.collection("food_Category").find({}).toArray();
    console.log(food_category);
    global.food_items = food_items;
    global.food_category= food_category;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;
