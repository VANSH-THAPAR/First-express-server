const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    fs.readdir('./files',(err,files)=>{
        res.render("index",{files:files})
    })
})

app.get('/file/:filename',(req,res)=>{
    fs.readFile(`files/${req.params.filename}`,'utf-8',(err,filedata)=>{
        if(err){
            console.error(err)
        }
        res.render('show',{"filename": req.params.filename,"filedata": filedata})
    })
    
})



app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.description,(err)=>{
        if (err){
            console.error(err)
        }
    })
    res.redirect('/')
    console.log(req.body.title);
    console.log(req.body.description);
    
})


app.listen(3000)