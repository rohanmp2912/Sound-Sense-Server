const router = require('express').Router();
const { getXY, getTreasureArray } = require('../Controllers/PlayerController')

router.get('/getXY', getXY);
router.get('/getTreasureArray', getTreasureArray);

module.exports = router;