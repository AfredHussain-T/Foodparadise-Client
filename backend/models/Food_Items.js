const mongoose=require('mongoose');
const {Schema }=mongoose;
const Food_Items=new Schema({
    CategoryName:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    options:{
        type: Array,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})
const Food_Category=new Schema({
    CategoryName:{
        type: String,
        required: true
    }
    })


const fooditems = mongoose.model('Food_Items', Food_Items)
const foodcategory=mongoose.model('Food_Category',Food_Category)
module.exports={fooditems,foodcategory}