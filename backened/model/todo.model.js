import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
text:{
type:String ,
required:true
},
completed:{
type:Boolean,
default:true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
},

})

const Todo=mongoose.model("Todo",todoSchema);
export default Todo;