
function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}

function onFailure(error) {
    console.log(error);
}

function renderButton() {
    gapi.signin2.render('g-signin2', {
        'scope': 'profile email',
        'width': 300,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

function onSignIn(response) {
    if (response.credential) {
        // Decode JWT token from Google
        const userData = parseJwt(response.credential);
        
        // Store name in localStorage
        localStorage.setItem("userName", userData.name);

        // Redirect to index.html
        window.location.href = "index.html";
    }
}

// Function to parse JWT token
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
    return JSON.parse(jsonPayload);
}

function signOut() {
    localStorage.removeItem("userName"); // Remove user data
    window.location.href = "login.html"; // Redirect to login page
}



function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        document.getElementById('profile').style.display = "none"; // Hide profile section on sign out
    });
}


function HideProfileDisplayButton(){
    let profile = document.getElementById('profile');
    profile.style.display = "none";
}


document.addEventListener("DOMContentLoaded", function () {
    const userName = localStorage.getItem("userName");
    const userAccountDiv = document.getElementById("userAccount");
    const userNameParagraph = document.getElementById("userName");

    if (userName) {
        userNameParagraph.textContent = `Welcome, ${userName}`;
        userAccountDiv.style.display = "block"; // Show the div
    }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem("user", JSON.stringify(user)); // Store user info
        document.getElementById("userAccount").style.display = "block";
        document.getElementById("userName").innerText = user.email;
    } else {
        localStorage.removeItem("user"); // Remove user info if logged out
        document.getElementById("userAccount").style.display = "none";
    }
});
function signOut() {
    auth.signOut().then(() => {
        localStorage.removeItem("user");
        alert("Logged out successfully!");
        window.location.href = "login.html";
    }).catch(error => {
        console.error("Logout Error:", error.message);
    });
}
function isUserLoggedIn(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(!!user); // Returns true if logged in, false otherwise
    });
}

function addToCart(productId) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        Toastify({
            text: "You must log in first! 🔑",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
        }).showToast();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000); // Redirect after 2 seconds
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products.find(p => p.id === productId);

    if (!product) return;

    let existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ 
            id: product.id,
            Title: product.Title,
            Cat: product.Cat,
            Price: Number(product.Price),
            Img: product.Img,
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // 🛒 Show success notification
    Toastify({
        text: "Product added to cart! 🛒",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
}


