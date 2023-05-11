const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: "Websocket Chat",
        style: "index"
    });
});

module.exports = router;