const userModel = require("../../models/userModel")

async function allUsers(req,res) {
    try {
        // console.log('userId All user',req.userId)
        const allUser = await userModel.find()
        res.json({
            message: 'Tất cả người dùng đã được hiển thị',
            data: allUser,
            success: true,
            error: false
        })
    } catch (error ) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = allUsers