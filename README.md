# Smart Burme Book Website Structure

Based on your requirements, I'll outline the structure for your "Smart Burme Book" website with a black background theme.

## Directory Structure
```
smart-burme-book/
├── main/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── image/
│   │   └── logo.jpg
│   └── site/
│       ├── menu.html
│       ├── menu.css
│       └── menu.js
└── index.html
```

## HTML Template (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Burme Book</title>
    <link rel="stylesheet" href="main/css/style.css">
</head>
<body>
    <header>
        <div class="logo">
            <a href="index.html">
                <img src="main/image/logo.jpg" alt="Smart Burme Book Logo">
            </a>
        </div>
        <nav class="menu">
            <a href="main/site/menu.html">Menu</a>
            <!-- Add more navigation items as needed -->
        </nav>
    </header>

    <main>
        <h1>Welcome to Smart Burme Book</h1>
        <!-- Your content here -->
    </main>

    <footer>
        <p>2025. Deployed by Smart Burme</p>
    </footer>

    <script src="main/js/script.js"></script>
</body>
</html>
```

## CSS (main/css/style.css)
```css
/* Main Stylesheet */
body {
    background-color: #000000; /* Black background */
    color: #ffffff; /* White text for contrast */
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #111111;
}

.logo img {
    height: 50px; /* Adjust as needed */
}

.menu a {
    color: #ffffff;
    text-decoration: none;
    margin-left: 20px;
    font-size: 18px;
}

.menu a:hover {
    color: #cccccc;
}

main {
    padding: 20px;
    min-height: 80vh;
}

footer {
    text-align: center;
    padding: 20px;
    background-color: #111111;
}
```

## JavaScript (main/js/script.js)
```javascript
// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Smart Burme Book website loaded');
    // Add your JavaScript functionality here
});
```

## Menu Page (main/site/menu.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu - Smart Burme Book</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="menu.css">
</head>
<body>
    <header>
        <div class="logo">
            <a href="../index.html">
                <img src="../image/logo.jpg" alt="Smart Burme Book Logo">
            </a>
        </div>
        <nav class="menu">
            <a href="../index.html">Home</a>
            <!-- Add more navigation items as needed -->
        </nav>
    </header>

    <main>
        <h1>Menu</h1>
        <ul class="menu-list">
            <li><a href="#">xxx (link folder)</a></li>
            <li><a href="#">xxxx (link)</a></li>
            <li><a href="#">xxxx (link)</a></li>
            <li><a href="#">etc...</a></li>
        </ul>
    </main>

    <footer>
        <p>2025. Deployed by Smart Burme</p>
    </footer>

    <script src="menu.js"></script>
</body>
</html>
```

## Menu CSS (main/site/menu.css)
```css
/* Menu specific styles */
.menu-list {
    list-style-type: none;
    padding: 0;
}

.menu-list li {
    margin: 10px 0;
}

.menu-list a {
    color: #ffffff;
    text-decoration: none;
    font-size: 16px;
}

.menu-list a:hover {
    color: #cccccc;
    text-decoration: underline;
}
```

## Menu JavaScript (main/site/menu.js)
```javascript
// Menu specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Menu page loaded');
    // Add menu specific functionality here
});
```

This structure follows your requirements with:
1. Black background (#000000)
2. Logo linked from main/image/logo.jpg
3. Menu linked to main/site/menu.html
4. Organized CSS, JS, and image files in their respective directories
5. Clean separation between main site and menu-specific files

You can expand this structure by adding more pages in the main/site/ directory and linking to them from the menu.
