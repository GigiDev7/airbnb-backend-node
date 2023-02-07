import express from "express";
import multer from "multer";
import { CustomRequest } from "../interfaces";
import { protectAuth } from "../middlewares/protectAuth";
import fs from "fs";
import {
  uploadProfileImage,
  uploadPropertyImages,
} from "../controllers/images";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const userId = (req as CustomRequest).user._id;
    const propertyId = req.params.propertyId;
    let dir = `./uploads/`;

    if (propertyId) {
      dir += `properties/${propertyId}`;
    } else {
      dir += `users/${userId}`;
    }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

router.use(protectAuth);

router.post("", upload.single("profileImage"), uploadProfileImage);
router.post("/:propertyId", upload.array("images"), uploadPropertyImages);

export default router;
