const userModel = require("../../models/userModel")

async function updateUser(req,res) {
    try {

        const sessionUser = req.userId

        const { userId, email , userName, role } = req.body 
        const payload = {
            ...( email && {email : email}),
            ...( userName && {userName : userName}),
            ...( role && {role : role}),
        }

        const user = await userModel.findById(sessionUser)
        console.log("body",req.body)
        console.log("alo",user)
        console.log("alo123",sessionUser)
        

        console.log("user role",user.role)

        const updatedUser = await userModel.findByIdAndUpdate(userId, payload)

        res.json({
            data: updatedUser,
            message:"Người dùng đã được cập nhật",
            success: true,
            error: false,

        })
    } catch (error) { 
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
    
}

module.exports = updateUser