import mongoose from "mongoose";

const { Schema } = mongoose;

/*
* Some common schema types:
- String
- Number
- Array
- Boolean
- Buffer
- Mixed
- ObjectId (24 characters)

... But not Object! Don't try to write "type: Object"
*/

const userSchema = new Schema({
    // Make sure each username in the collection is unique
    // Cause an error if a user tries to register with a username which has already been taken
    //                                          ^
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,  // firstName is no longer required
    lastName: String,   // lastName is no longer required
    emailAddress: { type: String, required: true, unique: true },
    albums: [
        { 
            albumTitle: { type: String, required: true },
            band: { type: String, required: true },
            albumYear: { type: Number, required: true }
        }
    ]
// Timestamps option
// Adds "createdAt" and "updatedAt" properties to each user document
}, { timestamps: true });

// Use a pre-save hook to do something BEFORE trying to save a new "user" document
// "If the user hasn't been given a first name, give them a *default* value BEFORE trying to save the new document"
userSchema.pre("save", function(next) {
    if (!this.firstName) {
        this.firstName = "John";
    }

    if (!this.lastName) {
        this.lastName = "Doe";
    }

    next();
})

const User = mongoose.model("User", userSchema);

export default User;