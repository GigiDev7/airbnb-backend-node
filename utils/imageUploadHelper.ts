import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";

export const updateImageFiles = async (
  images: string[],
  type: "properties" | "users",
  propertyId?: mongoose.Types.ObjectId,
  userId?: mongoose.Types.ObjectId
) => {
  const imgDir = path.join(
    process.cwd(),
    "uploads",
    type,
    userId ? userId.toString() : propertyId!.toString()
  );
  const oldImages = await fs.readdir(imgDir);
  const newImages = images.map((img) => {
    const ind = img.lastIndexOf("\\");
    //const ind = img.lastIndexOf("/");
    return img.slice(ind + 1);
  });
  oldImages.forEach(async (img) => {
    if (!newImages.includes(img)) {
      await fs.unlink(path.join(imgDir, img));
    }
  });
};
