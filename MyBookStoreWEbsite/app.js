const books = [
    { title: "Atomic Habits", author: "James Clear", genre: "self-development", price: 11.99, language: "English", rating: 4.8, image: "book1.jpg" },
    { title: "The Power of Habit", author: "Charles Duhigg", genre: "self-development", price: 13.99, language: "English", rating: 4.7, image: "book2.jpg" },
    { title: "Marvel Avengers", author: "Stan Lee", genre: "comics", price: 9.99, language: "English", rating: 4.6, image: "book3.jpg" },
    { title: "The Science Book", author: "DK", genre: "science", price: 15.99, language: "English", rating: 4.9, image: "book4.jpg" },
    { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", genre: "history", price: 14.99, language: "English", rating: 4.8, image: "book5.jpg" }
];

// Function to show books by selected theme
function showBooksByTheme(theme) {
    const filteredBooks = books.filter(book => book.genre === theme);
    displayBooks(filteredBooks);
}

// Function to show bestsellers (sorted by rating)
function showBestSellers() {
    const sortedBooks = [...books].sort((a, b) => b.rating - a.rating);
    displayBooks(sortedBooks);
}

// Function to display books in grid
function displayBooks(filteredBooks) {
    const recommendationsDiv = document.getElementById("recommendations");
    recommendationsDiv.innerHTML = "";

    if (filteredBooks.length === 0) {
        recommendationsDiv.innerHTML = "<p style='text-align:center;'>No books match your criteria.</p>";
        return;
    }

    filteredBooks.forEach(book => {
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.title} Cover">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Price:</strong> $${book.price.toFixed(2)}</p>
            <p><strong>Rating:</strong> ${book.rating} ⭐</p>
        `;
        recommendationsDiv.appendChild(bookDiv);
    });
}

// Contact Us section toggle
function toggleContactUs() {
    const contactSection = document.getElementById("contact");
    if (contactSection.style.display === "none" || contactSection.style.display === "") {
        contactSection.style.display = "block"; // Show the contact section
    } else {
        contactSection.style.display = "none"; // Hide the contact section
    }
}

// Sign up functionality
document.getElementById("sign-up-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("sign-up-username").value;
    const password = document.getElementById("sign-up-password").value;
    alert("Sign Up Successful!");
    localStorage.setItem("user", JSON.stringify({ username, password }));
});

// Login functionality
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
        alert("Login Successful!");
    } else {
        alert("Invalid login credentials.");
    }
});

// Toggle Sign Up / Login forms
function toggleSignUp() {
    document.getElementById("sign-up-section").style.display = "block";
    document.getElementById("login-section").style.display = "none";
}

function toggleLogin() {
    document.getElementById("sign-up-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}
