const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel")

const jwt = require('jsonwebtoken');


async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error('Email không được để trống');
        }
        if (!password) {
            throw new Error('Mật khẩu không được để trống');
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error('Tài khoản không tồn tại');
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        // console.log("checkPassword", checkPassword);

        // token 
        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            }

            res.cookie("token",token,tokenOption).status(200).json({
                message: "Đăng nhập thành công",
                data: token,
                success: true,
                error: false
            })

        } else {
            throw new Error('Mật khẩu không chính xác');
        }





    } catch (error) {
        res.json({
            message: error.message || error, error: true, success: false
        });
    }
}

module.exports = userSignInController;