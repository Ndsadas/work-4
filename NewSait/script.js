'use strict'
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.goods-list') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.filtered = [];
        this.getProducts()
            .then(data => {
                this.goods = [...data];
                this.render()
            });
    }

    getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    getAllSum() {
        let s = 0;
        this.goods.forEach(element => {
            s += element.price
        });
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductElm(product);
            this.allProducts.push(item);
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }

    filter(value) {
        const regExp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regExp.test(product.product_name));
        console.log(this.filtered);
        this.allProducts.forEach(product => {
            const block = querySelector(`.product-item[data-id="${product.id_product}"]`);
            if (!this.filtered, includes(product)) {
                block.classList.add('close')
            } else {
                block.classList.remove('close');
            }
        });

    }
}


class ProductElm {
    constructor(product) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <h3>${this.title}</h3>
                    <h3 class= 'itemPrise'>${this.price} $</h3>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();


class basket {
    constructor(container = '.basket') {
        this.container = container;
        this.goods = [];
        this.clickBasket();
        this.getBasketItem()
            .then(data => {
                this.goods = [...data.contents];
                this.render()
            });
    }
    // Добавляет элементы корзины из json 
    getBasketItem() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new BasketItem();
            block.insertAdjacentHTML('beforeend', item.render(product));
        }

    }
    // Обработка клика событий на кнопке
    clickBasket() {
        document.querySelector('.cart-button').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('close');
        });
    }
}

class BasketItem {
    // Верстка корзины
    render(product) {
        return `<div class="products" data-id="${product.id_product}">
                <div class="carts">
                <img src="${product.img}" alt="Any image">
                <div class="leftElm">
                <p class="productTitle">${product.product_name}</p>
                <p class="productQuant">Quantity: ${product.quantity}</p>
            <p class="productLeftPrise">$${product.price} each</p>
            </div>
            </div>
            <div class="rightElm">
                <p class="productRightPrice">$${product.quantity * product.price}</p>
                <button class="delBtn" data-id="${product.id_product}">&times;</button>
            </div>
            </div>`
    }
}

let bask = new basket();