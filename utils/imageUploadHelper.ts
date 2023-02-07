import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";

export const updateImageFiles = async (
  propertyId: mongoose.Types.ObjectId,
  images: string[]
) => {
  const imgDir = path.join(
    process.cwd(),
    "uploads",
    "properties",
    propertyId.toString()
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
