import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

let usersSchema = new mongoose.Schema({
    name: { type: String },
    password: { type: String }
});

let users = mongoose.model("users", usersSchema);

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase";

mongoose.connect(mongoUrl, { maxPoolSize: 100 })
    .then(() => {
        console.log("MongoDB connected successfully");
        return users.find({ name: "debottam kar" });
    })
    .then((data) => {
        console.log("Users:", data);
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });


