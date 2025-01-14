const UserService = require("../../services/admin/UserServer")
const JWT = require("../../util/JWT")

const UserController = {
    login: async (req, res) => {
        // console.log(req.body);
        //req.body
        var result = await UserService.login(req.body)
        if (result.length === 0) {
            res.send({
                code: "-1",
                error: "用户名密码不匹配"
            })
        } else {
            //生成token
            const token = JWT.generate({
                _id: result[0].id,
                username: result[0].username
            }, "1d")
            res.header("Authorization", token)
            res.send({
                ActionType: "OK",
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0,//性别 0，1，2
                    introduction: result[0].introduction,//简介
                    avatar: result[0].avatar,
                    role: result[0].role,//管理员1，编辑2
                }
            })
        }
    },
    upload: async (req, res) => {
        // console.log(req.body,req.file);

        const { username, introduction, gender } = req.body
        const token = req.headers["authorization"].split(" ")[1]
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
        var payload = JWT.verify(token)
        // console.log(payload._id);

        await UserService.upload({ _id: payload._id, username, introduction, gender: Number(gender), avatar })
        if (avatar) {
            res.send({
                ActionType: "OK",
                data: {
                    username,
                    introduction,
                    gender: Number(gender), avatar
                }
            })
        } else {
            res.send({
                ActionType: "OK",
                data: {
                    username,
                    introduction,
                    gender: Number(gender)
                }
            })
        }
    },

    add: async (req, res) => {
        // console.log(req.body,req.file);
        const { username, introduction, gender, role, password } = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
        await UserService.add({ username, introduction, gender: Number(gender), avatar, role: Number(role), password })
        if (avatar) {
            res.send({
                ActionType: "OK",
            })
        }
    },

    getList: async (req, res) => {
        const result = await UserService.getList(req.params)
        res.send({
            ActionType: "OK",
            data: result
        })
    },

    delList: async (req, res) => {
        // console.log(req.params.id);
        const result = await UserService.delList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
        })
    },

    putList: async (req, res) => {
        const result = await UserService.putList(req.body)
        res.send({
            ActionType: "OK",
        })
    }

}

module.exports = UserController