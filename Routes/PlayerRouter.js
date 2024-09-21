const router = require('express').Router();
const { getXY, getTreasureArray, addTreasureBox } = require('../Controllers/PlayerController')

router.get('/getXY', getXY);
router.get('/getTreasureArray', getTreasureArray);
router.post('/addTreasureBox', addTreasureBox)

module.exports = router;