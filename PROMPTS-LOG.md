# proj_3.1
A library web app

Prompts

Prompt 1: 
Using Vanilla JavaScript, Standard CSS and Semantic HTML. Write a web application that helps users keep track of available books in a library. Through this same web application they should be able to burrow a book and have their burrowed books show in their profile. The should be a login page. Make sure the styling is simple and organised.

Response 1:
Got it — you want a simple, organized Vanilla JavaScript + Standard CSS + Semantic HTML library management web app with:

A Login page (mock login, no backend)

A Books page to view available books

The ability to borrow ("burrow") books

A Profile page showing borrowed books

I’ll keep it simple, structured, and functional so it works in a single HTML/JS/CSS setup without a server.

Here’s the complete code:

```
HTML File

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Library App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            background: #f4f4f4;
        }
        header {
            background: #333;
            color: #fff;
            padding: 1rem;
            text-align: center;
        }
        nav {
            background: #444;
            display: flex;
            justify-content: center;
            gap: 1rem;
            padding: 0.5rem;
        }
        nav a {
            color: #fff;
            text-decoration: none;
        }
        main {
            max-width: 800px;
            margin: auto;
            padding: 1rem;
            background: #fff;
            margin-top: 1rem;
            border-radius: 5px;
        }
        .book-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        .book {
            border: 1px solid #ccc;
            padding: 0.5rem;
            border-radius: 4px;
            background: #fafafa;
        }
        button {
            background: #333;
            color: #fff;
            border: none;
            padding: 0.5rem;
            cursor: pointer;
            border-radius: 3px;
        }
        button:disabled {
            background: #aaa;
            cursor: not-allowed;
        }
        .hidden {
            display: none;
        }
        form {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        input {
            padding: 0.5rem;
            font-size: 1rem;
        }
    </style>
</head>
<body>

<header>
    <h1>📚 Simple Library</h1>
</header>

<nav class="hidden" id="navBar">
    <a href="#" onclick="showPage('booksPage')">Available Books</a>
    <a href="#" onclick="showPage('profilePage')">My Profile</a>
    <a href="#" onclick="logout()">Logout</a>
</nav>

<main id="loginPage">
    <h2>Login</h2>
    <form id="loginForm">
        <label for="username">Username:</label>
        <input type="text" id="username" required>
        <button type="submit">Login</button>
    </form>
</main>

<main id="booksPage" class="hidden">
    <h2>Available Books</h2>
    <div class="book-list" id="booksList"></div>
</main>

<main id="profilePage" class="hidden">
    <h2>My Borrowed Books</h2>
    <div id="borrowedList"></div>
</main>

<script>
    const books = [
        { id: 1, title: "1984", author: "George Orwell", available: true },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", available: true },
        { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", available: true },
        { id: 4, title: "Moby Dick", author: "Herman Melville", available: true },
        { id: 5, title: "Pride and Prejudice", author: "Jane Austen", available: true }
    ];

    let borrowedBooks = [];
    let currentUser = "";

    const loginPage = document.getElementById("loginPage");
    const booksPage = document.getElementById("booksPage");
    const profilePage = document.getElementById("profilePage");
    const navBar = document.getElementById("navBar");

    document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();
        currentUser = document.getElementById("username").value.trim();
        if (currentUser) {
            loginPage.classList.add("hidden");
            booksPage.classList.remove("hidden");
            navBar.classList.remove("hidden");
            renderBooks();
        }
    });

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
            renderBooks();
        }
    }

    function showPage(pageId) {
        [booksPage, profilePage].forEach(page => page.classList.add("hidden"));
        document.getElementById(pageId).classList.remove("hidden");

        if (pageId === "profilePage") {
            renderProfile();
        }
    }

    function renderProfile() {
        const borrowedList = document.getElementById("borrowedList");
        borrowedList.innerHTML = borrowedBooks.length 
            ? borrowedBooks.map(b => `<p>${b.title} - <em>${b.author}</em></p>`).join("")
            : "<p>No books borrowed yet.</p>";
    }

    function logout() {
        currentUser = "";
        borrowedBooks = [];
        books.forEach(b => b.available = true);
        navBar.classList.add("hidden");
        loginPage.classList.remove("hidden");
        booksPage.classList.add("hidden");
        profilePage.classList.add("hidden");
        document.getElementById("username").value = "";
    }
</script>

</body>
</html>

```
How it works:

Login — User enters a username (no password for simplicity).

Books Page — Shows a grid of available books with a Borrow button.

Borrowing — Disables the button and moves the book to the user’s profile list.

Profile Page — Lists all borrowed books.

Logout — Resets state and returns to login.

The styling is intentionally clean and minimal so you can expand it easily.

If you want, I can add localStorage so the borrowed books and login persist even after refreshing the page. That would make it feel more like a real mini-app. Would you like me to do that next?


Prompt 2: For more clarity separate the HTML, CSS and JavaScript into different files.
Response 2:
HTML
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Library App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<header>
    <h1>📚 Simple Library</h1>
</header>

<nav class="hidden" id="navBar">
    <a href="#" onclick="showPage('booksPage')">Available Books</a>
    <a href="#" onclick="showPage('profilePage')">My Profile</a>
    <a href="#" onclick="logout()">Logout</a>
</nav>

<main id="loginPage">
    <h2>Login</h2>
    <form id="loginForm">
        <label for="username">Username:</label>
        <input type="text" id="username" required>
        <button type="submit">Login</button>
    </form>
</main>

<main id="booksPage" class="hidden">
    <h2>Available Books</h2>
    <div class="book-list" id="booksList"></div>
</main>

<main id="profilePage" class="hidden">
    <h2>My Borrowed Books</h2>
    <div id="borrowedList"></div>
</main>

<script src="script.js"></script>
</body>
</html>

```

CSS

```
body {
    font-family: Arial, sans-serif;
    margin: 0;
    background: #f4f4f4;
}
header {
    background: #333;
    color: #fff;
    padding: 1rem;
    text-align: center;
}
nav {
    background: #444;
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
}
nav a {
    color: #fff;
    text-decoration: none;
}
main {
    max-width: 800px;
    margin: auto;
    padding: 1rem;
    background: #fff;
    margin-top: 1rem;
    border-radius: 5px;
}
.book-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}
.book {
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 4px;
    background: #fafafa;
}
button {
    background: #333;
    color: #fff;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 3px;
}
button:disabled {
    background: #aaa;
    cursor: not-allowed;
}
.hidden {
    display: none;
}
form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
input {
    padding: 0.5rem;
    font-size: 1rem;
}

```

JavaScript
```
body {
    font-family: Arial, sans-serif;
    margin: 0;
    background: #f4f4f4;
}
header {
    background: #333;
    color: #fff;
    padding: 1rem;
    text-align: center;
}
nav {
    background: #444;
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
}
nav a {
    color: #fff;
    text-decoration: none;
}
main {
    max-width: 800px;
    margin: auto;
    padding: 1rem;
    background: #fff;
    margin-top: 1rem;
    border-radius: 5px;
}
.book-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}
.book {
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 4px;
    background: #fafafa;
}
button {
    background: #333;
    color: #fff;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 3px;
}
button:disabled {
    background: #aaa;
    cursor: not-allowed;
}
.hidden {
    display: none;
}
form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
input {
    padding: 0.5rem;
    font-size: 1rem;
}
```

Prompt 3: Yes, you can add localStorage. Also add a password feature to the login page. Instead of asking for a username on the login page, ask for a library card number instead. Also have pre-generated list of users in the script.js file with details such as full name, library card number email and phone number. Display the the user's details in the profile page once they are signed in.

Response 3:
index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Library App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<header>
    <h1>📚 Simple Library</h1>
</header>

<nav class="hidden" id="navBar">
    <a href="#" onclick="showPage('booksPage')">Available Books</a>
    <a href="#" onclick="showPage('profilePage')">My Profile</a>
    <a href="#" onclick="logout()">Logout</a>
</nav>

<main id="loginPage">
    <h2>Library Login</h2>
    <form id="loginForm">
        <label for="cardNumber">Library Card Number:</label>
        <input type="text" id="cardNumber" required>

        <label for="password">Password:</label>
        <input type="password" id="password" required>

        <button type="submit">Login</button>
    </form>
    <p id="loginError" class="error hidden">Invalid credentials. Please try again.</p>
</main>

<main id="booksPage" class="hidden">
    <h2>Available Books</h2>
    <div class="book-list" id="booksList"></div>
</main>

<main id="profilePage" class="hidden">
    <h2>My Profile</h2>
    <div id="userDetails"></div>
    <h3>Borrowed Books</h3>
    <div id="borrowedList"></div>
</main>

<script src="script.js"></script>
</body>
</html>

```

style.css
```
body {
    font-family: Arial, sans-serif;
    margin: 0;
    background: #f4f4f4;
}
header {
    background: #333;
    color: #fff;
    padding: 1rem;
    text-align: center;
}
nav {
    background: #444;
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
}
nav a {
    color: #fff;
    text-decoration: none;
}
main {
    max-width: 800px;
    margin: auto;
    padding: 1rem;
    background: #fff;
    margin-top: 1rem;
    border-radius: 5px;
}
.book-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}
.book {
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 4px;
    background: #fafafa;
}
button {
    background: #333;
    color: #fff;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 3px;
}
button:disabled {
    background: #aaa;
    cursor: not-allowed;
}
.hidden {
    display: none;
}
.error {
    color: red;
    margin-top: 0.5rem;
}
form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
input {
    padding: 0.5rem;
    font-size: 1rem;
}
```

script.js
```
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
const books = [
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

// Check for saved session
window.onload = () => {
    const savedUser = localStorage.getItem("currentUser");
    const savedBooks = localStorage.getItem("borrowedBooks");
    const savedBooksState = localStorage.getItem("booksState");

    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        borrowedBooks = savedBooks ? JSON.parse(savedBooks) : [];
        if (savedBooksState) {
            const state = JSON.parse(savedBooksState);
            state.forEach((b, i) => books[i].available = b.available);
        }
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
        borrowedBooks = [];
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
        ? borrowedBooks.map(b => `<p>${b.title} - <em>${b.author}</em></p>`).join("")
        : "<p>No books borrowed yet.</p>";
}

function logout() {
    currentUser = null;
    borrowedBooks = [];
    books.forEach(b => b.available = true);
    localStorage.clear();
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
    localStorage.setItem("booksState", JSON.stringify(books));
}
```
Prompt 4: When a book is burrowed by user, it has to show as unavailable to other users. Also include a button that allows users to return books burrowed.

Response 4: Alright — I’ll update the app so that:

Borrowed books stay unavailable for all users (this will be stored in localStorage globally, not just per user).

Return Book button in the profile lets users give books back.

When a book is returned, it instantly becomes available to everyone.

Updated script.js
```
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
```
Changes Made

Global book availability stored in localStorage (booksData) so if Alice borrows a book, Bob sees it as “Unavailable.”

Each user’s borrowed list stored separately in borrowed_<cardNumber>.

Return Book button in profile page lets the user make a book available again for everyone.

UI updates instantly for all pages after return.
