import mongoose from 'mongoose'

const FileContentSchema = new mongoose.Schema({
    instructor: { type: String, ref: 'profiles', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
    module: String,
    lessonTitle: String,
    description: String,
    likeCount: { type: Number, default: 0 },
    Allowed: { type: Boolean, default: false },
    filename: String,
    path: String,
    uploadDate: { type: Date, default: Date.now },
});

const FileContent = mongoose.model('FileContent', FileContentSchema);

export default FileContent;