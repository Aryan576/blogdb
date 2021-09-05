const express = require('express');
const bodyparser =require('body-parser');
const cors= require('cors');
const multer=require('multer');
const path= require('path');
const db = require('./query');
const app=express();
const port = 5151;
const DIR='./uploads';

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb (null,DIR);
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }

})
let upload = multer({storage:storage});

app.use(cors());
app.use(bodyparser.json());
app.get('/uploads/:imagename',function(req,res){
    res.sendFile(__dirname+'/uploads/'+req.params.imagename);
})
app.use(bodyparser.urlencoded({extended:true}));

app.post('/getadmin',db.getadmin);
/* Category */
app.post('/addcategory',db.addcategory);
app.get('/getcategory',db.getcategory);
 app.get('/getcategoryByid/:id',db.getcategoryByid);
app.put('/updatecategory',db.updatecategory);
app.delete('/deletecategory/:id',db.deletecategory);
/* blogs */
app.post('/addblogs',db.addblogs);
app.get('/getblogs',db.getblogs);
app.get('/getblogsByid/:id',db.getblogsByid);
app.put('/updateblog',db.updateblog);
app.delete('/deleteblog/:id',db.deleteblog);
/* user blog */

app.get('/getblogfeatured',db.getblogfeatured);
app.get('/getblogactive',db.getblogactive);

 /* image */
 app.post('/upload',upload.single('image'),db.upload);

 /* count */
 app.get('/countblog',db.countblog);
 app.get('/countactive',db.countactive);
 app.get('/countfeature',db.countfeature);
 /*  update Featured*/

 app.put('/updatefeature',db.updatefeature);




app.get('/', (request, response) => {
    response.json({ info: 'Node.js ,Express,and Postgres API' });
})
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
})
