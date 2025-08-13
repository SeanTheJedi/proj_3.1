# 📚 Simple Library Web App

A lightweight library management web application built with **Vanilla JavaScript**, **Standard CSS**, and **Semantic HTML**.  
It allows users to:

- Log in with their **library card number** and **password** (from a pre-generated list of users)
- View all available books
- Borrow books
- Return borrowed books
- See borrowed books and personal profile details
- Book availability is updated **globally** for all users
- State is persisted using **localStorage** so data remains after refreshing

---

## 📂 Project Structure
│
├── index.html # Main HTML file
├── styles.css # Styles for the app
├── script.js # App functionality (JavaScript)
└── PROMPTS-LOG.md # Instructions (this file)
└── README.md # Instructions (this file)


---

## 🛠 Requirements

- Any modern web browser (**Google Chrome**, **Firefox**, **Safari**, **Edge**, etc.)
- No server or build tools required — it runs locally

---

## 🚀 How to Run the App

1. **Download or Clone this Repository**

   ```bash
   git clone https://github.com/your-username/library-app.git
   cd library-app

2. **Open the App in a Browser**

   -Locate the index.html file
   
   -Double-click it OR right-click and choose "Open with" → Your Browser
   
   -The app will load in your browser
   
   -Login with a Test Account

The app has pre-generated users stored in script.js:
```
Card Number: 12345
Password: password123
Name: Alice Johnson

Card Number: 67890
Password: securepass
Name: Bob Smith
```


## 🚀 Using the App

-After logging in, you'll be taken to the Available Books page

-Click Borrow to borrow a book (it will become unavailable to other users)

-Go to My Profile to:

See your personal details

View borrowed books

Return books

Logout

Click Logout in the navigation bar to end your session

This will clear your login session but book availability will remain the same until returned
