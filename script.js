let cartOverlay = document.getElementById("cartDetails");
cartOverlay.addEventListener("click", updateQuantity)


document.addEventListener('DOMContentLoaded', loadData);



function loadData() {
    loadProducts();
    updateCounter();
}


function loadProducts() {
    fetch("data.json")
        .then(response => response.json())
        .then(jsondata => {
            // test(data);
            data = jsondata;
            showProducts(data);
        })
}


function showProducts(data) {
    let list = document.getElementById("productList");
    data.forEach(product => {
        let item = document.createElement("div");
        item.classList.add("card");
        item.innerHTML = `
            <img src="${product.img}" class="card-img-top p-2 border mt-2 object-fit-contain" alt="${product.title} image">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="price">৳ ${product.price}</span>
                        <span onclick="addToCart(${product.id}, '${product.title}', '${product.img}', ${product.price})" class="btn btn-danger">Add to cart</span>
                    </div>
                </div>
        `
        list.appendChild(item);
    });
}








function addToCart(id, title, img, price){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let found = false;
    let newCart = [];
    let newQuantity = 1;
    cart.forEach(item => {
        if(item.id == id){
            found = true;
            newQuantity = Number(item.quantity)+1;
        }
        else{
            newCart.push(item);
        }
    });

    newCart.unshift({id: id, title:title, img:img, price:price, quantity: newQuantity});
    localStorage.setItem("cart", JSON.stringify(newCart));
    updateCounter();

    openCart();
}


function exitCart(){
    let blur = document.getElementById("blur");
    blur.classList.add("hidden");
    let cartDetails = document.getElementById("cartDetails");
    cartDetails.classList.add("hidden");
}





function openCart(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cartList");

    let cartDetails = document.getElementById("cartDetails");
    let blur = document.getElementById("blur");
    blur.classList.remove("hidden");
    cartList.innerHTML = '';
    cartDetails.classList.remove("hidden");
    
    cart.forEach(item => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("border-top", "w-100", "d-flex");
        cartItem.innerHTML = `
        <div class="col-3 cartImg d-flex justify-content-center align-items-center">
        <img class="img-fluid rounded-3" src="${item.img}" alt="">
        </div>
        <div class="col-3 d-flex align-items-center justify-content-center"><span class="cartCol">${item.title}</span></div>
                <div class="col-2 d-flex align-items-center justify-content-center">
                    <input type="number" oninput="updateQuantity(this, ${item.id})" min="1" class="text-center rounded-3 quantityInput" value="${item.quantity}">
                </div>
                <div class="col-3 d-flex align-items-center justify-content-center"><span class="cartCol">৳ ${item.price}</span></div>
                <div class="col-1 d-flex align-items-center"><i onclick="deleteFromCart(${item.id}, this)" class="fa-solid fa-trash p-2 rounded-3 text-danger"></i></div>
        `     
        cartList.appendChild(cartItem);  
    });
}




function deleteFromCart(id, element){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let newCart = [];
    cart.forEach(item => {
        if(item.id == id){}
        else{
            newCart.push(item);
        }
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    let cartItem = element.parentElement.parentElement;
    cartItem.remove();
    if(newCart.length<1){
        
    }
}




function updateQuantity(input, id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let newCart = [];

    if(input.value<1){
        input.value = 1;
    }
    for(let i=0;i<cart.length;i++){
        if(cart[i].id == id) cart[i].quantity = input.value;
        newCart.push(cart[i]);
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    updateCounter();
}



function updateCounter(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let counter = 0;
    let price = 0;
    cart.forEach(item => {
        counter += Number(item.quantity);
        price+= (Number(item.price)*Number(item.quantity));
    });

    let count = document.getElementById("cartItemCounter");
    let totalQuantity = document.getElementById("totalQuantity");
    let totalPrice = document.getElementById("totalPrice");
    count.innerText = counter;
    totalQuantity.innerText = counter;
    totalPrice.innerText = "৳"+price;
}






function clearCart(){
    localStorage.setItem("cart", "[]")
    let cartList = document.getElementById("cartList");
    cartList.innerHTML = "";
}