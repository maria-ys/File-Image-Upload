const { StatusCodes } = require("http-status-codes");
const path = require("path");
const uploadProductImage = async (req, res) => {
  const imageFile = req.files.image;

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${imageFile.name}`
  );
  await imageFile.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${imageFile.name}` } });
};

module.exports = {
  uploadProductImage,
};
