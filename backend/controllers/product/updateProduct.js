const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");

async function updateProductController(req,res) {
    try {

        if(!uploadProductPermission(req.userId)){
            throw new Error("Bạn không có quyền thêm sản phẩm");
        }

        const { _id, ...resBody } = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)

        res.json({
            message:"Sản phẩm đã được cập nhật",
            data: updateProduct,
            success: true,
            error: false,
        })

    }catch(error){
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = updateProductController