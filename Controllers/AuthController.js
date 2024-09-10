const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
const PlayerModel = require("../Models/Player");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists, you can login', success: false });
        }

        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10); 
        await userModel.save(); 

        const newPlayer = new PlayerModel({
            user: userModel._id,  
            curr_x: 0,            
            curr_y: 0,
            score: 0,
            days_active: 0,
            last_active_date: Date.now(),
            current_level: 1
        });
        await newPlayer.save(); 

        res.status(201).json({
            message: "Signup successfully, Player created",
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
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed, email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        const player = await PlayerModel.findOne({ user: user._id });
        if (!player) {
            return res.status(404)
                .json({ message: "Player data not found", success: false });
        }

        const today = new Date().toDateString();
        const lastActiveDate = new Date(player.last_active_date).toDateString();

        if (lastActiveDate !== today) {
            player.days_active += 1;
            player.last_active_date = new Date();  
            await player.save();
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken,
            email,
            name: user.name
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
    signup,
    login
}