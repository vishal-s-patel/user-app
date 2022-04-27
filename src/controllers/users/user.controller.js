const { StatusCodes } = require('http-status-codes');
const userHelper = require('../../helpers/user.helper');

exports.SignUp = async (req, res) => {
    try {
        const payload = { ...req.body, image: req.file.path }
        const result = await userHelper.signUp(payload);
        return res.status(StatusCodes.OK).json({
            data: result,
            message: 'Signup successfull'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error.message
        })
    }
}

exports.Login = async (req, res) => {
    try {
        const result = await userHelper.login(req.body);
        if (result) {
            return res.status(StatusCodes.OK).json({
                data: result,
                message: 'Login Successfull'
            })
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message,
            message: 'Invalid credentials'
        })
    }
}

exports.GetUserDetails = async (req, res) => {
    try {
        const result = await userHelper.getUserDetails(req.query.email);
        return res.status(StatusCodes.OK).json({
            data: result,
            message: 'User details fetched successfully'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error.message
        })
    }
}