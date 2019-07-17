const cartItem = {
    template: `
            <div class="cart-item">
                <div class="product-bio">
                    <img src="${this.img}" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">${this.product_name}</p>
                        <p class="product-quantity">Quantity: ${this.quantity}</p>
                        <p class="product-single-price">$${this.price} each</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">${this.quantity*this.price}</p>
                    <button class="del-btn">&times;</button>
                </div>
            </div>
        `
}

const cart = {
    components: {'cart-item': cartItem},
    data () {
        return {
            cartUrl: '/getBasket.json',
            imgCart: 'https://placehold.it/50x100',
            cartShown: false,
            cartItems: []
        }
    },
    methods: {
        addProduct (product) {
			
            this.$parent.getJson(`${API}/addToBasket.json`)
			.then (console.log("item is added")) // отрабатывает. значит, ошибка в функции на следующей строке
            .then(data => {
                if(data.result){
                    let find = this.cartItems.find(el => el.id_product === product.id_product);
                    if(find){
                        find.quantity++;
                    } else {
                        let prod = Object.assign ({quantity: 1}, product)
                        this.cartItems.push (prod)
                    }
                } else {
                    console.log('Some error')
                }
            })
        }, 
        remove (product) {

        },
        mounted () {
            this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data){
                    this.cartItems.push(el); // не отрабатывает, НО тут ошибки не вижу вообще никакой
                }
				console.log(this.cartItems) // не выводит почему-то
            });
        }
    },
    template: `
    <div>
        <button class="btn-cart" type="button" @click="cartShown = !cartShown">Корзина</button>
        <div class="cart-block" v-show="cartShown">
            <cart-item v-for="cartItems"></cart-item>
        </div>
    </div>
    `
}