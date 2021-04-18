//import express
const express = require('express')
//import mongoose
const mongoose = require('mongoose')
//import model
const Article = require('./models/articles')
//import router dr file laen
const articleRouter = require('./routes/articles')
// method overrride
const methodOverride = require('method-override')
// init express 
const app = express()

// connect mongodb
mongoose.connect('mongodb://localhost/blog',
{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true} )
//set view engine
app.set('view engine','ejs')
//use express url encoded to access data from form
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
// use router article
app.use('/articles', articleRouter)

// route
app.get('/', async (req,res) => {
    const articles = await Article.find().sort({ creation: 'desc'})
    // render + json data
    res.render('articles/index',{ articles : articles })
})
app.use('/articles', articleRouter)

// listening port
app.listen(5000)