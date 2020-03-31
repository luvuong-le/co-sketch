const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send("You have a running server! Nice!");
});

const PORT = process.env.port || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));