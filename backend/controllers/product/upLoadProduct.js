const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");


async function UploadProductController(req,res) {
    try {
        const sessionUserId = req.userId;

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Bạn không có quyền thêm sản phẩm");
        }


        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        res.status(200).json({
            message: "Thêm sản phẩm thành công",
            error: false,
            success: true,
            data: saveProduct
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = UploadProductController;   