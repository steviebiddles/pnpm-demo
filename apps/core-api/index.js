const express = require('express');
const { isOne, isTwo, isThree } = require('@steviebiddles/validator');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    console.log(isOne(1));
    console.log(isTwo(2));
    console.log(isThree(3));
    res.send({
        message: `Core API: Hello, ${req.query.name || 'World'}!`
    });
})

app.listen(PORT, () => console.log(`Core API listening on port ${PORT}!`))
