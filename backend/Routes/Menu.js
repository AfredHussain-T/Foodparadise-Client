const express = require('express');
const router = express.Router();
const menuItems = require('../models/Food_Items').fooditems;
const categoryname = require('../models/Food_Items').foodcategory;
const { body, validationResult } = require('express-validator');
router.post("/menuItems", [body('description').isLength({ min: 10 })], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    try {
        await menuItems.create({
            "CategoryName": req.body.CategoryName,
            "name": req.body.name,
            "image": req.body.image,
            "options": req.body.options,
            "description": req.body.description
        })

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})
router.post("/menucategory", [body('CategoryName').isLength({ min: 4 })], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    try {
        await categoryname.create({
            "CategoryName": req.body.CategoryName
        })

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})
// var dbcourse = [];
menuItems.find({})
    .then(data => {
        global.food_Menu_Items = data;
    })
    .catch(error => {
        console.log(error);
    })
categoryname.find({})
    .then(catItem => {
        global.food_Category_Menu = catItem;
    })
    .catch(error=>{
        console.log(error);
    })
router.post('/foodMenu', (req, res) => {
    try {
        res.send([global.food_Menu_Items,global.food_Category_Menu]);
    } catch (error) {
        console.log(error);
    }
})
module.exports = router





















// router.get('/menuItems', (req,res)=>{
//     try {
//         const fetchedData=mongoose.connection.db.collection("food_Items")
//         fetchedData.find({}).toArray(function (err,data){
//             if(err){
//                 res.send(err)
//             }
//             else{
//                 res.send(data)
//             }
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })


// module.exports = router;