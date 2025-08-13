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




