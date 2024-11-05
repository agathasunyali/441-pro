//Agatha
//loginpage part

//create cookies  register function
function setCookie(name, value, days) {  
    var date = new Date();  
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  
    var expires = "; expires=" + date.toUTCString();  
    document.cookie = name + "=" + (value || "") + expires + "; path=/";  
}  
function register() {  
    var username = document.getElementById("usernameInput").value;  
    var password = document.getElementById("userpassword").value;  
    if(cookiesObj[username]){
        alert('Repeat username!')
    }else{
        setCookie(username, password, 7);  
        alert("Account created and it will be saved 7 days.");
        window.location.href = 'loginpage.html'  
    }
}
//login part
function parseCookies() {  
    var cookies = {};
    if (document.cookie && document.cookie !== '') {  
        var cookiesArray = document.cookie.split(';');
        for (var i = 0; i < cookiesArray.length; i++) {  
            var cookiePair = cookiesArray[i].split('=');  
            cookies[decodeURIComponent(cookiePair[0].trim())] = decodeURIComponent(cookiePair[1].trim());
        }  
    }
    return cookies; 
} 
var cookiesObj = parseCookies();  
function login() {  
    var username = document.getElementById('usernameInput').value;
    var password = document.getElementById('userpassword').value;

    if( password == cookiesObj[username]){
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.href = 'cart.html'
    }else{
        alert('Please enter correct account or password.');
    }
}  

function checkIfLoggedIn() {  

    var isLoggedIn = localStorage.getItem('isLoggedIn');    
    var username = localStorage.getItem('username');    
    var currentPageTitle = document.title;   
  
    if(isLoggedIn !== 'true') {  
        if(currentPageTitle === 'Cart') {    
            alert('Please login to view your cart.');  
            window.location.href = 'loginpage.html';   
        } else if(currentPageTitle === 'Cookies Demo') {    
            alert('Please login in');  
        }  
    } else { 
        if(currentPageTitle === 'Cookies Demo'){  
            window.location.href = 'cart.html';  
        } else {  
            alert('Welcome, ' + username + '!');    
        }  
    }
}
window.onload = checkIfLoggedIn;

//loginout part
function loginout() {
    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem('username'); 
    window.location.href = 'loginpage.html'; 
}

//delete cookies
function eraseCookie(name) {  
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';  
}
function deleteUsername() {  
    var cookieName = document.getElementById('usernameInput').value; 
    eraseCookie(cookieName);  
    alert('cookie deleted.'); 
    window.location.href = 'loginpage.html'
}

// calculate total price of the all courses
function calculateTotal628() {
    let total = 0;
    const cartContainer = document.querySelector('.cartcontainor');
    const cartItems = cartContainer.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('p').textContent.split('$')[1]); 
        const count = parseInt(item.querySelector('.cart-count').textContent, 10); 
        total += price * count;
    });
    return total;
}

// update total price of the all courses
function updateTotal628() {
    const totalDisplay = document.querySelector('.totalprice'); // select the element to display totalprice
    const total = calculateTotal628();
    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}



// function of removing items
function removeItem628(event) {
    if (event.target.className === 'remove-button') {
        const itemToRemove = event.target.closest('.cart-item');
        const cartcontainor = document.querySelector('.cartcontainor');

        cartcontainor.removeChild(itemToRemove);
        updateTotal628();
    }
}

function addToCart628(event) {
    if (event.target.className === 'button') {
        const courseContainer = event.target.closest('.course');
        if (!courseContainer) return;

        const courseTitle = courseContainer.querySelector('h1').textContent;
        const coursePrice = parseFloat(courseContainer.querySelector('p').textContent.replace('$', ''));

        // get the number of the users entered, default value is 1
        const quantity = parseInt(courseContainer.querySelector('input[type="text"]').value, 10) || 1;
        const cartcontainor = document.querySelector('.cartcontainor');

        // Find if the same course item already exists in the cart
        let existingItem = null;
        for (const item of cartcontainor.querySelectorAll('.cart-item')) {
            if (item.querySelector('h2').textContent === courseTitle) {
                existingItem = item;
                break;
            }
        }

        let item;
        if (existingItem) {
            item = existingItem;
            // If present, update the quantity and total price
            const currentCount = parseInt(existingItem.querySelector('.cart-count').textContent, 10);
            const newQuantity = currentCount + quantity;
            existingItem.querySelector('.cart-count').textContent = `${currentCount + quantity} x`;
            existingItem.querySelector('.coursetotal').textContent = `Total: $${(coursePrice * newQuantity).toFixed(2)}`;
        } else {
            // If it doesn't exist, create a new item
            item = document.createElement('div');
            item.className = 'cart-item';
            item.innerHTML = `
                <h2 style="color:#878787">${courseTitle}</h2>
                <p>Price: $${coursePrice.toFixed(2)}</p>
                <p class="cart-count">${quantity} </p>
                <p class="coursetotal">Total: $${(coursePrice * quantity).toFixed(2)}</p>
                <button class="remove-button">Remove</button>
            `;
            cartcontainor.appendChild(item);
        }

        // Call the function
        updateTotal628();

        // Add a Remove button event to a newly created course item
        if (!existingItem) {
            item.querySelector('.remove-button').addEventListener('click', removeItem628);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const cartcontainor = document.querySelector('.cartcontainor');
    // get the button
    var emptyCartButton = document.getElementById('empty-cart');
    // add listener to the empty button
    emptyCartButton.addEventListener('click', function() {
        if (window.confirm('Are you sure you want to empty the cart?')) {
            // sure to empty cart
            while (cartcontainor.firstChild) {
                cartcontainor.removeChild(cartcontainor.firstChild);
            }
            updateTotal628();
        }
    });
});

// Once the page loads, add click event listeners to all the 'Add to Cart' buttons
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.button');
    buttons.forEach(function(btn) {
        btn.addEventListener('click', addToCart628);
    });

    // Once the page loads, add an event listener for each remove button in the cart
    var removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(function(btn) {
        btn.addEventListener('click', removeItem628);
    });
});

//checkout window alert
function checkoutbutton628(){
    window.confirm('Succeed to buy! Tanks a lot!')
}

//equire button
function equirebutton628(){
    window.confirm('Succeed to submit!')
}



var slideIndex = 0;
        showSlides();
        
        function showSlides() {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";  
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}    
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex-1].style.display = "block";  
            dots[slideIndex-1].className += " active";
            setTimeout(showSlides, 3000); 
        }
    
        function consult(type) {
            alert('You have chosen to consult about: ' + type);
            // Here you would typically handle the consultation logic, like opening a new window or modal
        }
    
        function download(subject) {
            alert('You have chosen to download: ' + subject + ' material package');
            // Here you would handle the download logic
        }
    
        function test(subject) {
            alert('You have chosen to take: ' + subject + ' ability test');
            // Here you would handle the testing logic
        }
    
        function applyTrial() {
            alert('You have applied for a trial class');
            // Here you would handle the application for a trial class
        }







 var slideIndex = 0;
        showSlides();
        
        function showSlides() {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";  
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}    
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex-1].style.display = "block";  
            dots[slideIndex-1].className += " active";
            setTimeout(showSlides, 3000); 
        }
    
        function consult(type) {
            alert('You have chosen to consult about: ' + type);
            // Here you would typically handle the consultation logic, like opening a new window or modal
        }
    
        function download(subject) {
            alert('You have chosen to download: ' + subject + ' material package');
            // Here you would handle the download logic
        }
    
        function test(subject) {
            alert('You have chosen to take: ' + subject + ' ability test');
            // Here you would handle the testing logic
        }
    
        function applyTrial() {
            alert('You have applied for a trial class');
            // Here you would handle the application for a trial class
        }
