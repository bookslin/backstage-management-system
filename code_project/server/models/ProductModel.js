const mongoose = require("mongoose")
const Schema = mongoose.Schema


//News模型==>News集合
const ProductType = {
    title:String,
    introduction:String,
    detail:String,
    cover:String,//封面
    editTime:Date
}
const ProductModel = mongoose.model("product",new Schema(ProductType))

module.exports = ProductModel
