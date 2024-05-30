const express = require('express');

const movieRouter = require('./movie');

function routerApi(app) {
    const router = express.Router();
    app.use('/api', router);
    router.use('/movies', movieRouter);
    return app;
}

module.exports = routerApi;
