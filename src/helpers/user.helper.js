const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (payload) => {
    const emailTaken = await User.findOne({ email: payload.email }).lean();
    if (emailTaken) {
        throw new Error('Email already taken');
    }
    const user = new User({
        name: payload.name.toString(),
        email: payload.email.toString(),
        password: await bcrypt.hash(payload.password, 10),
        birthdate: new Date(payload.birthdate),
        image: payload.image
    })
    return user.save();
}

exports.login = async (payload) => {
    const user = await User.findOne({ email: payload.email }).lean();
    const password = await bcrypt.compare(payload.password, user.password);
    if (password) {
        const token = await jwt.sign(user.email, 'secret');
        return { ...user, token: token };
    } else {
        throw Error('Invalid credential')
    }
}

exports.getUserDetails = async (email) => {
    const user = await User.findOne({ email: email }).lean();
    let today = new Date();
    let bday = new Date(user.birthdate);
    let upcomingBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
    if (today > upcomingBday) {
        upcomingBday.setFullYear(today.getFullYear() + 1);
    }
    const one_day = 24 * 60 * 60 * 1000;
    let daysLeft = Math.ceil((upcomingBday.getTime() - today.getTime()) / (one_day));
    if (daysLeft <= 7) {
        return { ...user, birthdate: `${daysLeft} days to go` };
    }
    return user;
}