const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "blogdb",
  password: "root",
  port: 5432,
});

/* for admin */
const getadmin = (req,res)=>{
    const {email,password}=req.body;
    pool.query('select email,password from admin where email=$1 AND password=$2',[email,password],(error,result)=>{
        if(error){
          console.log(error)
        }
        res.send({status:201,msg:"login success",data:result.rows});
        console.log(result.rows);
      })

}

/* For Admin-category */
const addcategory=(req,res)=>{
  const { category } = req.body;
  pool.query(
    "insert into categories(category) values($1)",
    [category],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Category Add .With iD:${result.id}`);
    }
  );


}

const getcategory = (req, res) => {
  pool.query("select * from categories order by id asc ", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

const getcategoryByid = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("select * from categories where id=$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

 const updatecategory = (req, res) => {
  const id = parseInt(req.body.id);
  const { category} = req.body;
  pool.query("update categories set category=$1 where id=$2",[category, id],(error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User updated by ID:${id}`);
    }
  );
};

const deletecategory = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("delete from categories where id=$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`category deleted by id ${id}`);
  });
}; 

/*  blogs*/
const addblogs=(req,res)=>{
  const { title,c_id,isfeatured,isactive,description,date,image } = req.body;
  pool.query("insert into blogs(title,c_id,isfeatured,isactive,description,date,image) values($1,$2,$3,$4,$5,$6,$7)",[title,c_id,isfeatured,isactive,description,date,image[0]],(error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Blogs Add .With iD:${result.id}`);

    }
  );


}

const getblogs= (req, res) => {
  pool.query("select * from blogs order by id desc ", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

const getblogsByid = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("select * from blogs where id=$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

const updateblog = (req, res) => {
  const id = parseInt(req.body.id);
  const { title,c_id,isfeatured,isactive,description,date,image} = req.body;
  pool.query("update blogs set title=$1,c_id=$2,isfeatured=$3,isactive=$4,description=$5,date=$6,image=$7 where id=$8",[title,c_id,isfeatured,isactive,description,date,image[0], id],(error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User updated by ID:${id}`);
    }
  );
};

const deleteblog = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("delete from blogs where id=$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`category deleted by id ${id}`);
  });
}; 
/* user blog */

const getblogfeatured=(req,res)=>{

  const isfeatured=true;
  pool.query("select* from blogs where isfeatured=$1 order by id desc",[isfeatured],(error,result)=>{
    if(error){
      throw error;
    }
    res.status(200).send(result.rows);
  })
}

const getblogactive=(req,res)=>{

  const isactive=true;
  pool.query("select* from blogs where isactive=$1 order by id desc",[isactive],(error,result)=>{
    if(error){
      throw error;
    }
    res.status(200).send(result.rows);
  })
}


/* image */

const upload =(req,res)=>{
  if(!req.file){
    console.log("No File Recive");
    return res.send({
      success:false
    })


  }
  else{
    return res.send({
      success:true,name:req.file.filename
    })

  }
}


/* blog count */
const countblog = (req,res)=>{
  pool.query('select count(*) as totalcount from blogs',(error,result)=>{
    if(error){
      throw error;
    }
    res.status(200).json(result.rows);
  })
}


const countactive = (req,res)=>{
  const isactive=true;
  pool.query('select count(*) as activeblogcount from blogs where isactive=$1',[isactive],(error,result)=>{
    if(error){
      throw error;
    }
    res.status(200).json(result.rows);
  })
}


const countfeature = (req,res)=>{
  const isfeatured=true;
  pool.query('select count(*) as featureblogcount from blogs where isfeatured=$1',[isfeatured],(error,result)=>{
    if(error){
      throw error;
    }
    res.status(200).json(result.rows);
  })
}


/* update blog */
const updatefeature = (req,res)=>{
  const id = parseInt(req.body.id);
  const {isfeatured}=false;
  pool.query("update blogs set isfeatured=$1 where id=$2"),[isfeatured,id],(error,result) =>{
    if(error){
      throw error;
    }
    res.status(200).send(`Featured updated:${id}`);
  }

  pool.query()

}







module.exports = {
    getadmin,
    addcategory,
    getcategory,
    getcategoryByid,
    updatecategory,
    deletecategory,
    addblogs,
    getblogs,
    getblogsByid,
    updateblog,
    deleteblog ,
    getblogfeatured,
    getblogactive,
    upload,
    countblog,
    countactive,
    countfeature,
    updatefeature
  

}