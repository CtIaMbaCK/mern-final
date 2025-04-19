const addToCartModel = require("../../models/cartProduct")

const addToCartViewProdcut = async(req,res) => {
    try {
        const currentUser = req.userId
        const allProdcut = await addToCartModel.find({
            userId: currentUser
        }).populate("productId")

        res.json({
            data: allProdcut,
            success:true,
            error:false,
            message:""
        })
    } catch(error) {
        res.json({
            message: error.message || error ,
            error: true,
            success:false
        })
    }
}

module.exports = addToCartViewProdcut