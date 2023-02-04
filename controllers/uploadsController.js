const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("Please upload product image");
  }
  const imageFile = req.files.image;

  if (!imageFile.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload an image");
  }
  const maxSize = 1024 * 1024;
  if (imageFile.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload image less than 1MB");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${imageFile.name}`
  );
  await imageFile.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${imageFile.name}` } });
};

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};
module.exports = {
  uploadProductImage,
};
