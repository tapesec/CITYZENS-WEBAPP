const express = require('express');
const app = express();

app.get('*', () => {
    res.send('it Works');
});

app.listen(3000, () => {
    console.log('ready to serve pages');
});
