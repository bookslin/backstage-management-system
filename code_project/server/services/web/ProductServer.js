const ProductModel = require("../../models/ProductModel")
//数据库操作
const ProductService = {

    getList: async ({ _id }) => {
        return _id ? ProductModel.find({ _id }) : ProductModel.find()
    }

}

module.exports = ProductService