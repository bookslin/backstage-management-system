const ProductService = require("../../services/admin/ProductServer")

const ProductController = {
    add: async (req, res) => {

        // console.log(req.file,req.body);
        const cover = req.file ? `/productuploads/${req.file.filename}` : ""
        const { title, introduction, detail } = req.body
        //调用service进行添加
        await ProductService.add({
            title,
            introduction,
            detail,
            cover,
            editTime: new Date()
        })
        res.send({
            ActionType: "OK"
        })
    },
    updateList: async (req, res) => {
        const cover = req.file ? `/productuploads/${req.file.filename}` : ""
        const { title, introduction, detail, _id } = req.body
        //调用service进行添加
        await ProductService.updateList({
            _id,
            title,
            introduction,
            detail,
            cover,
            editTime: new Date()
        })
        res.send({
            ActionType: "OK"
        })
    },

    getList: async (req, res) => {
        const result = await ProductService.getList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
            data: result
        })
    },

    delList: async (req, res) => {
        await ProductService.delList({ _id: req.params.id })
        res.send({
            ActionType: "OK"
        })
    }
}

module.exports = ProductController