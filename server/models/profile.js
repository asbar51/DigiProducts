import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, enum: ['student', 'instructor'], default: 'student' },
    profilePicture: String,
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    createdAt: {
        type: Date,
        default: new Date
    }
})

const profiles = mongoose.model("profiles", profileSchema)

export default profiles