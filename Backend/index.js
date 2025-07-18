const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const jwt=require("jsonwebtoken");
const jwtKey="e-com";
const PORT=8000;

const User=require("./model/user");
const Product=require("./model/product");

mongoose.connect("mongodb://127.0.0.1:27017/e-comdsh").then((e)=>console.log('mongoose is connected'));

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    return res.send("app in working...");
})

app.post("/register",async(req,res)=>{
    const user1=new User(req.body);
    const user=await user1.save();
   jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            return res.send({result:"some thing went wrong"});
        }
      return res.send({user, auth:token});
    })
})

app.post("/login",async(req,res)=>{
    if(!req.body.email || !req.body.password){
       return res.send({result:"should enter both the entity"});
    }
   const user=await User.findOne(req.body).select("-password");
   if(user){
    jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            return res.send({result:"some thing went wrong"});
        }
      return res.send({user, auth:token});
    })
    console.log(user);
   }else{
    return res.send({result:"no user found"});
   }
})

app.post("/add-product",verifyToken,async(req,res)=>{
    const prod=new Product(req.body);
    const product=await prod.save();
    console.log(product);
    return res.send(product);
})

app.get("/products",verifyToken,async(req,res)=>{
    const products=await Product.find();
    if(products.length>0){
        return res.send(products);
    }else{
        return res.send({result:"no product found"});
    }
})

app.delete("/products/:id",verifyToken,async(req,res)=>{
    const result=await Product.deleteOne({_id:req.params.id});
    return res.send(result);
})

app.get("/products/:id",verifyToken,async(req,res)=>{
    const result=await Product.findOne({_id:req.params.id});
    if(result){
    return res.send(result);
    }else{
      return res.send({return:"No recourd found"});  
    }
})

app.put("/products/:id",verifyToken,async(req,res)=>{
    const result=await Product.updateOne({_id:req.params.id},{
       $set:req.body
    });

    return res.send(result);

})

app.get("/search/:key",verifyToken,async(req,res)=>{
    const result=await Product.find({
        "$or":[{name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {price:{$regex:req.params.key}}
        ]
    });
    return res.send(result);
})

function verifyToken(req,res,next){
     let token=req.headers['authorization'];
if(token){
  token=token.split(" ")[1];
  jwt.verify(token,jwtKey,(err,valid)=>{
    if(err){
      res.status(401).send({result:"please provide valid token"});
    }else{
       next();
    }
  })
}else{
   res.status(403).send({result:"please add token in header"});
}

}

app.listen(PORT,()=>console.log(`server is started at port ${PORT}`));