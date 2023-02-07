"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const protectAuth_1 = require("../middlewares/protectAuth");
const fs_1 = __importDefault(require("fs"));
const images_1 = require("../controllers/images");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        const userId = req.user._id;
        const propertyId = req.params.propertyId;
        let dir = `./uploads/`;
        if (propertyId) {
            dir += `properties/${propertyId}`;
        }
        else {
            dir += `users/${userId}`;
        }
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
router.use(protectAuth_1.protectAuth);
router.post("", upload.single("profileImage"), images_1.uploadProfileImage);
router.post("/:propertyId", upload.array("images"), images_1.uploadPropertyImages);
exports.default = router;
