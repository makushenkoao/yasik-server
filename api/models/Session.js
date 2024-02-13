import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        genres: [],
        code: {
            type: String,
            required: true,
            unique: true
        },
        participants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        matches: []
    },
    { timestamps: true }
);

const Session = mongoose.model("Session", SessionSchema);
export default Session;
