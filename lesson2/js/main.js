const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

const NAMES = ['Tomato', 'Potato', 'Cucumber', 'Cherry', 'Cabbage', 'Watermelon']; //заглушка типа БД
const PRICES = [300, 60, 980, 360, 34, 80]; //заглушка типа БД
const ids = [0, 1, 2, 3, 4, 5];

// const PRODUCTS = fetchData (); //заглушка ответа с сервера
var cartBlock = document.querySelector('.cart-block');
var totalPrice = 0;


function fetchData () {
	let arr = [];
	for (let i = 0; i < NAMES.length; i++) {
		arr.push ({
			title: NAMES[i],
			price: PRICES[i],
			img: image,
		});
	}
	return arr
}

//Глобальные сущности 
var userCart = [];

class ProductList {
	constructor () {
		this.products = [];
		this._init ();
	}
	_init () {
		this.fetchProducts ();
		this.render ();
	}
	fetchProducts () {
		this.products = fetchData();
	}
	render () {
		const block = document.querySelector('.products');
		this.products.forEach (product => {
			const prod = new Product (product);
			block.insertAdjacentHTML ('beforeend', prod.render());
		})
	
	}
}


class Product {
	constructor (product) {
		this.title = product.title;
		this.price = product.price;
		this.img = product.img;
	}
	render () {
		return `<div class="product-item" >
						<img src="${this.img}" alt="some image">
						<div class="desc"
							<h3>${this.title}</h3>
							<p>${this.price}</p>
							<button class="buy-btn" 
							data-name="${this.title}"
							data-price="${this.price}">КУПИТЬ</button>
						</div>
					</div>`
	}
}



let productList = new ProductList ();




//
//document.querySelector('.btn-cart').addEventListener ('click', () => {
//	cartBlock.classList.toggle ('invisible');
//})
//
//document.querySelector('.products').addEventListener ('click', (evt) => {
//	if (evt.target.classList.contains ('buy-btn')) {
//		addProduct (evt.target)
//	}
//})
//
//
//document.querySelector('.cart-block').addEventListener ('click', (evt) => {
//	if (evt.target.classList.contains ('del-btn')) {
//		removeProduct (evt.target)
//	}
//})
//


//function createProduct (i) {
//	return {
//		id: i,
//		name: NAMES [i],
//		price: PRICES [i],
//		img: image,
//		quantity: 0,
//		createTemplate: function () {
//			return `<div class="product-item" data-id="${this.id}>
//						<img src="${this.img}" alt="some image">
//						<div class="desc"
//							<h3>${this.name}</h3>
//							<p>${this.price}</p>
//							<button class="buy-btn" 
//							data-id="${this.id}"
//							data-name="${this.name}"
//							data-price="${this.price}">КУПИТЬ</button>
//						</div>
//					</div>`
//		}
//	}
//}
//
//function renderProducts () {
//	let str = ''
//	for (let product of PRODUCTS) {
//		str += product.createTemplate ()
//	}
//	document.querySelector('.products').innerHTML = str
//}
//
//renderProducts ()
//
//function addProduct (product) {
//	let productID = +product.dataset['id'];
//	let find = userCart.find (element => element.id === productID); //element (true) / false
//
//	if (!find) {
//		userCart.push ({
//			id: productID,
//			name: product.dataset['name'],
//			price: +product.dataset['price'],
//			img: cartImage,
//			quantity: 1
//		})
//		
//	} else {
//		find.quantity ++
//	}
//	totalPrice += parseInt(product.dataset['price']);
//	renderCart () 
//}
//
//
//function renderCart (i) {
//	let allProducts = '';
//	for (item of userCart) {
//		allProducts += `<div class="cart-item" data-id="${item.id}>
//							<div class="product-bio">
//								<img src="${item.img}" alt="some image">
//								<div class="product-desc"
//									<p class="product-title">${item.name}</p>
//									<p class="product-quantity">${item.quantity}</p>
//									<p class="product-single-price">${item.price}</p>
//								</div>
//								<div class="right-block">
//									<button class="del-btn" data-id="${item.id}">&times;</button>
//								</div>
//								
//							</div>
//							
//						</div>`
//	}
//	cartBlock.innerHTML = allProducts;
//	 cartBlock.innerHTML += `<div class="summaryCost">Итого: <span id="totalPrice">${totalPrice}</span></div>`
//	
//}
//
//
//function removeProduct (product) {
//	let productID = +product.dataset['id'];
//	let price = +product.dataset['price'];
//	let find = userCart.find (element => element.id === productID);
//
//	if (find.quantity > 1) {
//		find.quantity --
//	} else {
//		userCart.splice (userCart.indexOf(find), 1)
//		document.querySelector (`.cart-item[data-id="${productID}"]`)
//	}
//	 totalPrice = totalPrice - find.price; //  Если добавить несколько товаров в корзину и начать их удалять, то будет видна проблема, что считает неправильно. Причем если удалять сверху корзины в низ списка, а не наоборот (начиная с первого выбранного товара). Или из середины. В общем, каждый раз вычитает последний добавленный товар и только его, а не тот, который мы хотим удалить. 
//	renderCart ();
//}