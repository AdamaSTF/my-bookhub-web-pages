const books = [
    { title: "Atomic Habits", author: "James Clear", genre: "self-development", price: 9.99, language: "English", rating: 4.8, image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg", description: "Build good habits and break bad ones.", year: 2018 },
    { title: "The Power of Now", author: "Eckhart Tolle", genre: "self-development", price: 8.99, language: "English", rating: 4.7, image: "https://m.media-amazon.com/images/I/51wk62SpJaL._AC_UY327_FMwebp_QL65_.jpg", description: "Live in the present moment.", year: 1997 },
    { title: "Deep Work", author: "Cal Newport", genre: "self-development", price: 10.99, language: "English", rating: 4.5, image: "https://m.media-amazon.com/images/I/817nqpGoWbL._AC_UY327_FMwebp_QL65_.jpg", description: "Focus without distraction.", year: 2016 },
    { title: "Can't Hurt Me", author: "David Goggins", genre: "self-development", price: 11.99, language: "English", rating: 4.9, image: "https://m.media-amazon.com/images/I/81WcnNQ-TBL.jpg", description: "Master your mind and defy the odds.", year: 2018 },
    { title: "Mindset", author: "Carol Dweck", genre: "self-development", price: 10.49, language: "English", rating: 4.6, image: "https://m.media-amazon.com/images/I/61y1U-lPl5L._AC_UY327_FMwebp_QL65_.jpg", description: "The power of believing you can improve.", year: 2006 },

    { title: "Batman: Year One", author: "Frank Miller", genre: "comics", price: 7.99, language: "English", rating: 4.7, image: "https://m.media-amazon.com/images/I/61+hFGCapwL._AC_UY327_FMwebp_QL65_.jpg", description: "Batman's origin story.", year: 1987 },
    { title: "Watchmen", author: "Alan Moore", genre: "comics", price: 9.99, language: "English", rating: 4.8, image: "https://m.media-amazon.com/images/I/61naFQ4djKL._AC_UY327_FMwebp_QL65_.jpg", description: "A dark superhero tale.", year: 1986 },
    { title: "Maus", author: "Art Spiegelman", genre: "comics", price: 8.49, language: "English", rating: 4.9, image: "https://m.media-amazon.com/images/I/71nXxfnNEcL._AC_UY327_FMwebp_QL65_.jpg", description: "A Holocaust survivor story told in graphic novel form.", year: 1991 },
    { title: "Spider-Man: Blue", author: "Jeph Loeb", genre: "comics", price: 6.99, language: "English", rating: 4.5, image: "https://m.media-amazon.com/images/I/81PHzU0nPpL._AC_UY327_FMwebp_QL65_.jpg", description: "A reflective love story of Peter Parker.", year: 2002 },
    { title: "Saga Vol. 1", author: "Brian K. Vaughan", genre: "comics", price: 7.49, language: "English", rating: 4.6, image: "https://m.media-amazon.com/images/I/61GZy1rKMEL._AC_UY327_FMwebp_QL65_.jpg", description: "A sci-fi fantasy comic about love and war.", year: 2012 },

    { title: "A Brief History of Time", author: "Stephen Hawking", genre: "science", price: 10.99, language: "English", rating: 4.8, image: "https://m.media-amazon.com/images/I/81o5zZ5vRmL._AC_UY327_FMwebp_QL65_.jpg", description: "Explore the universe.", year: 1988 },
    { title: "Cosmos", author: "Carl Sagan", genre: "science", price: 9.99, language: "English", rating: 4.7, image: "https://m.media-amazon.com/images/I/916GmfmvbSL._AC_UY327_FMwebp_QL65_.jpg", description: "A journey through space.", year: 1980 },
    { title: "The Selfish Gene", author: "Richard Dawkins", genre: "science", price: 8.99, language: "English", rating: 4.6, image: "https://m.media-amazon.com/images/I/81CCtn4O7-L._AC_UY327_FMwebp_QL65_.jpg", description: "Evolution explained through gene-centered theory.", year: 1976 },
    { title: "The Gene", author: "Siddhartha Mukherjee", genre: "science", price: 11.49, language: "English", rating: 4.7, image: "https://m.media-amazon.com/images/I/81vpsIs58WL.jpg", description: "An intimate history of the gene.", year: 2016 },
    { title: "Astrophysics for People in a Hurry", author: "Neil deGrasse Tyson", genre: "science", price: 7.99, language: "English", rating: 4.6, image: "https://m.media-amazon.com/images/I/91XC6njeqGL._AC_UY327_FMwebp_QL65_.jpg", description: "An easy introduction to the universe.", year: 2017 }
];

function showSection(sectionId) {
    ['home', 'genres', 'bestsellers', 'contact', 'auth'].forEach(id => {
        document.getElementById(id).style.display = id === sectionId ? 'block' : 'none';
    });

    document.getElementById('home-secondary-nav').style.display = sectionId === 'home' ? 'flex' : 'none';
    document.getElementById('genres-secondary-nav').style.display = sectionId === 'genres' ? 'flex' : 'none';

    if (sectionId === 'genres') displayBooks('genres');
    if (sectionId === 'bestsellers') displayBooks('bestsellers');
    if (sectionId === 'home') displayTopRatedBooks();
    if (sectionId === 'home') {
        document.querySelector('h2.section-title').style.display = 'block';
        document.getElementById('recommendations').style.display = 'grid';
        document.getElementById('top-rated').style.display = 'grid';
    } else {
        document.querySelector('h2.section-title').style.display = 'none';
        document.getElementById('recommendations').style.display = 'none';
        document.getElementById('top-rated').style.display = 'none';
    }
    const homeTitles = document.querySelectorAll('#home h2.section-title');
    homeTitles.forEach(title => {
        title.style.display = sectionId === 'home' ? 'block' : 'none';
    });
}


window.onload = function() {
    try {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            showSection('home');
            showWishlist();
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

        document.getElementById('searchForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const freeText = document.getElementById('freeTextSearch').value.toLowerCase();
            const filteredBooks = books.filter(book => {
                return freeText === '' || 
                    book.title.toLowerCase().includes(freeText) ||
                    book.author.toLowerCase().includes(freeText) ||
                    book.description.toLowerCase().includes(freeText) ||
                    book.genre.toLowerCase().includes(freeText) ||
                    book.year.toString().includes(freeText);
            });
            const currentSection = document.getElementById('genres').style.display === 'block' ? 'genres' : 'recommendations';
            displayBooks(currentSection, filteredBooks);
        });

        showSection('home');
    } catch (error) {
        console.error('Error during page load:', error);
    }
}

function filterGenre(genre) {
    const filteredBooks = books.filter(book => book.genre === genre);
    const currentSection = document.getElementById('genres').style.display === 'block' ? 'genres' : 'recommendations';
    displayBooks(currentSection, filteredBooks);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? true : false;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (halfStar) {
        stars += '☆'; 
    }
    return stars;
}

function displayBooks(section, data = books) {
    let container;
    if (section === 'genres') {
        container = document.getElementById('genres-books');
    } else if (section === 'bestsellers') {
        container = document.getElementById('bestsellers-books');
    } else {
        container = document.getElementById(section);
    }

    container.innerHTML = '';
    const list = section === 'bestsellers' ? [...books].sort((a, b) => b.rating - a.rating) : data;
    list.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book';
        div.innerHTML = `<img src="${book.image}" alt="${book.title}"><h3>${book.title}</h3><p>${book.author}</p><p>£${book.price}</p><p>${book.description}</p>`;
        div.onclick = () => expandBook(book);
        container.appendChild(div);
    });
}



function filterByPrice() {
    const maxPrice = parseFloat(document.getElementById('filterPrice').value);
    if (isNaN(maxPrice)) return;
    const filteredBooks = books.filter(book => book.price <= maxPrice);
    const currentSection = document.getElementById('genres').style.display === 'block' ? 'genres' : 'recommendations';
    displayBooks(currentSection, filteredBooks);
}

function displayTopRatedBooks() {
    const topBooks = [...books].sort((a,b) => b.rating - a.rating).slice(0, 6);
    displayBooks('top-rated', topBooks);
}

function expandBook(book) {
    try {
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
            <button onclick="closeExpandedBook()">Close</button>
        </div>`;
        overlay.style.display = 'block';
    } catch (error) {
        console.error('Error expanding book:', error);
    }
}

function showWishlist() {
    try {
        const currentUser = localStorage.getItem('currentUser');
        const wishlistSection = document.getElementById('wishlist');
        const userInfo = document.getElementById('user-info');
        const welcomeMessage = document.getElementById('welcome-message');

        if (currentUser) {
            welcomeMessage.textContent = `Hello, ${currentUser}`;
            userInfo.style.display = 'block';

            const wishlist = JSON.parse(localStorage.getItem(currentUser + '_wishlist')) || [];
            const wishlistContainer = document.getElementById('wishlist-items');
            wishlistContainer.innerHTML = '';

            if (wishlist.length === 0) {
                wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
            } else {
                wishlist.forEach(title => {
                    const book = books.find(b => b.title === title);
                    if (book) {
                        const div = document.createElement('div');
                        div.className = 'wishlist-book';
                        div.innerHTML = `
                            <img src="${book.image}" alt="${book.title}" style="width:100px; height:auto; border-radius:5px;">
                            <div class="wishlist-details">
                                <h4>${book.title}</h4>
                                <p>Author: ${book.author}</p>
                                <p>£${book.price}</p>
                                <p>Rating: ${book.rating} ⭐</p>
                                <button onclick="removeFromWishlist('${book.title}')">Remove</button>
                            </div>
                        `;
                        wishlistContainer.appendChild(div);
                    }
                });
            }

            wishlistSection.style.display = 'block';
        } else {
            userInfo.style.display = 'none';
            wishlistSection.style.display = 'none';
        }
    } catch (error) {
        console.error('Error showing wishlist:', error);
    }
}



function addToWishlist(title) {
    try {
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
    } catch (error) {
        console.error('Error adding to wishlist:', error);
    }
}
function removeFromWishlist(title) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        let wishlist = JSON.parse(localStorage.getItem(currentUser + '_wishlist')) || [];
        wishlist = wishlist.filter(item => item !== title);
        localStorage.setItem(currentUser + '_wishlist', JSON.stringify(wishlist));
        alert(title + ' removed from your wishlist.');
        showWishlist(); // Refresh wishlist display
    }
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    document.getElementById('wishlist').style.display = 'none';
    document.getElementById('user-info').style.display = 'none';
    location.reload();
}

function closeExpandedBook() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    overlay.innerHTML = '';
}