const books = [
    { title: "Atomic Habits", author: "James Clear", genre: "self-development", price: 9.99, language: "English", rating: 4.8, image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg", description: "Build good habits and break bad ones.", year: 2018 },
    { title: "The Power of Now", author: "Eckhart Tolle", genre: "self-development", price: 8.99, language: "English", rating: 4.7, image: "https://m.media-amazon.com/images/I/91u60S7lY7L._SY466_.jpg", description: "Live in the present moment.", year: 1997 },
    { title: "Deep Work", author: "Cal Newport", genre: "self-development", price: 10.99, language: "English", rating: 4.5, image: "https://m.media-amazon.com/images/I/41O+BX2s+cL._SY300_SX300_.jpg", description: "Focus without distraction.", year: 2016 },
    { title: "Can't Hurt Me", author: "David Goggins", genre: "self-development", price: 11.99, language: "English", rating: 4.9, image: "https://m.media-amazon.com/images/I/81gByv+FhjL._SX342_.jpg", description: "Master your mind and defy the odds.", year: 2018 },
    { title: "Mindset", author: "Carol Dweck", genre: "self-development", price: 10.49, language: "English", rating: 4.6, image: "https://m.media-amazon.com/images/I/41sH+Kolf-L._SY300_SX300_.jpg", description: "The power of believing you can improve.", year: 2006 },

    { title: "Batman: Year One", author: "Frank Miller", genre: "comics", price: 7.99, language: "English", rating: 4.7, image: "https://m.media-amazon.com/images/I/411KQQZDRsL._SY445_SX342_.jpg", description: "Batman's origin story.", year: 1987 },
    { title: "Watchmen", author: "Alan Moore", genre: "comics", price: 9.99, language: "English", rating: 4.8, image: "https://m.media-amazon.com/images/I/81Hf9W0uoxL._SY466_.jpg", description: "A dark superhero tale.", year: 1986 },
    { title: "Maus", author: "Art Spiegelman", genre: "comics", price: 8.49, language: "English", rating: 4.9, image: "https://m.media-amazon.com/images/I/81zJluSyo5L._SY522_.jpg", description: "A Holocaust survivor story told in graphic novel form.", year: 1991 },
    { title: "Spider-Man: Blue", author: "Jeph Loeb", genre: "comics", price: 6.99, language: "English", rating: 4.5, image: "https://m.media-amazon.com/images/I/51Arat4PWdL._SY445_SX342_.jpg", description: "A reflective love story of Peter Parker.", year: 2002 },
    { title: "Saga Vol. 1", author: "Brian K. Vaughan", genre: "comics", price: 7.49, language: "English", rating: 4.6, image: "https://m.media-amazon.com/images/I/71cVDK9BRaL._SY466_.jpg", description: "A sci-fi fantasy comic about love and war.", year: 2012 },

    { title: "A Brief History of Time", author: "Stephen Hawking", genre: "science", price: 10.99, language: "English", rating: 4.8, image: "https://m.media-amazon.com/images/I/513UmJY4jbL._SY445_SX342_QL70_ML2_.jpg", description: "Explore the universe.", year: 1988 },
    { title: "Cosmos", author: "Carl Sagan", genre: "science", price: 9.99, language: "English", rating: 4.7, image: "https://m.media-amazon.com/images/I/51e91glnHUL._SY445_SX342_QL70_ML2_.jpg", description: "A journey through space.", year: 1980 },
    { title: "The Selfish Gene", author: "Richard Dawkins", genre: "science", price: 8.99, language: "English", rating: 4.6, image: "https://m.media-amazon.com/images/I/81CCtn4O7-L._SX342_.jpg", description: "Evolution explained through gene-centered theory.", year: 1976 },
    { title: "The Gene", author: "Siddhartha Mukherjee", genre: "science", price: 11.49, language: "English", rating: 4.7, image: "https://m.media-amazon.com/images/I/81vpsIs58WL.jpg", description: "An intimate history of the gene.", year: 2016 },
    { title: "Astrophysics for People in a Hurry", author: "Neil deGrasse Tyson", genre: "science", price: 7.99, language: "English", rating: 4.6, image: "https://m.media-amazon.com/images/I/91XC6njeqGL._SX342_.jpg", description: "An easy introduction to the universe.", year: 2017 }
];

function showSection(sectionId) {
    ['home', 'genres', 'bestsellers', 'contact', 'auth'].forEach(id => {
        document.getElementById(id).style.display = id === sectionId ? 'block' : 'none';
    });
    if(sectionId === 'genres') displayBooks('genres');
    if(sectionId === 'bestsellers') displayBooks('bestsellers');
    if(sectionId === 'home') displayTopRatedBooks();
}

window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        document.getElementById('current-user').textContent = currentUser;
        document.getElementById('logout-section').style.display = 'block';
        showSection('home');
    }
    let users = JSON.parse(localStorage.getItem('users')) || {};

    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const message = document.createElement('div');

        if (users[username]) {
            message.className = 'auth-error';
            message.textContent = 'Username already exists!';
        } else {
            users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
            message.className = 'auth-success';
            message.textContent = 'Sign up successful! You can now log in.';
        }
        this.appendChild(message);
        setTimeout(() => message.remove(), 5000);
        this.reset();
    });

    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const message = document.createElement('div');

        if (users[username] && users[username] === password) {
            message.className = 'auth-success';
            message.textContent = 'Login successful!';
            localStorage.setItem('currentUser', username);
            setTimeout(() => {
                showSection('home');
                alert('Welcome, ' + username + '!');
            }, 1000);
        } else {
            message.className = 'auth-error';
            message.textContent = 'Invalid username or password!';
        }
        this.appendChild(message);
        setTimeout(() => message.remove(), 5000);
        this.reset();
    });
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('user-email').value;
        const message = document.getElementById('user-message').value;
        if (email && message) {
            const form = document.getElementById('contact-form');
            form.reset();
            const successMsg = document.createElement('div');
            successMsg.className = 'contact-form-success';
            successMsg.textContent = 'Thank you for contacting us! We will get back to you soon.';
            form.parentElement.insertBefore(successMsg, form.nextSibling);
            setTimeout(() => successMsg.remove(), 5000);
        }
    });
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const genre = document.getElementById('genre').value;
        const price = parseFloat(document.getElementById('price').value);
        const filteredBooks = books.filter(book => book.genre === genre && book.price <= price);
        displayBooks('recommendations', filteredBooks);
    });

    showSection('home');
}

function displayBooks(section, data = books) {
    const container = document.getElementById(section);
    container.innerHTML = '';
    const list = section === 'bestsellers' ? [...books].sort((a,b) => b.rating - a.rating) : data;
    list.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book';
        div.innerHTML = `<img src="${book.image}" alt="${book.title}"><h3>${book.title}</h3><p>${book.author}</p><p>£${book.price}</p><p>${book.rating}⭐</p>`;
        div.onclick = () => expandBook(book);
        container.appendChild(div);
    });
}

function displayTopRatedBooks() {
    const topBooks = [...books].sort((a,b) => b.rating - a.rating).slice(0, 6);
    displayBooks('top-rated', topBooks);
}

function expandBook(book) {
    const overlay = document.getElementById('overlay');
    const currentUser = localStorage.getItem('currentUser');
    const wishlistButton = currentUser ? 
        `<button onclick="addToWishlist('${book.title}')">Add to Wishlist</button>` : 
        `<button onclick="alert('Please login to add to wishlist.')">Add to Wishlist</button>`;

    overlay.innerHTML = `
        <div class='expanded'>
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>${book.description}</p>
            <p>Year of Publication: ${book.year || 'Unknown'}</p>
            <p>£${book.price}</p>
            <p>${book.rating}⭐</p>
            ${wishlistButton}
        </div>`;
    overlay.style.display = 'block';
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    location.reload();
}

function closeExpandedBook() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    overlay.innerHTML = '';
}
function showWishlist() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const wishlist = JSON.parse(localStorage.getItem(currentUser + '_wishlist')) || [];
        const wishlistContainer = document.getElementById('wishlist-items');
        wishlistContainer.innerHTML = '';
        wishlist.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            wishlistContainer.appendChild(li);
        });
        document.getElementById('wishlist').style.display = 'block';
    }
}
function addToWishlist(title) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        let wishlist = JSON.parse(localStorage.getItem(currentUser + '_wishlist')) || [];
        if (!wishlist.includes(title)) {
            wishlist.push(title);
            localStorage.setItem(currentUser + '_wishlist', JSON.stringify(wishlist));
            alert(title + ' added to your wishlist!');
        } else {
            alert(title + ' is already in your wishlist.');
        }
    }
}
showWishlist();
