const express = require('express');

// Sharing from another package
const test = require("@co-sketch/common");

const app = express();

app.get('/', (req, res) => {
    return res.send("You have a running server! Nice! cuuu");
});

const PORT = process.env.port || 8000;

console.log(test());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));