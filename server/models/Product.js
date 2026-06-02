import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['phone', 'laptop', 'accessory'] },
    price: {type:Number, required :true},
    stock: {type:Number, required : true, default: 0},
    description:{type:String,default:''},
    image: {type:String,default:''}
}, {timestamps:true})

export default mongoose.model('Product',productSchema);