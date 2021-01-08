let mongoose=require("mongoose")



let schema={
    longurl:{
        type:String,
        required:true
    },
    shorturl:{
        type:String,
        unique:true
    },
    count:{
        type:Number,
        default:0
    }

}

let urlmodule=mongoose.model("short",schema);

module.exports={urlmodule}