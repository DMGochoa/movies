const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
routerApi(app);

app.get('/', (req, res) => {
    res.send('is working');
});

app.listen(port, () => {
    console.log(`Listening port: ${port}`);
});
