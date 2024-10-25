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

const addScore = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const player = await PlayerModel.findOne({ user: decoded._id });
        if (!player) {
            return res.status(404).json({ score: null });
        }

        const { level } = req.body;

        // Scoring logic: Level 1 -> 10 points, Level 2 -> 20 points
        let scoreToAdd = level === 1 ? 10 : level === 2 ? 20 : 0;

        // Update player's score
        player.score += scoreToAdd;

        await player.save();

        return res.status(200).json({ score: player.score });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ score: null });
    }
};

const updateCoordinates = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const player = await PlayerModel.findOne({ user: decoded._id });
        if (!player) {
            return res.status(404).json({ message: "Player not found", success: false });
        }

        const { newX, newY } = req.body;

        player.curr_x = newX;
        player.curr_y = newY;

        await player.save();

        return res.status(200).json({
            curr_x: player.curr_x,
            curr_y: player.curr_y
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const resetPlayerData = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const player = await PlayerModel.findOne({ user: decoded._id });
        if (!player) {
            return res.status(404).json({ message: "Player not found", success: false });
        }

        player.treasuresCollected = [];
        player.score = 0;
        player.curr_x = 750;
        player.curr_y = 0;

        await player.save();

        return res.status(200).json({
            message: "Player data reset successfully",
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

const getData = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const player = await PlayerModel.findOne({ user: decoded._id });
        if (!player) {
            return res.status(404).json({ message: "Player not found", success: false });
        }

        res.status(200).json({
            player
        });
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
    addTreasureBox,
    addScore,
    updateCoordinates,
    resetPlayerData,
    getData
};
