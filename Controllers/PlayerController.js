const PlayerModel = require('../Models/Player');
const jwt = require('jsonwebtoken');

const getXY = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const player = await PlayerModel.findOne({ user: decoded._id });
        if (!player) {
            return res.status(404).json({ message: "Player not found", success: false });
        }

        res.status(200).json({
            curr_x: player.curr_x,
            curr_y: player.curr_y,
            success: true
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const getTreasureArray = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const player = await PlayerModel.findOne({ user: decoded._id });

        if (!player) {
            return res.status(404).json({ message: "Player not found", success: false });
        }

        res.status(200).json({
            arr: player.treasuresCollected,
            success: true
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const addTreasureBox = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const player = await PlayerModel.findOne({ user: decoded._id });
        if (!player) {
            return res.status(404).json({ message: "Player not found", success: false });
        }

        const { treasureIndex } = req.body;

        if (!player.treasuresCollected.includes(treasureIndex)) {
            player.treasuresCollected.push(treasureIndex);

            await player.save();

            return res.status(200).json({
                message: "Treasure box collected successfully!",
                success: true
            });
        } else {
            return res.status(400).json({
                message: "Treasure box already collected.",
                success: false
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    getXY,
    getTreasureArray,
    addTreasureBox
};
