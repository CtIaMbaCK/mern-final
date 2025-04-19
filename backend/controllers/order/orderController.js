const orderModel = require("../../models/orderProductModel")

const orderController = async(req, res) => {
    try {
        const currentUserId = req.userId

        const orderList = await orderModel.find({ userId : currentUserId})


        res.json({
            data : orderList,
            message: "dan sach order",
            success:true
        })
    }catch (error) {
        res.status(500).json({
            message : error.message || error,
            error: true,
        
        })
    }
}

module.exports = orderController