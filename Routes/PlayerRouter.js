const router = require('express').Router();
const { getXY, getTreasureArray, addTreasureBox, addScore } = require('../Controllers/PlayerController')

router.get('/getXY', getXY);
router.get('/getTreasureArray', getTreasureArray);
router.post('/addTreasureBox', addTreasureBox);
router.post('/addScore', addScore);

module.exports = router;