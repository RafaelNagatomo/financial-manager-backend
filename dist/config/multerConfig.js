"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, `${uniqueSuffix}`);
    }
});
const limits = {
    fileSize: 10 * 1024 * 1024
};
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    if (mimeType && extName) {
        cb(null, true);
    }
};
const upload = (0, multer_1.default)({
    storage,
    limits,
    fileFilter
});
exports.default = upload;
