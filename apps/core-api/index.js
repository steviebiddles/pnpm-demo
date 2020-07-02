const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send({
        message: `Core API: Hello, ${req.query.name || 'World'}!`
    });
})

app.listen(PORT, () => console.log(`Core API listening on port ${PORT}!`))
