const userModel = require("../../models/userModel");
const bcrypt = require('bcrypt');


async function userSignUpController(req,res) {
    try {
        const { email, password, userName } = req.body;

        // 
        // console.log(req.body);
        const user = await userModel.findOne({ email });
        
        // console.log(user);

        if(user) {
            throw new Error('Email đã tồn tại');
        }

        if(!email) {
            throw new Error('Email không được để trống');
        }
        if(!password) {
            throw new Error('Mật khẩu không được để trống');
        }
        if(!userName) {
            throw new Error('Tên không được để trống');
        }

        const saltRounds = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, saltRounds);

        if(!hashPassword) { throw new Error('Có lỗi xảy ra, vui lòng thử lại'); }

        const payload = {
            ...req.body,
            role: 'GENERAL',
            password: hashPassword
        }

        const userData = new userModel(payload);

        const saveUser = await userData.save();

        res.status(201).json({data: saveUser,message: 'Đăng ký thành công', error: false, success: true});

        

    }catch(err) {
        // console.log(err);
        res.json({
             message: err.message || err , error: true, success: false });
    }
}

module.exports = userSignUpController;