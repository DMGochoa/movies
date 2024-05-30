const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');
const { boomErrorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const whitelist = ['http://localhost:5173'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
app.use(cors(options));

routerApi(app);
app.use(boomErrorHandler);

app.get('/', (req, res) => {
    res.send('is working');
});

app.listen(port, () => {
    console.log(`Listening port: ${port}`);
});
