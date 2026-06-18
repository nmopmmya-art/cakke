let currentView = "home";
let mainContent =
document.getElementById("mainContent");
    let cart =
JSON.parse(localStorage.getItem("cart")) || {};
   let u = document.getElementById("cartList");
let cop = document.querySelectorAll(".cop");

let modal = document.getElementById("productModal");
let modalImg = document.getElementById("modalImg");
let modalTitle = document.getElementById("modalTitle");
let modalDesc = document.getElementById("modalDesc");
let modalPrice = document.getElementById("modalPrice");
let closeModal = document.getElementById("closeModal");
let modalAdd = document.getElementById("modalAdd");

let selectedProduct = null;

cop.forEach(item => {
    item.addEventListener("click", function () {

        let img = item.querySelector("img").src;
        let title = item.querySelector(".wsf").innerText;
        let desc = item.querySelector(".f")?.innerText || "";
        let price = item.querySelector(".price")?.innerText || "";

        modalImg.src = img;
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modalPrice.innerText = price;

        modal.style.display = "flex";

        selectedProduct = {
            name: title,
            price: parseFloat(price)
        };
    });
});

// إغلاق النافذة
closeModal.onclick = () => {
    modal.style.display = "none";
};

// إضافة للسلة من المودال
modalAdd.onclick = () => {
    if(selectedProduct){
        update(selectedProduct.name, selectedProduct.price, 1);
    }
};



let back = document.querySelectorAll(".close-product");

back.forEach(el => {
    el.addEventListener("click", function (e) {

        e.stopPropagation();
cop.forEach(i => {
    i.style.removeProperty("display");
    i.classList.remove("open");

    let title = i.querySelector(".wsf");
    let detail = i.querySelector(".hidee");

    if (title) title.style.display = "block";
    if (detail) detail.style.display = "none";
});
     

        // 🔥 رجوع حسب الصفحة السابقة
       if (currentView === "product") {

    document.querySelector(".flowers-soon").style.display = "flex";
    document.querySelector(".pancake-banner").style.display = "flex";

    document.querySelector(".pancake-products").style.display = "none";

    document.querySelector(".color").style.display = "block";
   document.querySelector(".pro").style.removeProperty("display");
}

    });
});
let search = document.querySelector(".search");

search.addEventListener("keyup", function(){

    let value = search.value.toLowerCase();

    cop.forEach(item=>{

        let text = item.innerText.toLowerCase();

       if(text.includes(value)){
    item.style.display = "";
}else{
    item.style.display = "none";
}

    });

});
let cartBox = document.getElementById("cartBox");
let cartIcon = document.getElementById("cartIcon");
let cartI = document.getElementById("cartI");

function openCart(){

    mainContent.style.display = "none";

    cartBox.style.display = "block";

    show();

}

cartIcon.addEventListener("click", openCart);
cartI.addEventListener("click", openCart);


let contactBtn =
document.getElementById("contactBtn");

let contactBox =
document.getElementById("contactBox");

contactBtn.addEventListener("click", function(){

    if(contactBox.style.display === "block"){
        contactBox.style.display = "none";
    }else{
        contactBox.style.display = "block";
    }

});
let totalBox = document.getElementById("totalPrice");

function show(){

    u.innerHTML = "";
    let total = 0;
    for(let i in cart){
        let item = cart[i];
        let li = document.createElement("li");
     li.innerHTML = `
<div>
<strong>${item.name}</strong><br>
${item.price}$ × ${item.qty}
</div>

<div>
<button onclick="changeQty('${item.name}', -1)">-</button>

<span style="margin:0 10px">${item.qty}</span>

<button onclick="changeQty('${item.name}', 1)">+</button>

<button onclick="removeItem('${item.name}')">
Delete
</button>
</div>
`;
        u.appendChild(li);

        total += item.price * item.qty;
    }

    totalBox.innerHTML = "Total = " + total + "$";
}

function update(name, price , qty){
    let item = cart[name];

    if(item){
        item.qty += qty;
    }else{
        cart[name] = {
            name: name,
            price: price,
            qty: qty
        };
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    show();
    updateCartCount(); // 👈 أضيفي هذا
}
function removeItem(name){

    delete cart[name];

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    show();
     updateCartCount();
}
function changeQty(name, value) {

    cart[name].qty += value;

    if (cart[name].qty <= 0) {
        delete cart[name];
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    show();
     updateCartCount();
}
show();
let msg = document.querySelector(".msg");

let Add = document.querySelectorAll(".Add");

Add.forEach(btn => {

    btn.addEventListener("click", function(e){

        e.stopPropagation();

        msg.style.display = "block";

        setTimeout(() => {
            msg.style.display = "none";
        }, 2000);

    });

});
const darkBtn = document.getElementById("darkModeBtn");

/* تحميل الوضع المحفوظ */
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
}

/* تغيير الوضع */
darkBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
    }else{
        localStorage.setItem("theme", "light");
    }

});
let infoBtn = document.getElementById("info");
let inf = document.querySelector(".inf");

infoBtn.addEventListener("click", function(){

    mainContent.style.display = "none";

    inf.style.display = "block";

    contactBox.style.display = "none";
    cartBox.style.display = "none";

});

let backInfo = document.getElementById("backInfo");
backInfo.addEventListener("click", function(){

    inf.style.display = "none";

    mainContent.style.display = "block";

});
let cartCount = document.getElementById("cartCount");

function updateCartCount(){
    let count = 0;

    for(let i in cart){
        count += cart[i].qty;
    }

    cartCount.innerText = count;
}


updateCartCount();
let closeCart =
document.getElementById("closeCart");

closeCart.addEventListener("click", function(){

    cartBox.style.display = "none";

    mainContent.style.display = "block";

});
let homeBtn = document.getElementById("homeBtn");

homeBtn.addEventListener("click", function () {

    currentView = "home";

    // رجوع الصفحة الرئيسية
    mainContent.style.display = "block";

    document.querySelector(".flowers-soon").style.display = "flex";
    document.querySelector(".pancake-banner").style.display = "flex";
    document.querySelector(".pancake-products").style.display = "none";
    document.querySelector(".Foryou").style.display = "none";
    document.querySelector(".inf").style.display = "none";
    document.querySelector("#cartBox").style.display = "none";
    document.querySelector("#contactBox").style.display = "none";

    document.querySelector(".color").style.display = "block";
    document.querySelector(".pro").style.display = "flex";
});

let foryou = document.querySelector(".Foryou");

// أزرار التصنيفات فوق
let birthBtn = document.querySelector(".item.birth");
let vfBtn = document.querySelector(".item.vf");
let eventBtn = document.querySelector(".item.Event");
let forrBtn = document.querySelector(".item.forr");

// منتجات داخل Foryou
let birthItems = document.querySelectorAll(".Foryou .birth");
let vfItems = document.querySelectorAll(".Foryou .vf");
let eventItems = document.querySelectorAll(".Foryou .Event");
let forrItems = document.querySelectorAll(".Foryou .forr");

// إخفاء كل منتجات Foryou
function hideAllForyouItems() {
    birthItems.forEach(el => el.style.display = "none");
    vfItems.forEach(el => el.style.display = "none");
    eventItems.forEach(el => el.style.display = "none");
    forrItems.forEach(el => el.style.display = "none");
}

// إظهار قسم معين
function showSection(type) {

    currentView = "foryou";

    mainContent.style.display = "none";
    foryou.style.display = "flex";

    hideAllForyouItems();

    if (type === "birth") birthItems.forEach(el => el.style.display = "block");
    if (type === "vf") vfItems.forEach(el => el.style.display = "block");
    if (type === "event") eventItems.forEach(el => el.style.display = "block");
    if (type === "forr") forrItems.forEach(el => el.style.display = "block");
}
// الأحداث
birthBtn.addEventListener("click", function () {
    showSection("birth");
});

vfBtn.addEventListener("click", function () {
    showSection("vf");
});

eventBtn.addEventListener("click", function () {
    showSection("event");
});

forrBtn.addEventListener("click", function () {
    showSection("forr");
});
document.querySelectorAll(".Foryou .vf, .Foryou .birth, .Foryou .Event, .Foryou .forr")
.forEach(item => {

    item.addEventListener("click", function(e){

        if(
            e.target.classList.contains("Add") ||
            e.target.classList.contains("btn-back")
        ){
            return;
        }

        document.querySelectorAll(".Foryou .vf, .Foryou .birth, .Foryou .Event, .Foryou .forr")
        .forEach(el => {

            el.style.display = "none";

            let txt = el.querySelector(".wsf");
            let det = el.querySelector(".hidee");

            if(txt) txt.style.display = "block";
            if(det) det.style.display = "none";

        });

        this.style.display = "flex";

        let txt = this.querySelector(".wsf");
        let det = this.querySelector(".hidee");

        if(txt) txt.style.display = "none";
        if(det) det.style.display = "block";

    });

});
document.querySelectorAll(".Foryou .close-product")
.forEach(btn => {

    btn.addEventListener("click", function(e){

        e.stopPropagation();

        let parent = this.closest(".vf, .birth, .Event, .forr");

        let isBirth = parent.classList.contains("birth");
        let isVf = parent.classList.contains("vf");
        let isEvent = parent.classList.contains("Event");
        let isForr = parent.classList.contains("forr");

        document.querySelectorAll(".Foryou .vf, .Foryou .birth, .Foryou .Event, .Foryou .forr")
        .forEach(el => {

            el.style.display = "none";

            let txt = el.querySelector(".wsf");
            let det = el.querySelector(".hidee");

            if(txt) txt.style.display = "block";
            if(det) det.style.display = "none";

        });

        if(isBirth) birthItems.forEach(el => el.style.display = "block");
        if(isVf) vfItems.forEach(el => el.style.display = "block");
        if(isEvent) eventItems.forEach(el => el.style.display = "block");
        if(isForr) forrItems.forEach(el => el.style.display = "block");

    });

});
let backCategories =
document.getElementById("backCategories");

backCategories.addEventListener("click", function(){

    foryou.style.display = "none";

    mainContent.style.display = "block";

});
let pancakeBtn = document.getElementById("pancakeBtn");
pancakeBtn.addEventListener("click", function() {
    document.querySelector(".flowers-soon").style.display = "none";
    document.querySelector(".pancake-banner").style.display = "none";

    document.querySelector(".color").style.display = "none";
    document.querySelector(".pro").style.display = "none";

    document.querySelector(".pancake-products").style.display = "flex";

    currentView = "pancake";
});
document.querySelectorAll(".pancake-item").forEach(item => {

    item.addEventListener("click", function () {

        currentView = "pancake";

        document.querySelectorAll(".pancake-item").forEach(el => {

            if(el !== this){
                el.style.display = "none";
            }

            let txt = el.querySelector(".wsf");
            let det = el.querySelector(".hidee");

            if(txt) txt.style.display = "block";
            if(det) det.style.display = "none";

        });

        this.style.display = "flex";

        let hidee = this.querySelector(".hidee");
        let text = this.querySelector(".wsf");

        if(hidee) hidee.style.display = "block";
        if(text) text.style.display = "none";

    });

});
document.getElementById("backPancake")
.addEventListener("click", function(){

    document.querySelector(".pancake-products").style.display = "none";

    document.querySelector(".flowers-soon").style.display = "flex";
    document.querySelector(".pancake-banner").style.display = "flex";

    document.querySelector(".color").style.display = "block";
    document.querySelector(".pro").style.display = "";

    document.querySelectorAll(".pancake-item").forEach(el => {

        el.style.display = "";

        let txt = el.querySelector(".wsf");
        let det = el.querySelector(".hidee");

        if(txt) txt.style.display = "block";
        if(det) det.style.display = "none";

    });

    currentView = "home";
});
