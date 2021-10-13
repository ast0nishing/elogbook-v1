const express = require('express')
const router = express.Router()
// Home page
router.get('/',(req,res,next ) =>{
    const data=req.context
    res.render("home",data)
})
// Logbook
router.get('/logbook',(req,res,next ) =>{
    const data=req.context
    res.render("logbook",data)
})
// Time table page
router.get('/timetable',(req,res,next ) =>{
    const data=req.context
    res.render("timetable",data)
})
// Teacher page
router.get('/teacher',(req,res,next ) =>{
    const data=req.context
    res.render("teacher",data)
})
// Student page
router.get('/student',(req,res,next ) =>{
    const data=req.context
    res.render("student",data)
})
module.exports=router