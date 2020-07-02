const express = require('express');

const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
    res.send({
        message: `Users API: Hello, ${req.query.name || 'World'}!`
    });
})

app.listen(PORT, () => console.log(`Users API listening on port ${PORT}!`));

