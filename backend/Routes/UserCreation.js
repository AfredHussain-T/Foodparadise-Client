const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const security=require("bcryptjs");
const jwToken= require("jsonwebtoken");
const secretKey="ThisApplicationWasCreatedByAfredHussain"
router.post("/createuser", [body('email').isEmail(), body('password').isLength({ min: 5 })], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const flavour= await security.genSalt(15);
    const passSecure= await security.hash(req.body.password,flavour);

    try {
        await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: passSecure
        })
        
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})
router.post("/loginuser", [body('email').isEmail(), body('password').isLength({ min: 5 })], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    let mailID=req.body.email;
    try {
        let userData = await User.findOne({email:mailID})
            
            if(!userData){
                return res.status(400).json({ error:"Enter Correct Mail ID" });
            }
            const checkPass= await security.compare(req.body.password,userData.password)
            console.log(userData.password)
            if(!checkPass){
                return res.status(400).json({ error:"Enter Correct Password" });
            }
            const jwData={
                userId:{
                    id:userData.id
                }
            }
            const authenticate= jwToken.sign(jwData,secretKey);
            return res.json({ success: true, authenticate:authenticate });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})
module.exports = router;