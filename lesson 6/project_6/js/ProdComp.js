const product = {
    props: ['img', 'product'],
    template: `<div class="product-item">
                        <img :src="img" alt="Some img">
                        <div class="desc">
                            <h3>{{ product.product_name }}</h3>
                            <p>{{ product.price }} $</p>
                            <button @click="$root.$refs.cart.addProduct(product)" class="buy-btn" data-id="product.id_product}">Купить</button>
                        </div>
                    </div>`
}

const products = {
    components: {product},
    data () {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            filtered: []
        }
    },
    mounted () {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            }).catch( $root.$refs.error);
        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
                console.log (this.filtered)
            }).catch( $root.$refs.error); // данные не получены из файла, ошибку выведет в окно
    },
    methods: {
        filter () {
            let regExp = new RegExp (this.$root.userSearch, 'i');
            this.filtered = this.products.filter (el => regExp.test (el.product_name))
        }
    },
    template: `
    <div class="products">
        <product 
        v-for="product of filtered" 
        :key="product.id_product"
        :img="imgCatalog"
        :product="product"></product>
    </div>
    `
}

