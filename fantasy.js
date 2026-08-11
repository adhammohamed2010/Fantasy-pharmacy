let cart = [];


/* ADD TO CART */

function addToCart(name, price) {

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    openCart();

}


/* UPDATE CART */

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cart.forEach((item, index) => {

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <div>

                    <div class="cart-item-name">
                        ${item.name}
                    </div>

                    <div class="cart-item-price">
                        ${item.price} EGP each
                    </div>

                </div>

                <div class="cart-controls">

                    <button
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${index})"
                    >
                        ×
                    </button>

                </div>
            `;


            cartItems.appendChild(cartItem);

        });

    }


    /* ITEM COUNT */

    let itemCount = 0;

    cart.forEach(item => {

        itemCount += item.quantity;

    });


    cartCount.textContent = itemCount;


    /* TOTAL */

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });


    cartTotal.textContent = total + " EGP";

}


/* CHANGE QUANTITY */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* REMOVE ITEM */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* OPEN CART */

function openCart() {

    const cartSection =
        document.getElementById("cart");


    cartSection.style.display = "block";


    cartSection.scrollIntoView({
        behavior: "smooth"
    });

}


/* CLOSE CART */

function closeCart() {

    document.getElementById("cart").style.display = "none";

}


/* CATEGORY FILTER */

function filterProducts(category, button) {

    const products =
        document.querySelectorAll(".product");

    const buttons =
        document.querySelectorAll(".category");


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    products.forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });


    document.getElementById("search").value = "";

}


/* SEARCH */

function searchProducts() {

    const search =
        document
        .getElementById("search")
        .value
        .toLowerCase();


    const products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();


        if (name.includes(search)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


/* CHECKOUT */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    alert(
        "Your order has been prepared!\n\n" +
        "Please contact Fantasy Pharmacy to complete your order."
    );

}