import User from "../models/user.js";

export const registerPost = async (req, res, next) => {
    const { username, password, firstName, lastName, emailAddress } = req.body;

    const newUser = new User({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        albums: []
    });

    try {
        await newUser.save();   // We could get a validation error here if the schema is not fulfilled
    } catch {
        const err = new Error("User could not be created. Please try again");
        err.statusCode = 500;
        return next(err);
    }

    // Send a response to the client containing the new user object in a JSON format
    res.status(201).json({ id: newUser._id });
}