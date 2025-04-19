const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({ productId , userId: currentUser })
        console.log("isProductAvailable",isProductAvailable)

        if(isProductAvailable) {
            return res.json({
                message : "Sản phẩm đã được thêm vào giỏ",
                success: false,
                error: true
            })
        }

        const payLoad = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }
        
        const newAddToCart = new addToCartModel(payLoad)
        const saveProduct = await newAddToCart.save()

        return res.json({
            data: saveProduct,
            message:"Sản phẩm đã được thêm",
            success: true,
            error: false
        })

    } catch (error) {
        res.json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }

}

module.exports = addToCartController