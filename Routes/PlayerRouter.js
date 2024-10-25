const router = require('express').Router();
const { getXY, getTreasureArray, addTreasureBox, addScore, updateCoordinates, resetPlayerData, getData } = require('../Controllers/PlayerController')

router.get('/getXY', getXY);
router.get('/getData', getData);
router.get('/getTreasureArray', getTreasureArray);
router.post('/addTreasureBox', addTreasureBox);
router.post('/addScore', addScore);
router.post('/updateCoordinates', updateCoordinates);
router.delete('/', resetPlayerData);

module.exports = router;