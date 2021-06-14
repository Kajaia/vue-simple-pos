app.component('pos-details', {
    template:
    /*html*/
    `
    <div class="container-fluid">
        <div class="row">
            <div 
                class="col-md-5 my-3"
            >
                <div class="card border-0 shadow rounded cart-card">
                    <div class="card-header bg-white">
                        <h3>
                            <i class="fas fa-shopping-basket text-primary"></i>
                            Cart
                            <span 
                                class="badge bg-success rounded-pill shadow"
                                v-if="cart.length > 0"
                            >
                                {{cartQty}}
                                <span class="ms-1" v-if="cartQty <= 1">item</span>
                                <span class="ms-1" v-else>items</span>
                            </span>
                        </h3>
                    </div>
                    <div class="card-content cart-table">
                        <p 
                            class="text-center mt-5 fw-bold"
                            v-if="cart.length < 1"
                        >
                            No items in cart!
                        </p>
                        <table 
                            class="table table-hover"
                            v-if="cart.length > 0"
                        >
                            <thead>
                                <tr>
                                    <th class="text-center">Product</th>
                                    <th class="text-center">Price</th>
                                    <th class="text-center">Qty</th>
                                    <th class="text-center">Subtotal</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(item, index) in cart"
                                    :key="index"
                                >
                                    <td class="text-center">#{{item.product.id}}</td>
                                    <td class="text-center">$ {{item.product.price}}</td>
                                    <td class="text-center">{{item.qty}}</td>
                                    <td class="text-center">$ {{item.qty * item.product.price}}</td>
                                    <td class="text-center">
                                        <button 
                                            class="btn btn-sm btn-danger rounded-circle"
                                            @click="removeFromCart(index)"
                                        >
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="card-footer bg-white">
                        <div class="row">
                            <div class="col-md-4 my-2">
                                <label for="tax">Tax %</label>
                                <input  class="form-control rounded-pill"
                                id="tax" type="number"
                                v-model="tax"
                                >
                            </div>
                            <div class="col-md-4 my-2">
                                <label for="discount">Discount $</label>
                                <input class="form-control rounded-pill"
                                id="discount" type="number"
                                v-model="discount"
                                >
                            </div>
                            <div class="col-md-4 my-2">
                                <label for="shipping">Shipping $</label>
                                <input class="form-control rounded-pill"
                                id="shipping" type="number"
                                step=".01"
                                v-model="shipping"
                                >
                            </div>
                        </div>
                        <div class="text-center bg-primary rounded-pill mt-1">
                            <h5 
                                class="text-white py-1"
                                v-if="cart.length > 0"
                            >
                                Total Price: $ {{finalPrice}}
                            </h5>
                        </div>
                        <div 
                            class="text-center mt-3"
                            v-if="cart.length > 0"
                        >
                            <button 
                                class="btn btn-danger rounded-pill shadow px-3"
                                @click="resetCart(product)"
                            >
                                <i class="fas fa-power-off me-1"></i>
                                Reset
                            </button>
                            <button 
                                class="btn btn-success rounded-pill shadow px-3 ms-2"
                                @click="openPayModal"
                            >
                                <i class="fas fa-receipt me-1"></i>
                                Invoice
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-7 my-3">
                <div class="card border-0 rounded shadow bg-white">
                    <div class="card-header bg-white">
                        <h3>
                            <i class="fas fa-store text-primary"></i>
                            Products
                        </h3>
                    </div>
                    <div class="card-content px-3 py-2 products-card">
                        <div class="row justify-content-center">
                            <div 
                                class="col-6 col-md-4 col-lg-3 my-2"
                                v-for="(product, index) in products"
                                :key="index"
                            >
                                <div class="card rounded border-0 shadow product">
                                    <a 
                                        class="stretched-link" 
                                        href="#!"
                                        @click="addToCart(product)"
                                    >
                                        <img :src="product.image" :alt="product.name" class="card-img">
                                    </a>
                                    <span class="badge bg-primary rounded-pill shadow position-absolute m-2">
                                        $ {{product.price}}
                                    </span>
                                    <div class="card-content px-3 py-2">
                                        <h6><small>{{product.name}}</small></h6>
                                        <p><small># {{product.id}}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container pay-modal" v-show="payModal">
        <div class="col-md-12 my-2">
            <div class="card border-0 shadow">
                <div class="card-header bg-white d-flex justify-content-between">
                    <h5 class="mt-2">
                        <i class="fas fa-receipt me-1 text-primary"></i>
                        Invoice
                    </h5>
                    <button class="btn btn-sm" @click="closePayModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="card-content px-3 py-3">
                    <ul class="list-group list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                            Items in cart
                            </div>
                            <span class="badge bg-primary rounded-pill">{{cartQty}}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                            Tax
                            </div>
                            <span class="fw-bold me-1">
                                <small>{{tax}} %</small>
                            </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                            Discount
                            </div>
                            <span class="fw-bold me-1">
                                <small>$ {{discount}}</small>
                            </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                            Shipping
                            </div>
                            <span class="fw-bold me-1">
                                <small>$ {{shipping}}</small>
                            </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto fw-bold">
                            Total price
                            </div>
                            <span class="badge bg-success rounded-pill">
                                $ {{finalPrice}}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="overlay" v-show="payModal" @click="closePayModal"></div>
    `,
    data() {
        return {
            products: null,
            cart: [],
            tax: 10,
            discount: 0,
            shipping: 2.99,
            payModal: false
        }
    },
    methods: {
        addToCart(product) {
            var whichProduct;
            var existing = this.cart.filter(function (item, index) {
                if (item.product.id == Number(product.id)) {
                whichProduct = index;
                return true;
                } else {
                return false;
                }
            });

            if (existing.length) {
                this.cart[whichProduct].qty++;
            } else {
                this.cart.push({ product: product, qty: 1 });
            }
        },
        removeFromCart(id) {
            if (this.cart[id].qty > 1) {
                this.cart[id].qty--;
            } else {
                this.cart.splice(id, 1);
            }
        },
        resetCart(product) {
            this.cart.splice(product);

            this.tax = 10;
            this.discount = 0;
            this.shipping = 2.99;
        },
        openPayModal() {
            this.payModal = true;
        },
        closePayModal() {
            this.payModal = false;
        }
    },
    computed: {
        totalPrice() {
            let sum = 0;
            for (key in this.cart) {
                sum = sum + this.cart[key].product.price * this.cart[key].qty;
            }
            return sum;
        },
        cartQty() {
            let qty = 0;
            for(key in this.cart) {
                qty = qty + this.cart[key].qty;
            }
            return qty;
        },
        serviceTax() {
            return Number(this.tax) / 100;
        },
        finalPrice() {
            return (this.totalPrice - Number(this.discount) + Number(this.shipping)) + (this.serviceTax * this.totalPrice);
        }
    },
    mounted() {
        fetch('https://hplussport.com/api/products/order/price').then(response => response.json()).then(data => {
            this.products = data;
        })
    }
})