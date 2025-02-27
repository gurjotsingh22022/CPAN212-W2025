const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;

const routes = require('./routes');
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
