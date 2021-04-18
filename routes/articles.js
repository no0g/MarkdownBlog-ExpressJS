const express = require('express')
const Article = require('../models/articles')
const router = express.Router()

// create routing

router.get('/new' , (req, res) => {
    res.render('articles/new', { article: new Article()})
})

router.get('/edit/:slug' , async (req, res) => {
    try{
        let article = await Article.findOne({slug:req.params.slug})
        res.render('articles/edit', {article: article})
    
    } catch{
         res.redirect('/')
    }

})

router.get('/:slug', async (req, res)=>{
        try{
                //retrieve article from id
                let article = await Article.findOne({slug:req.params.slug})
                res.render('articles/show', {article: article})
        }catch {
                 res.redirect('/')
        }
})

router.post('/', async (req,res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req,res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req,res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


//middle ware add and edit
function saveArticleAndRedirect(path){
    return async (req,res) =>{
        
        let article = req.article
        article.title  = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown      

        try{
            article =  await article.save()
            res.redirect(`/articles/${article.slug}`);
        }catch (e){
            res.render(`articles/${path}`, {article: article});
        }
    }
}
module.exports = router