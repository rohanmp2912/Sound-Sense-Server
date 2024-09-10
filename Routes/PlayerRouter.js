const router = require('express').Router();
const { getXY } = require('../Controllers/PlayerController')

router.get('/getXY', getXY);

module.exports = router;