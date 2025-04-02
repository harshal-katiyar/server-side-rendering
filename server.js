const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Configure middleware - THESE LINES ARE CRUCIAL
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let formData = {
    name: '',
    email: '',
    message: ''
};

app.get('/', (req, res) => {
    res.render('index', { 
        messages: {}, 
        formData 
    });
});

app.post('/submit', (req, res) => {
    // Add error handling for undefined body
    if (!req.body) {
        return res.status(400).render('index', {
            messages: { error: 'Invalid form submission' },
            formData
        });
    }

    const { name, email, message } = req.body;
    
    // Simple validation
    const messages = {};
    if (!name || !email || !message) {
        messages.error = 'All fields are required!';
    } else {
        formData = { name, email, message };
        console.log(formData);
        messages.success = 'Form submitted successfully!';
    }
    
    res.render('index', { 
        messages, 
        formData 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});