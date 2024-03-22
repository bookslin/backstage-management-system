const ProductService = require("../../services/web/ProductServer")

const ProductController = {
    getList: async (req, res) => {
        const result = await ProductService.getList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
            data: result
        })
    }

}

module.exports = ProductController