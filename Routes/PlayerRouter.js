const router = require('express').Router();
const { getXY, getTreasureArray, addTreasureBox, addScore, updateCoordinates } = require('../Controllers/PlayerController')

router.get('/getXY', getXY);
router.get('/getTreasureArray', getTreasureArray);
router.post('/addTreasureBox', addTreasureBox);
router.post('/addScore', addScore);
router.post('/updateCoordinates', updateCoordinates)

module.exports = router;