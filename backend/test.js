const mongoose = require('mongoose');
const menu = require('./models/Food_Items').fooditems;
const  category=require('./models/Food_Items').foodcategory;
const mongoURI='mongodb://foodParadise:w08mQyQe1le53L4X@ac-hrdmlwa-shard-00-00.orraka2.mongodb.net:27017,ac-hrdmlwa-shard-00-01.orraka2.mongodb.net:27017,ac-hrdmlwa-shard-00-02.orraka2.mongodb.net:27017/foodParadise?ssl=true&replicaSet=atlas-hqoqff-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
var dbcourse = [];
category.find({ CategoryName: "Biryani/Rice"})
	.then(data => {
		console.log("Biryani Items:")
		console.log(data);
		data.map((d, k) => {
			dbcourse.push(d._id);
		})
		menu.find({ CategoryName: { $in: dbcourse } })
			.then(data => {
				console.log("Menu Under Biryani Items:")
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			})
	})
	.catch(error => {
		console.log(error);
	})
