const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
  name:{
    type:String,
    require:true
},
price:{
    type:String,
    require:true,
    
},
category:{
    type:String,
    require:true,
    
},
userId:{
    type:String,
    require:true
},
company:{
    type:String,
    require:true
}

});
const Product=mongoose.model('product',productSchema);

module.exports= Product;