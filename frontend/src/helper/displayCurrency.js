const displayVNCurrency = (number) => {
    const formattedNumber = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    })

    return formattedNumber.format(number)
}

export default displayVNCurrency