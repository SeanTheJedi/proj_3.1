// Pre-generated users
const users = [
    {
        fullName: "Alice Johnson",
        cardNumber: "12345",
        password: "password123",
        email: "alice@example.com",
        phone: "555-1234"
    },
    {
        fullName: "Bob Smith",
        cardNumber: "67890",
        password: "securepass",
        email: "bob@example.com",
        phone: "555-5678"
    }
];

// Books data
let books = [
    { id: 1, title: "1984", author: "George Orwell", available: true },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", available: true },
    { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", available: true },
    { id: 4, title: "Moby Dick", author: "Herman Melville", available: true },
    { id: 5, title: "Pride and Prejudice", author: "Jane Austen", available: true }
];

let currentUser = null;
let borrowedBooks = [];

// Elements
const loginPage = document.getElementById("loginPage");
const booksPage = document.getElementById("booksPage");
const profilePage = document.getElementById("profilePage");
const navBar = document.getElementById("navBar");
const loginError = document.getElementById("loginError");

// Load state from localStorage
window.onload = () => {
    const savedUser = localStorage.getItem("currentUser");
    const savedBorrowed = localStorage.getItem("borrowedBooks");
    const savedBooks = localStorage.getItem("booksData");

    if (savedBooks) {
        books = JSON.parse(savedBooks);
    }
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        borrowedBooks = savedBorrowed ? JSON.parse(savedBorrowed) : [];
        showLoggedInView();
    }
};

// Login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const password = document.getElementById("password").value.trim();

    const foundUser = users.find(u => u.cardNumber === cardNumber && u.password === password);
    if (foundUser) {
        currentUser = foundUser;

        // Load this user's borrowed books from storage
        const userBorrowed = localStorage.getItem(`borrowed_${currentUser.cardNumber}`);
        borrowedBooks = userBorrowed ? JSON.parse(userBorrowed) : [];

        saveState();
        showLoggedInView();
        loginError.classList.add("hidden");
    } else {
        loginError.classList.remove("hidden");
    }
});

function showLoggedInView() {
    loginPage.classList.add("hidden");
    booksPage.classList.remove("hidden");
    navBar.classList.remove("hidden");
    renderBooks();
}

function renderBooks() {
    const booksList = document.getElementById("booksList");
    booksList.innerHTML = "";
    books.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p><em>${book.author}</em></p>
            <button ${!book.available ? "disabled" : ""} onclick="borrowBook(${book.id})">
                ${book.available ? "Borrow" : "Unavailable"}
            </button>
        `;
        booksList.appendChild(bookDiv);
    });
}

function borrowBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book && book.available) {
        book.available = false;
        borrowedBooks.push(book);
        saveState();
        renderBooks();
    }
}

function returnBook(bookId) {
    // Remove from user's borrowed books
    borrowedBooks = borrowedBooks.filter(b => b.id !== bookId);

    // Mark as available in global book list
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.available = true;
    }

    saveState();
    renderProfile();
    renderBooks();
}

function showPage(pageId) {
    [booksPage, profilePage].forEach(page => page.classList.add("hidden"));
    document.getElementById(pageId).classList.remove("hidden");

    if (pageId === "profilePage") {
        renderProfile();
    }
}

function renderProfile() {
    const userDetails = document.getElementById("userDetails");
    const borrowedList = document.getElementById("borrowedList");

    userDetails.innerHTML = `
        <p><strong>Name:</strong> ${currentUser.fullName}</p>
        <p><strong>Library Card:</strong> ${currentUser.cardNumber}</p>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <p><strong>Phone:</strong> ${currentUser.phone}</p>
    `;

    borrowedList.innerHTML = borrowedBooks.length 
        ? borrowedBooks.map(b => `
            <p>
                ${b.title} - <em>${b.author}</em>
                <button onclick="returnBook(${b.id})">Return</button>
            </p>
        `).join("")
        : "<p>No books borrowed yet.</p>";
}

function logout() {
    currentUser = null;
    borrowedBooks = [];
    localStorage.removeItem("currentUser");
    navBar.classList.add("hidden");
    loginPage.classList.remove("hidden");
    booksPage.classList.add("hidden");
    profilePage.classList.add("hidden");
    document.getElementById("cardNumber").value = "";
    document.getElementById("password").value = "";
}

function saveState() {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
    localStorage.setItem(`borrowed_${currentUser.cardNumber}`, JSON.stringify(borrowedBooks));
    localStorage.setItem("booksData", JSON.stringify(books));
}
