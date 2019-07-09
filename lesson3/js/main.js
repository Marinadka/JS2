//ФЭЙК ЭПИ
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

var totalPrice = 0;
var cartBlock = document.querySelector('.cart-block');

function makeGETRequest(url, callback) {
	let xhr;

	if (window.XMLHttpRequest) {
	  xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) { 
	  xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.onreadystatechange = function () {
	  if (xhr.readyState === 4) {
		callback(xhr.responseText);
	  }
	}

	xhr.open('GET', url, true);
	xhr.send();
  }


//Глобальные сущности 
var userCart = [];


class GoodsList {
	constructor () {
		this.goods = []
	}
	fetchGoods () {
  		return new Promise((resolve) => {
			makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
			this.goods = JSON.parse(goods);
			console.log(this.goods); // вывелось
			this.render() // это костыль, но он работает ))) 
    		})
		})
		}
	render () {
		const block = document.querySelector ('.products')
		this.goods.forEach ((product) => {
			const prod = new Product (product)
			block.insertAdjacentHTML ('beforeend', prod.render ())
		}) 
		console.log("render success")
	}
}

const list = new GoodsList();
//list.fetchGoods(() => {
//  list.render()
//})
list.fetchGoods()
	.then(list.render()) // в консоль выводит из этой функции - значит, отрабатывает. но не выводит товар, потому что эта функция выполняется раньше, чем fetchGoods (в консоли это будет самая верхняя строчка)

class Product {
	constructor (product) {
		this.id = product.id_product
		this.title = product.product_name
		this.price = product.price
		this.img = image
	}
	render () {
		return `<div class="product-item">
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.title}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-name="${this.title}"
                            data-image="${this.img}"
                            data-price="${this.price}"
							data-id="${this.id}">Купить</button>
                        </div>
                    </div>`
	}
}

class goodItem {
	constructor (product) {
		name = product.dataset['name'];
		price = +product.dataset['price'];
		img = cartImage;
		quantity = 0;
		id = product.dataset['id']; // так-с, а id то у нас и не передается !
	}
	render () {
		return `<div class="cart-item" data-id="${this.id}">
							<div class="product-bio">
								<img src="${this.img}" alt="some image">
								<div class="product-desc"
									<p class="product-title">${this.name}</p>
									<p class="product-quantity">${this.quantity}</p>
									<p class="product-single-price">${this.price}</p>
								</div>
								<div class="right-block">
									<button class="del-btn" data-id="${this.id}">&times;</button>
								</div>
								
							</div>
							
						</div>`

	}
}

class Cart {
	constructor () {
		this.cartGoods = []
	}
	addProduct (product) {
		
		let productID = +product.dataset['id'];
		let find = userCart.find (element => element.id === productID); //element (true) / false

		if (!find) {
		userCart.push ({
			id: productID,
			name: product.dataset['name'],
			price: +product.dataset['price'],
			img: cartImage,
			quantity: 1
		})
		console.log(userCart)
		} else {
		find.quantity ++
		}
		totalPrice += parseInt(product.dataset['price']);
		this.renderCart () 
	}
	removeProduct (product) {
		let productID = +product.dataset['id'];
		let price = +product.dataset['price'];
		let find = userCart.find (element => element.id === productID);

		if (find.quantity > 1) {
			find.quantity --
		} else {
			userCart.splice (userCart.indexOf(find), 1)
			document.querySelector (`.cart-item[data-id="${productID}"]`)
		} 
		this.renderCart ();
	}
	renderCart () {
//		let allProducts = '';
//		for (item of userCart) {
//		allProducts +=
//	}
		
		for (let i = 0; i<userCart.lenght; i++) {
			const prod = new goodItem ()
			cartBlock.insertAdjacentHTML ('beforeend', prod.render ())
		}
		
	 cartBlock.innerHTML = `<div class="summaryCost">Итого: <span id="totalPrice">${totalPrice}</span></div>`
}}

const cartList = new Cart();

document.querySelector('.btn-cart').addEventListener ('click', () => {
	cartBlock.classList.toggle ('invisible')})
	
	
document.querySelector('.products').addEventListener('click', (event) => {
	if (event.target.classList.contains ('buy-btn')) {
		console.log(event.target)
		cartList.addProduct(event.target) // работает , но почему-то не разбивает на кусочки полученные данные
		}}) // в консоль выводит - значит, реагирует