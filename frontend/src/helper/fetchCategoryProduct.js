import SummaryApi from "../common"

const fetchCategoryProduct = async(category) => {
    const response = await fetch(SummaryApi.categoryWiseProduct.url,{
        method: SummaryApi.categoryWiseProduct.method,
        headers : {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ category : category })
    })

    const dataResponse = await response.json()

    return dataResponse
}

export default fetchCategoryProduct