let add = (cart, req) => {
    cart.contents.push (req.body)
    return JSON.stringify (cart, null, 4)
}

let change = (cart, req) => {
    let find = cart.contents.find (el => el.id_product === +req.params.id)
    
    if (req.body.quantity >= 1) {
        find.quantity = req.body.quantity
    } // часть ниже не отрабатывает: можем уменьшить количество товаров до 1, но дальше работает только верстка
    else if (req.body.quantity == 0){ // почему боди рекваиста берем, а не наоборот - респонса?
        console.log('пытаемся удалить товар')
        cart.contents = cart.contents.filter(el => el.id_product !== +req.params.id) // cart.contents откуда берется - упустила + что мы делаем с параметром рекваиста?
    }
    return JSON.stringify (cart, null, 4)
}

module.exports = {add, change}