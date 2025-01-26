const express = require('express');
const router = express.Router();

router.get('/name', (req, res) => {
    res.send('Your Name: Gurjot Singh');
});

router.get('/greeting', (req, res) => {
    res.send('Name: Gurjot Singh, Student Number: 01650123');
});


router.get('/add', (req, res) => {
    const x = parseFloat(req.query.x);
    const y = parseFloat(req.query.y);
    if (isNaN(x) || isNaN(y)) {
        return res.status(400).send('Please provide valid numbers for x and y.');
    }
    const result = x + y;
    res.send(`The sum of ${x} and ${y} is ${result}`);
});

router.get('/calculate', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const operation = req.query.operation;

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send('Please provide valid numbers for a and b.');
    }

    let result;
    switch (operation) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = b !== 0 ? a / b : 'Division by zero is not allowed.';
            break;
        case '**':
            result = a ** b;
            break;
        default:
            return res.status(400).send('Invalid operation. Use +, -, *, /, or **.');
    }

    res.send(`The result of ${a} ${operation} ${b} is ${result}`);
});

module.exports = router;
