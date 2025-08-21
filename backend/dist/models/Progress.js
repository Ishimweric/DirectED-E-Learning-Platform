"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// schema which defines the structure and data types for the Progress collection
const ProgressSchema = new mongoose_1.Schema({
    // 'user" field act as a reference to the User collection
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    // "course" field is a reference to the 'Course' collection.
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    // "completedLessons" is an array of ObjectId references to the "Lesson' collection
    // and this allows us to track which lessons the user has been completed
    completedLessons: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Lesson",
        }],
    // "quizAttempts" is an array of the IQuizAttempt subdocuments defined above.
    quizAttempts: [{
            quizId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Quiz",
                required: true,
            },
            score: {
                type: Number,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            }
        }]
});
exports.default = mongoose_1.default.model('Progress', ProgressSchema);
//# sourceMappingURL=Progress.js.map