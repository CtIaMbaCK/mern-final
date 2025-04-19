const productModel = require("../../models/productModel")


const getCategoryProduct = async (req, res) => {
    try {
        const productCategory = await productModel.distinct("category")
        
        console.log("productCategory", productCategory)

        //
        const productByCategory = []

        for(const category of productCategory) {
            const product = await productModel.find({ category: category })
            
            if(product){
                productByCategory.push(product)
            }
        }

        res.json({
            message: "Danh sách sản phẩm theo danh mục",
            data: productByCategory,
            error: false,
            success: true,
        })


    }catch(error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })  
    }
}

module.exports = getCategoryProduct