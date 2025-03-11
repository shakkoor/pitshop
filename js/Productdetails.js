const Productdetail =
[
    {
        id:1,
        Title:"Elephant Figurine Hand Carved Expecting Mother, Soapstone Elephant Good Luck Symbol",
        Cat: 'Vel',
        Price: '11,423',
        Img: './img/tp1.jpg'
    },
    {
        id:2,
        Title:"Table Decor | Room Decor | Table Art | Artifacts | Housewarming Gifts",
        Cat: 'Vinodhan',
        Price: '849+',
        Img: './img/tp2.jpg'
    },
    {
        id:3,
        Title:"Indian Artifacts - Beautifully Handmade Alter",
        Cat: 'Ujjaul',
        Price: '36,423',
        Img: './img/tp3.jpg'
    },
    {
        id:4,
        Title:"Handmade automatic Kung Fu tea set | Tea party tea set | Afternoon tea settp",
        Cat: 'Sudhir',
        Price: '7633',
        Img: './img/tp4.jpg'
    },
    {
        id:5,
        Title:"Artifact 25",
        Cat: 'Vel',
        Price: '6000',
        Img: './img/tp5.jpg'
    },
    {
        id:6,
        Title:" Antique Artifact Handmade by Indian Artisans",
        Cat: 'Vinodhan',
        Price: '5629',
        Img: './img/tp6.png'
    },
    {
        id:7,
        Title:"Handmade Replica of Ancient City of Hattusa Archaeological Artifact",
        Cat: 'Ujjaul',
        Price: '2098',
        Img: './img/tp7.jpg'
    },
    {
        id:8,
        Title:"Handmade Buddhist Healing Bowl | Sound Therapy | Meditation And Yoga",
        Cat: 'Sudhir',
        Price: '10102',
        Img: './img/tp8.jpg'
    },
    {
        id:9,
        Title:"Prince",
        Cat: 'Vel',
        Price: '10000',
        Img: './img/tp9.jpg'
    },
    {
        id:10,
        Title:"Swarn Crafted by Indian Artisian",
        Cat: 'Vinodhan',
        Price: '5036',
        Img: './img/tp10.jpg'
    },
    {
        id:11,
        Title:"Native Artifacts Southwest Metal Wall Sculpture by JasonW Studios",
        Cat: 'Ujjaul',
        Price: '6000',
        Img: './img/tp11.jpg'
    },
    {
        id:12,
        Title:"Artifact Of The Week Archives - The Museum Of Appalachia",
        Cat: 'Sudhir',
        Price: '5000',
        Img: './img/tp12.jpg'
    },
]

export default Productdetail;
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchProducts() {
    const querySnapshot = await getDocs(collection(db, "Product"));
    let productList = document.getElementById("product-list");
    productList.innerHTML = "";

    querySnapshot.forEach(doc => {
        let product = doc.data();
        productList.innerHTML += `
            <div class="box">
                <div class="img_box">
                    <img src="${product.Image_URL}" alt="${product.Product_name}">
                </div>
                <div class="detail">
                    <h3>${product.Product_name}</h3>
                    <p>${product.Description}</p>
                    <h4>₹${product.Price}</h4>
                    <button onclick="addToCart('${doc.id}')">Add to Cart</button>
                </div>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", fetchProducts);

// Dark Mode Toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
